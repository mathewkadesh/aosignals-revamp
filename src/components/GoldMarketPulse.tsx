import { useEffect, useMemo, useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Activity, CircleAlert, RefreshCw, Scale, TrendingUp } from 'lucide-react'

type SpotResponse = {
  xau?: { price?: number; currency?: string; unit?: string }
  spot_usd_oz?: number
  per_gram_usd?: number
  silver_usd_oz?: number
  gold_silver_ratio?: number
  updated_at?: string
  price_as_of?: string
  stale?: boolean
  data_state?: { status?: 'fresh'|'stale'|'unavailable'; age_seconds?: number }
}
type IntradayResponse = { points?: Array<{ t: string|number; p: number }>; data_state?: { status?: string } }
type ChartPoint = { time: string; price: number }

const spotEndpoint = 'https://xaus.com/api/v1/spot?currency=GBP&compact=1'
const intradayEndpoint = 'https://xaus.com/api/v1/intraday?symbol=xau&hours=24'

function readableTime(value?: string) {
  if (!value) return 'Awaiting timestamp'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? 'Timestamp unavailable' : date.toLocaleString('en-GB',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})
}

export default function GoldMarketPulse({compact=false}:{compact?:boolean}) {
  const [spot,setSpot]=useState<SpotResponse|null>(null)
  const [series,setSeries]=useState<ChartPoint[]>([])
  const [error,setError]=useState(false)
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    let live=true
    const load=async()=>{
      try {
        const cacheBust=Date.now()
        const [spotResult,historyResult]=await Promise.all([
          fetch(`${spotEndpoint}&fresh=${cacheBust}`,{headers:{Accept:'application/json'}}),
          fetch(`${intradayEndpoint}&fresh=${cacheBust}`,{headers:{Accept:'application/json'}}),
        ])
        if(!spotResult.ok)throw new Error('Spot feed unavailable')
        const spotJson=await spotResult.json() as SpotResponse
        const historyJson=historyResult.ok?await historyResult.json() as IntradayResponse:{points:[]}
        if(!live)return
        setSpot(spotJson)
        setSeries((historyJson.points??[]).filter(point=>Number.isFinite(point.p)).map(point=>{
          const raw=typeof point.t==='number'?(point.t<1e12?point.t*1000:point.t):point.t
          const date=new Date(raw)
          return {time:Number.isNaN(date.getTime())?'':date.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'}),price:point.p}
        }).slice(-96))
        setError(false)
      } catch {
        if(live)setError(true)
      } finally {
        if(live)setLoading(false)
      }
    }
    void load()
    const timer=window.setInterval(load,60_000)
    return()=>{live=false;window.clearInterval(timer)}
  },[])

  const status=spot?.stale||spot?.data_state?.status==='stale'?'Delayed':spot?.data_state?.status==='fresh'?'Live':'Indicative'
  const movement=useMemo(()=>series.length>1?series[series.length-1].price-series[0].price:null,[series])
  const domain=useMemo(()=>series.length?[Math.min(...series.map(point=>point.price))*.999,Math.max(...series.map(point=>point.price))*1.001]:['auto','auto'],[series])

  return <section className={`market-pulse ${compact?'compact':''}`} aria-label="Live indicative gold market data">
    <div className="market-pulse-head"><div><span className="eyebrow">Live market context</span><h2>XAU/USD market pulse</h2><p>Indicative gold data for education and session preparation—not an executable or settlement quote.</p></div><span className={`feed-status ${error?'offline':''}`}><i/>{error?'Feed unavailable':loading?'Connecting':status}</span></div>
    <div className="market-pulse-grid">
      <div className="market-price-stack">
        <article><small>Gold spot · USD/oz</small><b>{spot?.spot_usd_oz?`$${spot.spot_usd_oz.toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2})}`:'—'}</b><span><Activity/>{movement===null?'Waiting for intraday history':`${movement>=0?'+':''}${movement.toFixed(2)} across loaded 24h series`}</span></article>
        <div className="market-mini-stats"><span><Scale/><small>GBP / oz</small><b>{spot?.xau?.price?`£${spot.xau.price.toLocaleString('en-GB',{maximumFractionDigits:2})}`:'—'}</b></span><span><TrendingUp/><small>Gold / silver ratio</small><b>{spot?.gold_silver_ratio?.toFixed(2)??'—'}</b></span><span><RefreshCw/><small>Price as of</small><b>{readableTime(spot?.price_as_of??spot?.updated_at)}</b></span></div>
      </div>
      <div className="market-chart" role="img" aria-label="Intraday indicative XAU/USD line chart">
        {series.length>1?<ResponsiveContainer width="100%" height="100%"><AreaChart data={series} margin={{top:12,right:8,left:0,bottom:0}}><defs><linearGradient id="goldArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f4b942" stopOpacity=".42"/><stop offset="100%" stopColor="#f4b942" stopOpacity="0"/></linearGradient></defs><CartesianGrid stroke="rgba(26,44,40,.1)" vertical={false}/><XAxis dataKey="time" minTickGap={42} axisLine={false} tickLine={false} tick={{fontSize:10,fill:'#65756f'}}/><YAxis domain={domain} hide/><Tooltip contentStyle={{borderRadius:12,border:'1px solid #dde4e1',fontSize:12}} formatter={(value)=>[`$${Number(value).toFixed(2)}`,'Indicative price']}/><Area type="monotone" dataKey="price" stroke="#d99316" strokeWidth={2.5} fill="url(#goldArea)" dot={false} isAnimationActive={false}/></AreaChart></ResponsiveContainer>:<div className="market-chart-empty"><CircleAlert/><b>{error?'Live feed could not be reached':'Loading the latest 24-hour series'}</b><span>The educational page remains available while market data reconnects.</span></div>}
      </div>
    </div>
    <div className="market-source"><CircleAlert/><span>Source: <a href="https://xaus.com/api/" target="_blank" rel="noreferrer noopener">XAUS public gold data API</a>. Values are indicative mid-market references, may be delayed or unavailable, and must not be used for execution or valuation.</span></div>
  </section>
}
