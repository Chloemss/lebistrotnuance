import type { RefObject } from 'react'
import { useParallax } from '../hooks/useParallax'
import './Hero.css'

interface HeroProps { onReserve?: () => void }

export default function Hero({ onReserve }: HeroProps) {
  const bgRef = useParallax(0.18) as RefObject<HTMLDivElement>

  return (
    <section className="Hero">

      {/* ── Fond vidéo plein-écran ── */}
      <div className="Hero__bg" aria-hidden="true">

        <div ref={bgRef} className="Hero__bg-parallax parallax-y">
          <img
            className="Hero__bg-video Hero__bg-video--default"
            src="/fond.jpg"
            alt=""
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
          <span>des <em>nuances.</em></span>
        </h1>
        <p className="Hero__subtitle">Le lieu incontournable situé à Villeneuve Loubet</p>
        <div className="Hero__actions">
          <button className="Hero__cta Hero__cta--primary" onClick={onReserve}>
            Réserver une table
          </button>
          <a className="Hero__cta Hero__cta--ghost" href="#carte">
            Découvrir la carte
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Indicateur scroll vertical */}
      <div className="Hero__scroll" aria-hidden="true">
        <span className="Hero__scroll-line" />
        <span className="Hero__scroll-label">scroll</span>
      </div>

    </section>
  )
}
