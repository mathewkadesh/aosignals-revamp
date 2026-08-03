import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'

export type FounderSlide = { image: string; alt: string; quote: string; context: string }

export default function FounderCarousel({ slides }: { slides: FounderSlide[] }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (paused || reduce) return
    const timer = window.setInterval(() => setActive(index => (index + 1) % slides.length), 5600)
    return () => window.clearInterval(timer)
  }, [paused, reduce, slides.length])

  const move = (direction: number) => setActive(index => (index + direction + slides.length) % slides.length)
  const slide = slides[active]

  return <div className="founder-carousel" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} onFocus={()=>setPaused(true)} onBlur={()=>setPaused(false)} aria-roledescription="carousel" aria-label="Founder perspectives">
    <div className="founder-carousel-stage" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.figure key={slide.image} initial={reduce?false:{opacity:0,x:24}} animate={{opacity:1,x:0}} exit={reduce?{}:{opacity:0,x:-20}} transition={{duration:.5,ease:[.22,1,.36,1]}}>
          <img src={slide.image} width="1536" height="1024" alt={slide.alt}/>
          <figcaption><Quote/><div><blockquote>“{slide.quote}”</blockquote><span>Yakshan Karuna · {slide.context}</span></div></figcaption>
        </motion.figure>
      </AnimatePresence>
    </div>
    <div className="founder-carousel-controls">
      <div className="founder-carousel-dots">{slides.map((item,index)=><button key={item.image} type="button" className={index===active?'active':''} onClick={()=>setActive(index)} aria-label={`Show founder slide ${index+1}`} aria-current={index===active?'true':undefined}/>)}</div>
      <div><button type="button" onClick={()=>move(-1)} aria-label="Previous founder slide"><ArrowLeft/></button><span>{String(active+1).padStart(2,'0')} / {String(slides.length).padStart(2,'0')}</span><button type="button" onClick={()=>move(1)} aria-label="Next founder slide"><ArrowRight/></button></div>
    </div>
  </div>
}
