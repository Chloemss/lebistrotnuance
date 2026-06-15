import { useState, useRef } from 'react'
import './Hero.css'

type RevealKey = 'boire' | 'manger' | 'profiter'

const REVEALS: Record<RevealKey, string> = {
  boire:    '/videos/cocktail.mp4',
  manger:   '/videos/restaurant.mp4',
  profiter: '/videos/hotel.mp4',
}

export default function Hero() {
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

  return (
    <section className="Hero">

      {/* ── Fond vidéo plein-écran ── */}
      <div className="Hero__bg" aria-hidden="true">

        {/* Vidéo classique — toujours présente, cross-fade au hover */}
        <video
          className={`Hero__bg-video Hero__bg-video--default${hovered ? ' is--hidden' : ''}`}
          src="/salleRestaurant.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Vidéos par mot — apparaissent au hover */}
        {(Object.keys(REVEALS) as RevealKey[]).map(key => (
          <video
            key={key}
            ref={el => { videoRefs.current[key] = el }}
            src={REVEALS[key]}
            muted loop playsInline
            className={`Hero__bg-video Hero__bg-video--reveal${hovered === key ? ' is--active' : ''}`}
          />
        ))}

        <div className="Hero__bg-overlay" />
      </div>

      {/* Texte vertical gauche "EAT" */}
      <span className="Hero__side Hero__side--left" aria-hidden="true">EAT</span>

      {/* Texte vertical droite "PLAY" */}
      <span className="Hero__side Hero__side--right" aria-hidden="true">PLAY</span>

      {/* Contenu central */}
      <div className="Hero__container">
        <h1 className="Hero__title">
          <span
            onMouseEnter={() => enter('boire')}
            onMouseLeave={() => leave('boire')}
          >Boire</span>
          <span
            onMouseEnter={() => enter('manger')}
            onMouseLeave={() => leave('manger')}
          >Manger</span>
          <span
            onMouseEnter={() => enter('profiter')}
            onMouseLeave={() => leave('profiter')}
          >Profiter</span>
        </h1>
        <p className="Hero__subtitle">Le lieu incontournable situé à Villeneuve Loubet</p>
      </div>

      {/* Indicateur scroll vertical */}
      <div className="Hero__scroll" aria-hidden="true">
        <span className="Hero__scroll-line" />
        <span className="Hero__scroll-label">scroll</span>
      </div>

      {/* Cercle rotatif "scroll" bas-droite */}

    </section>
  )
}
