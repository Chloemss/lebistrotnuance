import { useRef, useEffect } from 'react'
import './PageLinks.css'

export default function PageLinks() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const panels = sectionRef.current?.querySelectorAll<HTMLAnchorElement>('.PageLink')
    if (!panels) return

    const handlers: Array<{
      el: HTMLAnchorElement
      enter: () => void
      move: (e: MouseEvent) => void
      leave: () => void
    }> = []

    panels.forEach((panel) => {
      const visual = panel.querySelector<HTMLDivElement>('.PageLink__visual')
      if (!visual) return

      let activationTimer: ReturnType<typeof setTimeout> | null = null
      let isActive = false

      const onEnter = () => {
        /* Démarre le timer de 2s — l'effet ne s'active qu'après */
        activationTimer = setTimeout(() => {
          isActive = true

          /* Scroll automatique une fois l'effet activé */
          const section = sectionRef.current
          if (!section) return
          const rect = section.getBoundingClientRect()
          if (Math.abs(rect.top) > 2) {
            window.scrollTo({ top: window.scrollY + rect.top, behavior: 'smooth' })
          }
        }, 5000)
      }

      /* ── Parallaxe photo — uniquement si les 2s sont écoulées ── */
      const onMove = (e: MouseEvent) => {
        if (!isActive) return
        const rect = panel.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18
        const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 12
        visual.style.transform = `translate(${x}px, ${y}px) scale(1.08)`
      }

      const onLeave = () => {
        /* Annule le timer si on quitte avant les 2s */
        if (activationTimer) { clearTimeout(activationTimer); activationTimer = null }
        isActive = false
        visual.style.transform = 'translate(0,0) scale(1.06)'
      }

      panel.addEventListener('mouseenter', onEnter)
      panel.addEventListener('mousemove',  onMove)
      panel.addEventListener('mouseleave', onLeave)
      handlers.push({ el: panel, enter: onEnter, move: onMove, leave: onLeave })
    })

    return () => {
      handlers.forEach(({ el, enter, move, leave }) => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mousemove',  move)
        el.removeEventListener('mouseleave', leave)
      })
    }
  }, [])

  return (
    <section className="PageLinks" ref={sectionRef}>

      {/* Manger / Boire */}
      <a className="PageLink PageLink--eat" href="/manger">
        <div className="PageLink__visual" aria-hidden="true" />

        <span className="PageLink__num" aria-hidden="true">01</span>

        <span className="PageLink__inner">
          <span className="PageLink__eyebrow">Restaurant · Bar</span>
          <span className="PageLink__titles">
            <span className="PageLink__title">Manger.</span>
            <span className="PageLink__title PageLink__title--outline">Boire.</span>
          </span>
          <span className="PageLink__cta" aria-hidden="true">
            Explorer
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </span>
      </a>

      {/* Séparateur central
      <div className="PageLinks__divider" aria-hidden="true">
        <span className="PageLinks__divider-label">ou</span>
      </div> */}

      {/* Se reposer */}
      <a className="PageLink PageLink--play" href="/jouer">
        <div className="PageLink__visual" aria-hidden="true" />

        <span className="PageLink__num" aria-hidden="true">02</span>

        <span className="PageLink__inner">
          <span className="PageLink__eyebrow">Bien-être · Détente</span>
          <span className="PageLink__titles">
            <span className="PageLink__title">Se</span>
            <span className="PageLink__title PageLink__title--outline">reposer.</span>
          </span>
          <span className="PageLink__cta" aria-hidden="true">
            Découvrir
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </span>
      </a>

    </section>
  )
}
