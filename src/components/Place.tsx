import { useState, useRef } from 'react'
import './Place.css'

type RevealKey = 'manger' | 'boire' | 'profiter'

const REVEALS: Record<RevealKey, { href: string; video: string }> = {
  manger: { href: '#carte',       video: '/videos/restaurant.mp4' },
  boire:  { href: '#jeux',        video: '/videos/cocktail.mp4'      },
  profiter:  { href: '#carte-video', video: '/videos/hotel.mp4'  },
}

export default function Place() {
  const [hovered, setHovered] = useState<RevealKey | null>(null)
  const videoRefs = useRef<Partial<Record<RevealKey, HTMLVideoElement | null>>>({})

  const enter = (key: RevealKey) => {
    setHovered(key)
    const vid = videoRefs.current[key]
    if (vid) { vid.currentTime = 0; vid.play().catch(() => {}) }
  }
  const leave = (key: RevealKey) => {
    setHovered(null)
    videoRefs.current[key]?.pause()
  }

  const revealLink = (key: RevealKey, label: string) => (
    <a
      className={`Place__reveal-link${hovered === key ? ' is--active' : ''}`}
      href={REVEALS[key].href}
      onMouseEnter={() => enter(key)}
      onMouseLeave={() => leave(key)}
    >
      {label}
    </a>
  )

  return (
    <section className={`Place is--beige${hovered ? ' is--reveal' : ''}`}>

      {/* ── Fond vidéo plein-section ── */}
      <div className="Place__bg" aria-hidden="true">
        {(Object.keys(REVEALS) as RevealKey[]).map(key => (
          <video
            key={key}
            ref={el => { videoRefs.current[key] = el }}
            src={REVEALS[key].video}
            muted loop playsInline
            className={`Place__bg-video${hovered === key ? ' is--active' : ''}`}
          />
        ))}
        {/* Overlay sombre pour lisibilité du texte */}
        <div className="Place__bg-overlay" />
      </div>

      <div className="Place__container">



        {/* ── Grande phrase typographique ──
        <div className="Place__content">
          <span className="Place__line">un lieu pour</span>
          <span className="Place__line">
            {revealLink('manger', 'manger')}
            <span className="Place__comma">,</span>
            {' '}
            {revealLink('jouer', 'jouer')}
          </span>
          <span className="Place__line">
            {'et '}
            {revealLink('boire', 'boire un verre')}
          </span>
          <span className="Place__line">au même endroit.</span>
        </div> */}


        {/* ── Grande phrase typographique ── */}
        <div className="Place__content">
          <span className="Place__line">{" "}</span>
                    <span className="Place__line">{" "}</span>
          <span className="Place__line">{" "}</span>
          <span className="Place__line">{" "}</span>
                    <span className="Place__line">{" "}</span>
          <span className="Place__line">{" "}</span>
          <span className="Place__line">
            {revealLink('manger', 'manger')}
            <span className="Place__comma">,</span>
            {' '}
            {revealLink('boire', 'boire')}
          </span>
          <span className="Place__line">
            {'et '}
            {revealLink('profiter', 'profiter')}
          </span>
          <span className="Place__line">au coeur du village</span>
        </div>

      </div>
    </section>
  )
}
