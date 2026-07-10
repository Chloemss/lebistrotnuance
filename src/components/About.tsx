import type { RefObject } from 'react'
import { useParallax } from '../hooks/useParallax'
import './About.css'

/* ── Effet hover désactivé — logique des scènes vidéo au survol ──
import { useState, useRef, useCallback } from 'react'

type HoverKey = 'manger' | 'boire' | 'profiter'

const SCENES: Record<HoverKey, string> = {
  manger:   '/videos/restaurant.mp4',
  boire:    '/videos/cocktail.mp4',
  profiter: '/videos/hotel.mp4',
}
── */

export default function About() {
  const contentRef = useParallax(-0.06) as RefObject<HTMLDivElement>

  return (
    <section className="About is--green">

      {/* ── Effet hover désactivé — scènes vidéo au survol des mots ──
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
      ── */}

      <div className="About__content" ref={contentRef}>

        <span className="About__eyebrow">Le bistrot des nuances · Villeneuve-Loubet</span>

        <h2 className="About__title">
          <span className="About__title-word">Manger,</span>
          <span className="About__title-word">boire</span>
          <span className="About__title-word">&amp;&nbsp;profiter.</span>
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
            <span className="About__schedule-time">9h30 – 00h30</span>
            <span className="About__schedule-note">Ouvert 7 jours sur 7</span>
          </div>

        </div>

        {/* ── Devanture — bandeau panoramique pleine largeur ── */}
        <div className="About__figure">
          <figure className="About__devanture">
            <img
              src="/devanture.jpg"
              alt="La devanture du Bistrot des Nuances à Villeneuve-Loubet"
              loading="lazy"
            />
            <span className="About__devanture-frame" aria-hidden="true" />
            <figcaption className="About__devanture-caption">
              La devanture · Villeneuve-Loubet
            </figcaption>
          </figure>
        </div>
      </div>

    </section>
  )
}
