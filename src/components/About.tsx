import type { RefObject } from 'react'
import { useParallax } from '../hooks/useParallax'
import './About.css'

const ATOUTS = [
  {
    label: 'Restaurant & Bar',
    sub: 'Cuisine maison & cocktails',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v6a3 3 0 003 3h0a3 3 0 003-3V2M6 11v11M18 2c0 5-3 5-3 8v10"/>
      </svg>
    ),
  },
  {
    label: 'Sans réservation',
    sub: "Aucune réservation, l'impulsion du moment",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M9 15l2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: 'Parking',
    sub: 'À deux pas',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 010 6H9"/>
      </svg>
    ),
  },
  {
    label: 'Terrasse ombragée',
    sub: 'Les beaux jours à l\'ombre',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 12a11 11 0 00-22 0z"/><path d="M12 12v6a3 3 0 006 0"/>
      </svg>
    ),
  },
]

export default function About() {
  const contentRef = useParallax(-0.04) as RefObject<HTMLDivElement>

  return (
    <section className="About is--green">
      <div className="About__content" ref={contentRef}>
        
        <header className="About__header">
          <span className="About__eyebrow">Le bistrot des nuances · Villeneuve-Loubet</span>
          
          <h2 className="About__title">
            <span className="About__title-line">
              <span className="About__title-word">Restaurant,</span>
            </span>
            <span className="About__title-line">
              <span className="About__title-word">Bar</span>
            </span>
            <span className="About__title-line">
              <span className="About__title-word">&amp; <em>Lounge.</em></span>
            </span>
          </h2>
        </header>

        <div className="About__grid">
          <div className="About__apropos">
            <span className="About__section-label">À propos</span>
            <p className="About__desc">
Restaurant, bar & lounge pensé comme une guinguette contemporaine. Niché au cœur de Villeneuve-Loubet, ce lieu de vie hybride cultive l'art du bien-recevoir : cuisine maison généreuse, cocktails signatures et atmosphère chaleureuse.
            </p>
          </div>

          <div className="About__schedule">
            <span className="About__section-label">Ouverture</span>
            <div className="About__schedule-timeline">
              <div className="About__schedule-slot">
                <span className="About__schedule-days">Lundi — Dimanche</span>
                <span className="About__schedule-hours">09:30 — 00:30</span>
              </div>
            </div>
            <div className="About__location">
              <span className="About__location-dot" aria-hidden="true" />
              <div>
                <strong className="About__location-name">Villeneuve-Loubet</strong>
                <span className="About__location-coords">43°37′N · 7°07′E</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Nos atouts ── */}
        <ul className="About__features">
          {ATOUTS.map(a => (
            <li className="About__feature" key={a.label}>
              <span className="About__feature-icon" aria-hidden="true">{a.icon}</span>
              <div className="About__feature-text">
                <strong className="About__feature-label">{a.label}</strong>
                <span className="About__feature-sub">{a.sub}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Devanture 100vw ── */}
      {/* <div className="About__figure">
        <figure className="About__devanture">
          <img
            src="/devanture.jpg"
            alt="La devanture du Bistrot des Nuances à Villeneuve-Loubet"
            width="4250"
            height="1963"
            loading="lazy"
            decoding="async"
          />
        </figure> */}
        {/* Badge esthétique tournant pour habiller l'image */}
        {/* <div className="About__badge" aria-hidden="true">
          Bistrot<br/>des nuances
        </div>
      </div> */}
    </section>
  )
}