import type { RefObject } from 'react'
import { useParallax } from '../hooks/useParallax'
import './Hero.css'

export default function Hero() {
  const bgRef = useParallax(0.18) as RefObject<HTMLDivElement>

  return (
    <section className="Hero">

      {/* ── Fond vidéo plein-écran ── */}
      <div className="Hero__bg" aria-hidden="true">

        <div ref={bgRef} className="Hero__bg-parallax parallax-y">
          <video
            className="Hero__bg-video Hero__bg-video--default"
            src="/salleRestaurant.mp4"
            autoPlay muted loop playsInline
          />
        </div>

        <div className="Hero__bg-overlay" />

      </div>

      {/* Texte vertical gauche "EAT" */}
      <span className="Hero__side Hero__side--left" aria-hidden="true">EAT</span>

      {/* Texte vertical droite "PLAY" */}
      <span className="Hero__side Hero__side--right" aria-hidden="true">PLAY</span>

      {/* Contenu central */}
      <div className="Hero__container">
        <h1 className="Hero__title">
          <span>Le bistrot</span>
          <span>nuancé</span>
        </h1>
        <p className="Hero__subtitle">Le lieu incontournable situé à Villeneuve Loubet</p>
      </div>

      {/* Indicateur scroll vertical */}
      <div className="Hero__scroll" aria-hidden="true">
        <span className="Hero__scroll-line" />
        <span className="Hero__scroll-label">scroll</span>
      </div>

    </section>
  )
}
