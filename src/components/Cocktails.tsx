import { useState, useRef, useEffect, useCallback } from 'react'
import './Cocktails.css'

interface CocktailItem {
  id: string
  num: string
  nom: string
  desc: string
  prix: string
  badge?: string
  // Gradient simulant la photo (fond bar + couleur du cocktail)
  gradient: string
  accent: string
}

const COCKTAILS: CocktailItem[] = [
  {
    id: 'lucky-sour',
    num: '01',
    nom: 'Lucky Sour',
    desc: 'Whisky bourbon · Jus de citron · Sirop de miel · Blanc d\'œuf',
    prix: '11€',
    badge: 'Signature',
    gradient: 'radial-gradient(ellipse 60% 70% at 50% 60%, #f0c040 0%, #c8800a 40%, #3a1a00 80%, #0d0905 100%)',
    accent: '#f0c040',
  },
  {
    id: 'spritz-foire',
    num: '02',
    nom: 'Spritz Foire',
    desc: 'Aperol · Prosecco · Orange sanguine · Eau gazeuse',
    prix: '10€',
    gradient: 'radial-gradient(ellipse 55% 65% at 50% 65%, #ff8c42 0%, #e84a10 45%, #2a0800 80%, #0d0804 100%)',
    accent: '#ff8c42',
  },
  {
    id: 'moscow-mule',
    num: '03',
    nom: 'Moscow Mule',
    desc: 'Vodka · Ginger beer artisanal · Citron vert · Menthe fraîche',
    prix: '10€',
    gradient: 'radial-gradient(ellipse 55% 65% at 50% 65%, #72d472 0%, #1a7a1a 45%, #041204 80%, #060d06 100%)',
    accent: '#72d472',
  },
  {
    id: 'margarita',
    num: '04',
    nom: 'Margarita Classique',
    desc: 'Tequila blanco · Cointreau · Citron vert · Fleur de sel',
    prix: '11€',
    gradient: 'radial-gradient(ellipse 55% 65% at 50% 65%, #c8f060 0%, #60a010 45%, #142200 80%, #090d05 100%)',
    accent: '#c8f060',
  },
  {
    id: 'virgin-colada',
    num: '05',
    nom: 'Virgin Colada',
    desc: 'Ananas frais · Crème de coco · Citron vert — sans alcool',
    prix: '8€',
    badge: 'Mocktail',
    gradient: 'radial-gradient(ellipse 55% 65% at 50% 65%, #ffe0a0 0%, #f0a820 45%, #3a1e00 80%, #0d0a05 100%)',
    accent: '#ffe0a0',
  },
  {
    id: 'limonade',
    num: '06',
    nom: 'Limonade Maison',
    desc: 'Citrons pressés du jour · Sirop de menthe · Eau pétillante artisanale',
    prix: '6€',
    badge: 'Mocktail',
    gradient: 'radial-gradient(ellipse 55% 65% at 50% 65%, #f8f060 0%, #c8c010 45%, #1e1e00 80%, #0a0a04 100%)',
    accent: '#f8f060',
  },
]

