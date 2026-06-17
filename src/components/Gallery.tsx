import { useRef, useEffect } from 'react'
import type { RefObject } from 'react'
import { useParallax } from '../hooks/useParallax'
import './Gallery.css'

type Photo = { src: string; alt: string; ratio: string }

const STRIP_A: Photo[] = [
  { src: '/terrasse.jpg',         alt: 'La terrasse',          ratio: '16/9' },
  { src: '/event-karaoke.jpg',    alt: 'Soirée karaoké',       ratio: '4/3'  },
  { src: '/mojito.jpg',           alt: 'Cocktails du soir',    ratio: '3/2'  },
  { src: '/room.jpg',             alt: 'La salle',             ratio: '16/9' },
  { src: '/event-happy-hour.jpg', alt: 'Happy Hour Lucky',     ratio: '4/3'  },
]

const STRIP_B: Photo[] = [
  { src: '/event-darts.jpg',      alt: 'Tournoi fléchettes',   ratio: '3/2'  },
  { src: '/pamplemousse.jpg',     alt: 'Carte des boissons',   ratio: '4/3'  },
  { src: '/event-quiz.jpg',       alt: 'Quiz Night',           ratio: '16/9' },
  { src: '/ovisconte.jpg',        alt: 'Ambiance',             ratio: '3/2'  },
  { src: '/tablet.jpg',           alt: 'À table',              ratio: '4/3'  },
]

const SEP = 'Lucky Folks · Wine Bar & Jeux · Villeneuve-Loubet · 43°37′N · 7°07′E · '

export default function Gallery() {
  const sectionRef   = useRef<HTMLElement>(null)
  const outerARef    = useRef<HTMLDivElement>(null)
  const outerBRef    = useRef<HTMLDivElement>(null)
  const velRef       = useRef(0)
  const lastYRef     = useRef(0)
  const skewRef      = useRef(0)
  /* Header dérive légèrement plus vite → sentiment d'entrée en matière */
  const headerRef = useParallax(-0.07) as RefObject<HTMLDivElement>
  const rafRef     = useRef<number>()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      velRef.current = y - lastYRef.current
      lastYRef.current = y
    }

    const onMouse = (e: MouseEvent) => {
      const el = sectionRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100).toFixed(1) + '%')
      el.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100).toFixed(1) + '%')
    }

    const tick = () => {
      // Lerp le skew vers la vélocité de scroll (clamped ±5°)
      const target = Math.max(-5, Math.min(5, velRef.current * 0.14))
      skewRef.current += (target - skewRef.current) * 0.09
      velRef.current  *= 0.87

      const s = skewRef.current.toFixed(3)
      // Les deux bandes s'inclinent en sens opposés → effet de profondeur
      outerARef.current?.style.setProperty('--skew',  `${s}deg`)
      outerBRef.current?.style.setProperty('--skew', `${(-skewRef.current).toFixed(3)}deg`)

      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('scroll',    onScroll, { passive: true })
    window.addEventListener('mousemove', onMouse,  { passive: true })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll',    onScroll)
      window.removeEventListener('mousemove', onMouse)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const renderStrip = (list: Photo[]) =>
    [...list, ...list].map((p, i) => (
      <figure
        key={i}
        className="Gallery__photo"
        style={{ '--ratio': p.ratio } as React.CSSProperties}
      >
        <img src={p.src} alt={p.alt} loading="lazy" />
        <figcaption>{p.alt}</figcaption>
      </figure>
    ))

  return (
    <section className="Gallery" ref={sectionRef}>

      {/* Ambient spotlight souris */}
      <div className="Gallery__spotlight" aria-hidden="true" />

      {/* ── En-tête ── */}
      <div className="Gallery__header" ref={headerRef}>
        <div className="Gallery__header-left">
          <span className="Gallery__eyebrow">Galerie</span>
          <h2 className="Gallery__title">
            L'endroit<br />
            <em>en images.</em>
          </h2>
        </div>
        <div className="Gallery__counter" aria-hidden="true">
          <span className="Gallery__counter-num">10</span>
          <span className="Gallery__counter-label">photos</span>
        </div>
      </div>

      {/* ── Bande A — vers la gauche ── */}
      <div className="Gallery__outer Gallery__outer--a" ref={outerARef}>
        <div className="Gallery__track Gallery__track--a">
          {renderStrip(STRIP_A)}
        </div>
      </div>

      {/* ── Séparateur mono scrollant ── */}
      <div className="Gallery__sep" aria-hidden="true">
        <div className="Gallery__sep-inner">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="Gallery__sep-text">{SEP}</span>
          ))}
        </div>
      </div>

      {/* ── Bande B — vers la droite ── */}
      <div className="Gallery__outer Gallery__outer--b" ref={outerBRef}>
        <div className="Gallery__track Gallery__track--b">
          {renderStrip(STRIP_B)}
        </div>
      </div>

    </section>
  )
}
