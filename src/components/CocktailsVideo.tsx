import { useState, useRef } from 'react'
import './CocktailsVideo.css'

interface CocktailVideoItem {
  id: string
  num: string
  nom: string
  desc: string
  prix: string
  badge?: string
  accent: string
  gradient: string
  // Remplacer par le chemin réel, ex: '/videos/lucky-sour.mp4'
  videoSrc: string
}

const COCKTAILS: CocktailVideoItem[] = [
  {
    id: 'cv-lucky-sour',
    num: '01',
    nom: 'Lucky Sour',
    desc: "Whisky bourbon · Jus de citron · Sirop de miel · Blanc d'œuf",
    prix: '11€',
    badge: 'Signature',
    accent: '#f0c040',
    gradient: 'radial-gradient(ellipse 60% 70% at 50% 60%, #f0c040 0%, #c8800a 40%, #3a1a00 80%, #0d0905 100%)',
    videoSrc: 'videos/verre1.mp4',
  },
  {
    id: 'cv-spritz-foire',
    num: '02',
    nom: 'Spritz Foire',
    desc: 'Aperol · Prosecco · Orange sanguine · Eau gazeuse',
    prix: '10€',
    accent: '#ff8c42',
    gradient: 'radial-gradient(ellipse 55% 65% at 50% 65%, #ff8c42 0%, #e84a10 45%, #2a0800 80%, #0d0804 100%)',
    videoSrc: '/videos/verre2.mp4',
  },
  {
    id: 'cv-moscow-mule',
    num: '03',
    nom: 'Moscow Mule',
    desc: 'Vodka · Ginger beer artisanal · Citron vert · Menthe fraîche',
    prix: '10€',
    accent: '#72d472',
    gradient: 'radial-gradient(ellipse 55% 65% at 50% 65%, #72d472 0%, #1a7a1a 45%, #041204 80%, #060d06 100%)',
    videoSrc: '/videos/verre3.mp4',
  },
  {
    id: 'cv-margarita',
    num: '04',
    nom: 'Margarita Classique',
    desc: 'Tequila blanco · Cointreau · Citron vert · Fleur de sel',
    prix: '11€',
    accent: '#c8f060',
    gradient: 'radial-gradient(ellipse 55% 65% at 50% 65%, #c8f060 0%, #60a010 45%, #142200 80%, #090d05 100%)',
    videoSrc: '/videos/margarita.mp4',
  },
  {
    id: 'cv-virgin-colada',
    num: '05',
    nom: 'Virgin Colada',
    desc: 'Ananas frais · Crème de coco · Citron vert — sans alcool',
    prix: '8€',
    badge: 'Mocktail',
    accent: '#ffe0a0',
    gradient: 'radial-gradient(ellipse 55% 65% at 50% 65%, #ffe0a0 0%, #f0a820 45%, #3a1e00 80%, #0d0a05 100%)',
    videoSrc: '/videos/virgin-colada.mp4',
  },
  {
    id: 'cv-limonade',
    num: '06',
    nom: 'Limonade Maison',
    desc: 'Citrons pressés du jour · Sirop de menthe · Eau pétillante artisanale',
    prix: '6€',
    badge: 'Mocktail',
    accent: '#f8f060',
    gradient: 'radial-gradient(ellipse 55% 65% at 50% 65%, #f8f060 0%, #c8c010 45%, #1e1e00 80%, #0a0a04 100%)',
    videoSrc: '/videos/limonade.mp4',
  },
]

export default function CocktailsVideo() {
  const [activeId, setActiveId]   = useState<string>(COCKTAILS[0].id)
  const [hovering, setHovering]   = useState(false)
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})

  const handleEnter = (id: string) => {
    setActiveId(id)
    setHovering(true)
    const vid = videoRefs.current[id]
    if (vid) {
      vid.currentTime = 0
      vid.play().catch(() => { /* src manquante, ok */ })
    }
  }

  const active = COCKTAILS.find(c => c.id === activeId)!

  return (
    <section
      className="CocktailsVideo"
      onMouseLeave={() => setHovering(false)}
    >
      {/* ── Bruit de fond ── */}
      <div className="CocktailsVideo__noise" aria-hidden="true" />

      <div className="CocktailsVideo__inner">

        {/* ══ Liste ══ */}
        <ul className="CocktailsVideo__list">
          {COCKTAILS.map(c => (
            <li
              key={c.id}
              className={[
                'CocktailsVideo__item',
                hovering && activeId === c.id  ? 'is--active' : '',
                hovering && activeId !== c.id  ? 'is--dim'    : '',
              ].join(' ')}
              style={{ '--accent': c.accent } as React.CSSProperties}
              onMouseEnter={() => handleEnter(c.id)}
            >
              <span className="CocktailsVideo__item-num">{c.num}</span>

              <div className="CocktailsVideo__item-center">
                <span className="CocktailsVideo__item-name">{c.nom}</span>
                <span className="CocktailsVideo__item-desc">{c.desc}</span>
              </div>

              <div className="CocktailsVideo__item-right">
                {c.badge && (
                  <span className="CocktailsVideo__item-badge">{c.badge}</span>
                )}
                <span className="CocktailsVideo__item-price">{c.prix}</span>
              </div>
            </li>
          ))}
        </ul>

        {/* ══ Encart vidéo sticky ══ */}
        <div
          className="CocktailsVideo__encart"
          style={{ '--accent': active.accent } as React.CSSProperties}
          aria-hidden="true"
        >
          {/* Couches vidéo + gradient de fallback (crossfade) */}
          {COCKTAILS.map(c => (
            <div
              key={c.id}
              className={`CocktailsVideo__layer${activeId === c.id ? ' is--active' : ''}`}
            >
              {/* Gradient toujours visible en fond */}
              <div
                className="CocktailsVideo__layer-bg"
                style={{ background: c.gradient }}
              />
              {/* Vidéo par-dessus (remplace le gradient quand disponible) */}
              <video
                ref={el => { videoRefs.current[c.id] = el }}
                className="CocktailsVideo__layer-video"
                src={c.videoSrc}
                muted
                loop
                playsInline
              />
            </div>
          ))}

          {/* Label en bas */}
          <div className="CocktailsVideo__encart-label">
            <span
              className="CocktailsVideo__encart-name"
              style={{ color: active.accent }}
            >
              {active.nom}
            </span>
            <span className="CocktailsVideo__encart-price">
              {active.prix}
            </span>
          </div>

          {/* Glow coloré en bas */}
          <div
            className="CocktailsVideo__encart-glow"
            style={{ background: active.accent }}
          />

          {/* Bordure lumineuse */}
          <div
            className="CocktailsVideo__encart-border"
            style={{ borderColor: `${active.accent}35` }}
          />
        </div>

      </div>
    </section>
  )
}
