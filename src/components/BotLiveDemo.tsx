import { useEffect, useRef, useState } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { motion, useReducedMotion } from 'framer-motion'
import { Activity, Bot, Check, CircleStop, Cloud, Database, Gauge, RefreshCw, Server, ShieldCheck, WifiOff } from 'lucide-react'

type Candle = { time: string; open: number; high: number; low: number; close: number; range: [number, number] }

const seed: Candle[] = Array.from({ length: 22 }, (_, index) => {
  const open = 2348 + Math.sin(index * .61) * 6 + index * .22
  const close = open + Math.sin(index * 1.17) * 3.6
  const high = Math.max(open, close) + 1.2 + Math.abs(Math.cos(index * .73)) * 1.8
  const low = Math.min(open, close) - 1.1 - Math.abs(Math.sin(index * .89)) * 1.7
  return { time: `${String(9 + Math.floor(index / 6)).padStart(2, '0')}:${String((index % 6) * 10).padStart(2, '0')}`, open, high, low, close, range: [low, high] }
})

type CandleShapeProps = { x?: number; y?: number; width?: number; height?: number; payload?: Candle }
function CandleShape({ x=0, y=0, width=0, height=0, payload }: CandleShapeProps) {
  if (!payload) return null
  const rising = payload.close >= payload.open
  const color = rising ? '#53d6a5' : '#ef6757'
  const fullRange = Math.max(.01, payload.high - payload.low)
  const bodyTop = ((payload.high - Math.max(payload.open, payload.close)) / fullRange) * height
  const bodyHeight = Math.max(3, (Math.abs(payload.close - payload.open) / fullRange) * height)
  const bodyWidth = Math.max(4, width * .62)
  const bodyX = x + (width - bodyWidth) / 2
  return <g><line x1={x+width/2} x2={x+width/2} y1={y} y2={y+height} stroke={color} strokeWidth="1.4"/><motion.rect x={bodyX} y={y+bodyTop} width={bodyWidth} height={bodyHeight} rx="1" fill={color} initial={{opacity:.25,scaleY:.25}} animate={{opacity:1,scaleY:1}} style={{transformOrigin:`${x+width/2}px ${y+bodyTop+bodyHeight/2}px`}} transition={{duration:.35}}/></g>
}

type CandleTooltipProps = { active?: boolean; payload?: Array<{ payload: Candle }>; label?: string }
function CandleTooltip({ active, payload, label }: CandleTooltipProps) {
  const candle = payload?.[0]?.payload
  if (!active || !candle) return null
  return <div className="candle-tooltip"><b>XAU/USD · {label}</b><span>O {candle.open.toFixed(2)}</span><span>H {candle.high.toFixed(2)}</span><span>L {candle.low.toFixed(2)}</span><span>C {candle.close.toFixed(2)}</span><small>Simulated values</small></div>
}

const events = [
  ['Risk check passed', 'Exposure remains inside configured limits'],
  ['Rule evaluated', 'Market conditions checked against the active plan'],
  ['Cloud heartbeat', 'Runner connection confirmed'],
  ['Activity recorded', 'Event written to the audit history'],
]

