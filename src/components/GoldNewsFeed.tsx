import { useEffect, useState } from 'react'
import { ArrowUpRight, Clock3, Newspaper, RefreshCw } from 'lucide-react'

type GdeltArticle={url:string;title:string;seendate?:string;domain?:string;sourcecountry?:string}
type NewsItem={url:string;title:string;date:string;source:string}

const fallback:NewsItem[]=[
  {title:'Gold Mid-Year Outlook 2026: Point break',date:'01 Jul 2026',source:'World Gold Council',url:'https://www.gold.org/goldhub/research/gold-mid-year-outlook-2026'},
  {title:'Gold ETF Flows: June 2026',date:'08 Jul 2026',source:'World Gold Council',url:'https://www.gold.org/goldhub/data/gold-etfs-holdings-and-flows'},
  {title:'Gold Market Commentary and Outlook',date:'Research hub',source:'World Gold Council',url:'https://www.gold.org/goldhub/research/market-commentary-and-outlook'},
  {title:'Introduction to Gold Volatility Trading',date:'Education',source:'CME Group',url:'https://www.cmegroup.com/education/articles-and-reports/introduction-to-gold-volatility-trading'},
]

function formatDate(value?:string){
  if(!value)return 'Recent'
  const normalized=/^\d{14}$/.test(value)?`${value.slice(0,4)}-${value.slice(4,6)}-${value.slice(6,8)}T${value.slice(8,10)}:${value.slice(10,12)}:${value.slice(12,14)}Z`:value
  const date=new Date(normalized)
  return Number.isNaN(date.getTime())?'Recent':date.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})
}

export default function GoldNewsFeed(){
  const [items,setItems]=useState<NewsItem[]>(fallback)
  const [live,setLive]=useState(false)
  useEffect(()=>{
    let active=true
    const params=new URLSearchParams({query:'("gold price" OR XAUUSD OR "gold market") sourcelang:English',mode:'ArtList',maxrecords:'12',timespan:'1month',sort:'datedesc',format:'json'})
    fetch(`https://api.gdeltproject.org/api/v2/doc/doc?${params.toString()}`,{headers:{Accept:'application/json'}}).then(result=>{
      if(!result.ok)throw new Error('News feed unavailable')
      return result.json() as Promise<{articles?:GdeltArticle[]}>
    }).then(data=>{
      if(!active)return
      const seen=new Set<string>()
      const next=(data.articles??[]).filter(article=>{
        const key=article.title?.toLowerCase()
        if(!key||!article.url||seen.has(key))return false
        seen.add(key)
        return true
      }).slice(0,6).map(article=>({title:article.title,url:article.url,date:formatDate(article.seendate),source:article.domain??article.sourcecountry??'News source'}))
      if(next.length){setItems(next);setLive(true)}
    }).catch(()=>setLive(false))
    return()=>{active=false}
  },[])
  return <section className="gold-news"><div className="gold-news-head"><div><span className="eyebrow">Market reading room</span><h2>Latest gold-market coverage</h2><p>Headlines provide context for further research. They are not AOS recommendations or verified trading signals.</p></div><span className={live?'news-live':'news-curated'}>{live?<RefreshCw/>:<Newspaper/>}{live?'Live global feed':'Curated research'}</span></div><div className="gold-news-grid">{items.map((item,index)=><a href={item.url} target="_blank" rel="noreferrer noopener" key={`${item.url}-${index}`}><span>{String(index+1).padStart(2,'0')}</span><h3>{item.title}</h3><div><small>{item.source}</small><time><Clock3/>{item.date}</time></div><ArrowUpRight/></a>)}</div><small className="news-attribution">{live?<><a href="https://www.gdeltproject.org/" target="_blank" rel="noreferrer noopener">Powered by the GDELT Project</a> · headlines link to their original publishers.</>:<>Current research links from the World Gold Council and CME Group. Live news will reconnect automatically.</>}</small></section>
}
