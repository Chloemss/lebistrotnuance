import { useState, useRef, useCallback } from 'react'
import type { RefObject } from 'react'
import { useParallax } from '../hooks/useParallax'
import './About.css'

type HoverKey = 'manger' | 'boire' | 'profiter'

const SCENES: Record<HoverKey, string> = {
  manger:   '/videos/restaurant.mp4',
  boire:    '/videos/cocktail.mp4',
  profiter: '/videos/hotel.mp4',
}

export default function About() {
  const contentRef = useParallax(-0.06) as RefObject<HTMLDivElement>
  const videoRefs  = useRef<Partial<Record<HoverKey, HTMLVideoElement | null>>>({})
  const [hovered, setHovered] = useState<HoverKey | null>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const enter = useCallback((key: HoverKey) => {
    if (leaveTimer.current) { clearTimeout(leaveTimer.current); leaveTimer.current = null }
    setHovered(key)
    const vid = videoRefs.current[key]
    if (vid) { vid.currentTime = 0; vid.play().catch(() => {}) }
  }, [])

  const leave = useCallback((key: HoverKey) => {
    leaveTimer.current = setTimeout(() => {
      setHovered(null)
      videoRefs.current[key]?.pause()
      leaveTimer.current = null
    }, 150)
  }, [])

  return (
    <section className={`About is--red${hovered ? ' has--word-focus' : ''}`}>

      {(Object.keys(SCENES) as HoverKey[]).map(key => (
        <div
          key={key}
          aria-hidden="true"
          className={`About__scene About__scene--${key}${hovered === key ? ' is--active' : ''}`}
        >
          <video
            ref={el => { videoRefs.current[key] = el }}
            src={SCENES[key]}
            muted loop playsInline
            preload="none"
          />
        </div>
      ))}

      <div className="About__content" ref={contentRef}>

        <span className="About__eyebrow">Wine Bar · Villeneuve-Loubet</span>

        <h2 className="About__title">
          <span
            className={`About__title-word${hovered === 'manger' ? ' is--active' : hovered ? ' is--dim' : ''}`}
            onMouseEnter={() => enter('manger')}
            onMouseLeave={() => leave('manger')}
          >Manger,</span>
          <span
            className={`About__title-word${hovered === 'boire' ? ' is--active' : hovered ? ' is--dim' : ''}`}
            onMouseEnter={() => enter('boire')}
            onMouseLeave={() => leave('boire')}
          >boire</span>
          <span
            className={`About__title-word${hovered === 'profiter' ? ' is--active' : hovered ? ' is--dim' : ''}`}
            onMouseEnter={() => enter('profiter')}
            onMouseLeave={() => leave('profiter')}
          >&amp;&nbsp;profiter.</span>
        </h2>

        <div className="About__grid">

          <div className="About__apropos">
            <span className="About__section-label">À propos</span>
            <p className="About__desc">
              Restaurant-bar à jeux dans l'esprit fête foraine revisitée.
              Situé au cœur de Villeneuve-Loubet, ce lieu de vie original mêle
              cuisine maison, ambiance chaleureuse et jeux à partager — fléchettes,
              shuffleboard, pétanque, karaoké privatif et bien plus encore.
            </p>
            <div className="About__location">
              <span className="About__location-dot" aria-hidden="true" />
              <div>
                <strong className="About__location-name">Villeneuve-Loubet</strong>
                <span className="About__location-coords">43°37′N · 7°07′E</span>
              </div>
            </div>
          </div>

          <div className="About__schedule">
            <span className="About__section-label">Horaires d'ouverture</span>

            <div className="About__schedule-row">
              <div className="About__schedule-day-block">
                <span className="About__schedule-day">Mar — Dim</span>
              </div>
              <div className="About__schedule-times">
                <span><em>Midi</em>12h – 14h30</span>
                <span><em>Soir</em>19h – 22h30</span>
              </div>
            </div>

            <div className="About__schedule-divider" aria-hidden="true" />

            <div className="About__schedule-row About__schedule-row--off">
              <span className="About__schedule-day">Lundi</span>
              <span className="About__schedule-closed">Fermé</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}