export default function BotLiveDemo() {
  const reduce = useReducedMotion()
  const [points, setPoints] = useState<Candle[]>(seed)
  const tick = useRef(seed.length)
  const [eventIndex, setEventIndex] = useState(0)

  useEffect(() => {
    if (reduce) return
    const chartTimer = window.setInterval(() => {
      tick.current += 1
      setPoints(current => {
        const nextTick = tick.current
        const open = current[current.length - 1].close
        const close = open + Math.sin(nextTick * .83) * 2.7 + Math.cos(nextTick * .37) * 1.1
        const high = Math.max(open, close) + 1.1 + Math.abs(Math.sin(nextTick * .49)) * 1.7
        const low = Math.min(open, close) - 1.1 - Math.abs(Math.cos(nextTick * .57)) * 1.6
        return [...current.slice(1), { time: `T+${nextTick}`, open, high, low, close, range: [low, high] }]
      })
    }, 1400)
    const eventTimer = window.setInterval(() => setEventIndex(index => (index + 1) % events.length), 2600)
    return () => { window.clearInterval(chartTimer); window.clearInterval(eventTimer) }
  }, [reduce])

  return <>
    <section className="bot-demo-section">
      <div className="container-wide">
        <div className="bot-demo-heading">
          <div><span className="eyebrow">Interactive product concept</span><h2>See the system think in real time.</h2><p>This code-driven simulation demonstrates how rules, monitoring, risk checks and activity history could work together. It is not connected to a live trading account or live market feed.</p></div>
          <span className="simulation-pill"><Activity/> Simulation running</span>
        </div>

        <div className="bot-demo-shell">
          <div className="bot-demo-toolbar">
            <div><span className="bot-mark"><Bot/></span><b>AOS Robot workspace</b><small>Concept environment</small></div>
            <div className="runner-status"><motion.i animate={reduce?{}:{opacity:[.35,1,.35],scale:[.8,1.15,.8]}} transition={{duration:1.8,repeat:Infinity}}/><Cloud/> Cloud runner online</div>
          </div>

          <div className="bot-demo-grid">
            <article className="chart-panel">
              <div className="panel-title"><div><span>Gold / US dollar · XAU/USD</span><h3>Simulated candlestick monitoring</h3></div><span className="live-label"><i/> Updating</span></div>
              <div className="chart-wrap">
                {!reduce&&<motion.div className="bot-scan-line" animate={{left:['2%','96%']}} transition={{duration:5.5,repeat:Infinity,ease:'linear'}}/>}
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={points} margin={{ top: 10, right: 8, left: -10, bottom: 0 }} barCategoryGap="18%">
                    <CartesianGrid stroke="rgba(168,228,214,.09)" vertical={false}/>
                    <XAxis dataKey="time" tick={{ fill:'#8ea49d', fontSize:10 }} axisLine={false} tickLine={false} minTickGap={32}/>
                    <YAxis domain={['dataMin - 4','dataMax + 4']} tick={{ fill:'#8ea49d', fontSize:10 }} axisLine={false} tickLine={false} width={62} tickFormatter={value=>Number(value).toFixed(0)}/>
                    <Tooltip cursor={{fill:'rgba(111,223,189,.04)'}} content={<CandleTooltip/>}/>
                    <Bar dataKey="range" shape={<CandleShape/>} isAnimationActive={!reduce} animationDuration={420}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="rule-row">{['Structure filter','Risk gate','Session window'].map((rule,index)=><span key={rule}><Check/>{rule}<b>{index===2?'Watching':'Passed'}</b></span>)}</div>
            </article>

            <aside className="control-panel">
              <div className="panel-title"><div><span>Risk configuration</span><h3>Control before execution</h3></div><ShieldCheck/></div>
              {[['Exposure limit',62],['Daily risk budget',38],['Concurrent actions',48]].map(([label,value])=><div className="risk-meter" key={label as string}><span><b>{label}</b><small>Within limit</small></span><div><motion.i initial={{width:0}} whileInView={{width:`${value}%`}} viewport={{once:true}} transition={{duration:.9}}/></div></div>)}
              <button className="demo-stop" type="button"><CircleStop/> Emergency stop ready</button>
              <small className="control-note">The stop control is intentionally more prominent than performance information.</small>
            </aside>
          </div>

          <div className="bot-event-grid">
            <div className="event-card"><span className="event-icon"><RefreshCw/></span><div><small>Latest activity</small><motion.b key={eventIndex} initial={reduce?false:{opacity:0,y:5}} animate={{opacity:1,y:0}}>{events[eventIndex][0]}</motion.b><p>{events[eventIndex][1]}</p></div><time>now</time></div>
            <div className="event-card"><span className="event-icon"><Gauge/></span><div><small>Risk mode</small><b>Configured limits</b><p>Actions remain gated by the selected rules.</p></div><span className="ok-state">Ready</span></div>
            <div className="event-card"><span className="event-icon"><Database/></span><div><small>Audit history</small><b>Events recorded</b><p>Rules, checks and actions remain reviewable.</p></div><span className="ok-state">Synced</span></div>
          </div>
        </div>
      </div>
    </section>

    <section className="bot-cloud-section">
      <div className="container-wide bot-cloud-layout">
        <div className="bot-cloud-copy"><span className="eyebrow light">Optional cloud continuity</span><h2>Your browser can close. A configured cloud runner can stay online.</h2><p>If the robot is deployed to a suitable cloud server, it can continue monitoring while your personal computer or browser is offline—provided the cloud instance, integration and required market connectivity remain available.</p><div className="cloud-note"><ShieldCheck/><span><b>Clear expectation</b>Cloud hosting supports continuity; it does not remove market risk or guarantee profit.</span></div></div>
        <div className="cloud-flow">
          <motion.article whileHover={reduce?{}:{y:-6}}><WifiOff/><span>01</span><h3>Local device offline</h3><p>Your browser or laptop does not need to remain open after a valid cloud deployment.</p></motion.article>
          <motion.article whileHover={reduce?{}:{y:-6}}><Server/><span>02</span><h3>Cloud runner continues</h3><p>The hosted instance keeps evaluating configured rules while its services and connections remain healthy.</p></motion.article>
          <motion.article whileHover={reduce?{}:{y:-6}}><RefreshCw/><span>03</span><h3>Reconnect and review</h3><p>Return to the dashboard to review status, risk checks and recorded activity.</p></motion.article>
        </div>
        <div className="hosting-cost"><Cloud/><div><b>Hosting is separate</b><p>A small recurring infrastructure charge may apply and varies by hosting provider, server specification and usage. The benefit is operational continuity and remote access—not a promise of financial return.</p></div></div>
      </div>
    </section>
  </>
}
