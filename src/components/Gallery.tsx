import { useRef, useEffect } from 'react'
import type { RefObject } from 'react'
import { useParallax } from '../hooks/useParallax'
import './Gallery.css'

type Photo = { src: string; alt: string; ratio: string }

const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=85`

const STRIP_A: Photo[] = [
  { src: U('1756680967373-c3205a8a8b31'), alt: 'La terrasse',          ratio: '16/9' },
  { src: U('1758649863410-2d35a9d36f70'), alt: 'Ambiance du soir',     ratio: '3/2'  },
  { src: U('1759239938594-ded7827b126e'), alt: 'Cocktail maison',      ratio: '4/3'  },
  { src: U('1746652762397-c846bf1f9351'), alt: 'La salle',             ratio: '16/9' },
  { src: U('1671116810348-8148423dec80'), alt: 'Soirée entre amis',    ratio: '4/3'  },
]

const STRIP_B: Photo[] = [
  { src: U('1547146598-0962d0d87c97'),    alt: 'Le bar',               ratio: '3/2'  },
  { src: U('1761416376088-d6456fcd76fd'), alt: 'En cuisine',           ratio: '4/3'  },
  { src: U('1756522074787-c750cae5e6aa'), alt: 'Le service',           ratio: '3/2'  },
  { src: U('1763867641077-d672d26f2ccb'), alt: 'Plat du chef',         ratio: '16/9' },
  { src: U('1718482640905-5308d2740c57'), alt: 'Terrasse ensoleillée', ratio: '4/3'  },
]

const SEP = 'Le Bistrot des Nuances · Restaurant · Bar · Lounge · Villeneuve-Loubet · 43°37′N · 7°07′E · '

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