/* ── Lerp helper ── */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export default function Cocktails() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [visible, setVisible]   = useState(false)

  const cardRef     = useRef<HTMLDivElement>(null)
  const target      = useRef({ x: 0, y: 0 })
  const current     = useRef({ x: 0, y: 0 })
  const tiltTarget  = useRef({ x: 0, y: 0 })
  const tiltCurrent = useRef({ x: 0, y: 0 })
  const rafId       = useRef<number>(0)
  const sectionRef  = useRef<HTMLElement>(null)

  /* ── Boucle RAF : lerp position + tilt ── */
  const animate = useCallback(() => {
    current.current.x     = lerp(current.current.x,     target.current.x,      0.10)
    current.current.y     = lerp(current.current.y,     target.current.y,      0.10)
    tiltCurrent.current.x = lerp(tiltCurrent.current.x, tiltTarget.current.x,  0.08)
    tiltCurrent.current.y = lerp(tiltCurrent.current.y, tiltTarget.current.y,  0.08)

    if (cardRef.current) {
      cardRef.current.style.transform =
        `translate(${current.current.x}px, ${current.current.y}px)` +
        `rotateX(${tiltCurrent.current.y}deg)` +
        `rotateY(${tiltCurrent.current.x}deg)`
    }
    rafId.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    rafId.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId.current)
  }, [animate])

  /* ── Suivi de la souris ── */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current!.getBoundingClientRect()
    // Position du card : centré sur le curseur, décalé pour ne pas masquer
    target.current.x = e.clientX - rect.left  - 160
    target.current.y = e.clientY - rect.top   - 210

    // Tilt basé sur la position relative dans la fenêtre
    const cx = (e.clientX / window.innerWidth  - 0.5) * 2   // -1 → +1
    const cy = (e.clientY / window.innerHeight - 0.5) * 2
    tiltTarget.current.x =  cx * 12   // max 12° sur X
    tiltTarget.current.y = -cy * 10   // max 10° sur Y
  }, [])

  const activeCocktail = COCKTAILS.find(c => c.id === activeId)

  return (
    <section
      className="Cocktails"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setVisible(false); setActiveId(null) }}
    >
      {/* ── Header ── */}
      <div className="Cocktails__header">
        <p className="Cocktails__eyebrow">Bar · Mixologie</p>
        <h2 className="Cocktails__title">
          Cock<span>tails</span>
        </h2>
      </div>

      {/* ── Liste des cocktails ── */}
      <ul className="Cocktails__list">
        {COCKTAILS.map((c) => (
          <li
            key={c.id}
            className={`Cocktails__item${activeId === c.id ? ' is--active' : ''}${activeId && activeId !== c.id ? ' is--dim' : ''}`}
            style={{ '--accent': c.accent } as React.CSSProperties}
            onMouseEnter={() => { setActiveId(c.id); setVisible(true) }}
          >
            <span className="Cocktails__item-num">{c.num}</span>

            <div className="Cocktails__item-center">
              <span className="Cocktails__item-name">{c.nom}</span>
              <span className="Cocktails__item-desc">{c.desc}</span>
            </div>

            <div className="Cocktails__item-right">
              {c.badge && <span className="Cocktails__item-badge">{c.badge}</span>}
              <span className="Cocktails__item-price">{c.prix}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* ── Floating card (cursor follower) ── */}
      <div
        ref={cardRef}
        className={`Cocktails__card${visible && activeCocktail ? ' is--visible' : ''}`}
        aria-hidden="true"
        style={{ perspective: '800px' }}
      >
        {/* On empile toutes les images, seule la bonne est visible */}
        {COCKTAILS.map(c => (
          <div
            key={c.id}
            className={`Cocktails__card-img${activeId === c.id ? ' is--active' : ''}`}
            style={{ background: c.gradient }}
          >
            {/* Verre SVG stylisé centré */}
            <div className="Cocktails__card-glass">
              <svg viewBox="0 0 80 130" fill="none">
                {/* Liquide dans le verre */}
                <path
                  d="M14 45 L66 45 L60 120 Q60 122 57 122 L23 122 Q20 122 20 120 Z"
                  fill={c.accent} opacity="0.55"
                />
                {/* Verre highball */}
                <path
                  d="M14 15 L66 15 L60 120 Q60 122 57 122 L23 122 Q20 122 20 120 Z"
                  stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="none" strokeLinejoin="round"
                />
                {/* Reflet */}
                <path
                  d="M16 18 L24 18 L21 110 L16 105 Z"
                  fill="rgba(255,255,255,0.08)"
                />
                {/* Glaçons */}
                <rect x="25" y="50" width="14" height="12" rx="2"
                  fill="rgba(255,255,255,0.25)" transform="rotate(-8 32 56)"/>
                <rect x="42" y="55" width="12" height="10" rx="2"
                  fill="rgba(255,255,255,0.2)" transform="rotate(5 48 60)"/>
                {/* Bulles */}
                <circle cx="35" cy="80" r="1.5" fill={c.accent} opacity="0.6"/>
                <circle cx="50" cy="95" r="1"   fill={c.accent} opacity="0.5"/>
                <circle cx="30" cy="100" r="1.2" fill={c.accent} opacity="0.4"/>
              </svg>
            </div>

            {/* Nom du cocktail */}
            <div className="Cocktails__card-label">
              <p className="Cocktails__card-name" style={{ color: c.accent }}>{c.nom}</p>
              <p className="Cocktails__card-price">{c.prix}</p>
            </div>

            {/* Reflets lumineux bokeh */}
            <div className="Cocktails__card-bokeh" style={{ '--accent': c.accent } as React.CSSProperties}/>
          </div>
        ))}

        {/* Bordure brillante */}
        <div className="Cocktails__card-border"
          style={{ borderColor: activeCocktail ? `${activeCocktail.accent}40` : 'transparent' }}/>
      </div>

    </section>
  )
}
