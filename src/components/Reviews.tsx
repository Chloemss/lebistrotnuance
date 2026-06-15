import { useState, useEffect, useCallback, useRef } from 'react'
import './Reviews.css'

const REVIEWS = [
  {
    quote: "Un endroit qui mêle à la perfection l'art de vivre à la française et la convivialité. Les cocktails sont de véritables œuvres — l'ambiance y est tout simplement envoûtante.",
    author: 'Sophie M.',
    date: 'il y a 2 semaines',
  },
  {
    quote: "La cuisine est généreuse, authentique, et l'équipe d'une gentillesse rare. Le Lucky Burger est une révélation absolue. On y revient avec plaisir, encore et encore.",
    author: 'Thomas R.',
    date: 'il y a 1 mois',
  },
  {
    quote: "Soirée karaoké mémorable dans un cadre élégant. Le service est irréprochable et les cocktails signature sont à la hauteur de la réputation du lieu.",
    author: 'Camille D.',
    date: 'il y a 3 semaines',
  },
  {
    quote: "Un coup de cœur absolu. L'atmosphère est unique — entre brasserie chic et salle de jeux festive. Parfait pour les repas en famille comme pour les soirées entre amis.",
    author: 'Antoine B.',
    date: 'il y a 1 mois',
  },
  {
    quote: "La meilleure adresse de Villeneuve-Loubet, sans hésitation. Plats savoureux, accueil chaleureux, et une ambiance qui donne envie de rester jusqu'à la fermeture.",
    author: 'Marie-Claire F.',
    date: 'il y a 2 mois',
  },
]

export default function Reviews() {
  const [idx, setIdx]         = useState(0)
  const [visible, setVisible] = useState(true)
  const timeoutRef            = useRef<ReturnType<typeof setTimeout>>(undefined)

  const go = useCallback((next: number) => {
    clearTimeout(timeoutRef.current)
    setVisible(false)
    timeoutRef.current = setTimeout(() => {
      setIdx(next)
      setVisible(true)
    }, 480)
  }, [])

  /* Auto-rotation toutes les 5,5 s */
  useEffect(() => {
    const t = setInterval(() => {
      go((idx + 1) % REVIEWS.length)
    }, 5500)
    return () => clearInterval(t)
  }, [idx, go])

  const r = REVIEWS[idx]

  return (
    <section className="Reviews" id="avis">

      {/* Filigrane géant en fond */}
      <span className="Reviews__watermark" aria-hidden="true">4,8</span>

      {/* Grain pelliculaire */}
      <div className="Reviews__grain" aria-hidden="true" />

      {/* ── Score agrégat ── */}
      <header className="Reviews__header">
        <span className="Reviews__eyebrow">Avis clients</span>

        <div className="Reviews__badge" data-delay="1">
          {/* Étoiles */}
          <div className="Reviews__stars" aria-label="5 étoiles sur 5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="Reviews__star" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M8 1l1.545 3.13 3.455.502-2.5 2.437.59 3.44L8 8.895 4.91 10.51l.59-3.44L3 4.632l3.455-.502z"
                  fill="currentColor"
                />
              </svg>
            ))}
          </div>

          <span className="Reviews__score-num">4,8</span>
          <span className="Reviews__score-sep" aria-hidden="true">·</span>
          <span className="Reviews__count">340+ avis Google</span>
        </div>
      </header>

      {/* ── Zone citation ── */}
      <div
        className={`Reviews__stage${visible ? ' is-visible' : ''}`}
        aria-live="polite"
        aria-atomic="true"
      >
        {/* Guillemet décoratif */}
        <span className="Reviews__deco-quote" aria-hidden="true">"</span>

        <blockquote className="Reviews__quote">{r.quote}</blockquote>

        <footer className="Reviews__meta">
          <span className="Reviews__author">— {r.author}</span>
          <span className="Reviews__meta-sep" aria-hidden="true">·</span>
          <time className="Reviews__date">{r.date}</time>
        </footer>
      </div>

      {/* ── Navigation dots ── */}
      <nav className="Reviews__nav" data-delay="2" aria-label="Naviguer entre les avis">
        {REVIEWS.map((_, i) => (
          <button
            key={i}
            className={`Reviews__dot${i === idx ? ' is-active' : ''}`}
            onClick={() => go(i)}
            aria-label={`Voir l'avis ${i + 1}`}
            aria-current={i === idx ? 'true' : undefined}
          />
        ))}
      </nav>

      {/* Lien Google */}
      <a
        href="https://maps.google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="Reviews__google-link"
        data-delay="3"
      >
        <svg className="Reviews__google-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Voir tous les avis
        <svg className="Reviews__arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2"
                strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>

    </section>
  )
}
