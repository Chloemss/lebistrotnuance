import { useState } from 'react'
import './Menu.css'
import './MenuVideo.css'

/* ── Allergènes (identique à Menu.tsx) ── */
type AllergenKey =
  | 'gluten' | 'crustaces' | 'oeufs' | 'poisson'
  | 'arachides' | 'soja' | 'lait' | 'fruits_a_coques'
  | 'celeri' | 'moutarde' | 'sesame' | 'sulfites' | 'mollusques'

const ALLERGEN_ICONS: Record<AllergenKey, JSX.Element> = {
  gluten: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="22" x2="12" y2="2"/>
      <path d="M12 5C10.5 3 7.5 3.5 7.5 6C7.5 8.5 12 8.5 12 8.5"/>
      <path d="M12 5C13.5 3 16.5 3.5 16.5 6C16.5 8.5 12 8.5 12 8.5"/>
      <path d="M12 10.5C10.5 8.5 7.5 9 7.5 11.5C7.5 14 12 14 12 14"/>
      <path d="M12 10.5C13.5 8.5 16.5 9 16.5 11.5C16.5 14 12 14 12 14"/>
      <path d="M12 16C10.5 14 7.5 14.5 7.5 17C7.5 19.5 12 19.5 12 19.5"/>
      <path d="M12 16C13.5 14 16.5 14.5 16.5 17C16.5 19.5 12 19.5 12 19.5"/>
    </svg>
  ),
  crustaces: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20C8 20 5 17 5 13C5 10 7 8 9 7L12 6L15 7C17 8 19 10 19 13C19 17 16 20 12 20Z"/>
      <path d="M9 7L6 4M15 7L18 4"/>
      <path d="M7 13L4 12M17 13L20 12"/>
      <path d="M7 16L4 18M17 16L20 18"/>
      <line x1="12" y1="6" x2="12" y2="3"/>
      <path d="M10 14C10 14 11 15.5 12 15.5C13 15.5 14 14 14 14"/>
    </svg>
  ),
  oeufs: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M12 3C8.5 3 5.5 7 5.5 12.5C5.5 17 8.5 21 12 21C15.5 21 18.5 17 18.5 12.5C18.5 7 15.5 3 12 3Z"/>
    </svg>
  ),
  poisson: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12C2 12 7 5 14 5C17.5 5 20 7.5 20 12C20 16.5 17.5 19 14 19C7 19 2 12 2 12Z"/>
      <path d="M20 12L23 8M20 12L23 16"/>
      <circle cx="9" cy="11" r="1" fill="currentColor" stroke="none"/>
    </svg>
  ),
  arachides: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M12 2C9.5 2 7.5 4 7.5 6.5C7.5 8 8.2 9.2 9.5 10C8.2 10.8 7.5 12 7.5 13.5C7.5 16 9.5 18 12 18C14.5 18 16.5 16 16.5 13.5C16.5 12 15.8 10.8 14.5 10C15.8 9.2 16.5 8 16.5 6.5C16.5 4 14.5 2 12 2Z"/>
      <line x1="12" y1="10" x2="12" y2="18"/>
      <path d="M10 22C10 22 10.5 19 12 19C13.5 19 14 22 14 22"/>
    </svg>
  ),
  soja: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3C9 3 7 5.5 7 8.5C7 11 8.5 13 10.5 13.5"/>
      <path d="M12 3C15 3 17 5.5 17 8.5C17 11 15.5 13 13.5 13.5"/>
      <path d="M10.5 13.5C9 14 8 16 8 18C8 20 9.5 21.5 12 21.5C14.5 21.5 16 20 16 18C16 16 15 14 13.5 13.5"/>
      <line x1="12" y1="3" x2="12" y2="13.5"/>
    </svg>
  ),
  lait: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3H15V5.5L17 8V20H7V8L9 5.5V3Z"/>
      <line x1="9" y1="3" x2="15" y2="3"/>
      <path d="M7 11H17"/>
      <path d="M10 14.5C10 14.5 11 16 12 16C13 16 14 14.5 14 14.5"/>
    </svg>
  ),
  fruits_a_coques: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4C9 4 6.5 6.5 6.5 10C6.5 13.5 9 16 12 16C15 16 17.5 13.5 17.5 10C17.5 6.5 15 4 12 4Z"/>
      <path d="M9 10C9 10 9 7 12 7C15 7 15 10 15 10"/>
      <line x1="12" y1="16" x2="12" y2="20"/>
      <path d="M9 20H15"/>
    </svg>
  ),
  celeri: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="22" x2="12" y2="10"/>
      <line x1="8" y1="22" x2="8" y2="12"/>
      <line x1="16" y1="22" x2="16" y2="12"/>
      <path d="M12 10C12 10 9 7 7 5C7 5 10 4 12 7"/>
      <path d="M12 10C12 10 15 7 17 5C17 5 14 4 12 7"/>
      <path d="M8 12C8 12 6 9 5 7C5 7 7.5 7 8.5 10"/>
      <path d="M16 12C16 12 18 9 19 7C19 7 16.5 7 15.5 10"/>
    </svg>
  ),
  moutarde: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="22" x2="12" y2="12"/>
      <circle cx="9" cy="7" r="3"/>
      <circle cx="15" cy="9" r="2.5"/>
      <circle cx="10" cy="12" r="2"/>
      <circle cx="15" cy="13" r="1.5"/>
    </svg>
  ),
  sesame: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <ellipse cx="12" cy="12" rx="3" ry="5"/>
      <ellipse cx="6" cy="9" rx="2.5" ry="4" transform="rotate(-30 6 9)"/>
      <ellipse cx="18" cy="9" rx="2.5" ry="4" transform="rotate(30 18 9)"/>
      <ellipse cx="6" cy="15" rx="2.5" ry="4" transform="rotate(30 6 15)"/>
      <ellipse cx="18" cy="15" rx="2.5" ry="4" transform="rotate(-30 18 15)"/>
    </svg>
  ),
  sulfites: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3H17L15 12H9L7 3Z"/>
      <path d="M9 12C9 12 9 16 12 16C15 16 15 12 15 12"/>
      <line x1="12" y1="16" x2="12" y2="20"/>
      <line x1="9" y1="20" x2="15" y2="20"/>
    </svg>
  ),
  mollusques: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4C8 4 5 7.5 5 12C5 16 7.5 20 12 20C16.5 20 19 16 19 12C19 7.5 16 4 12 4Z"/>
      <path d="M12 4C12 4 9 8 9 12C9 16 12 20 12 20"/>
      <path d="M12 4C12 4 15 8 15 12C15 16 12 20 12 20"/>
      <path d="M5.5 10H18.5"/>
      <path d="M5.5 14H18.5"/>
    </svg>
  ),
}

const ALLERGEN_LABELS: Record<AllergenKey, string> = {
  gluten:          'Gluten',
  crustaces:       'Crustacés',
  oeufs:           'Œufs',
  poisson:         'Poisson',
  arachides:       'Arachides',
  soja:            'Soja',
  lait:            'Lait',
  fruits_a_coques: 'Fruits à coques',
  celeri:          'Céleri',
  moutarde:        'Moutarde',
  sesame:          'Sésame',
  sulfites:        'Sulfites',
  mollusques:      'Mollusques',
}

interface Dish {
  nom: string
  desc: string
  prix: string
  badge?: string
  vege?: boolean
  allergenes?: AllergenKey[]
  imgSrc?: string
}

interface Category {
  id: string
  label: string
  color: 'red' | 'amber' | 'green'
  items: Dish[]
}

const CATEGORIES: Category[] = [
  {
    id: 'manger', label: 'Manger', color: 'red',
    items: [
      { nom: 'Lucky Burger',          desc: 'Steak haché charolais, cheddar fondu, oignons caramélisés, sauce secrète',  prix: '16€', badge: 'Best-seller', allergenes: ['gluten','lait','oeufs','sesame'],    imgSrc: '/mojito.jpg' },
      { nom: 'Planche Charcuterie',   desc: 'Saucisson, jambon de pays, cornichons, moutarde à l\'ancienne',             prix: '14€', allergenes: ['gluten','moutarde','sulfites'],                               imgSrc: '/capi.jpg' },
      { nom: 'Salade César',          desc: 'Poulet grillé, parmesan, croutons maison, sauce César',                    prix: '13€', allergenes: ['gluten','lait','oeufs','poisson'],                             imgSrc: '/juice.jpg' },
      { nom: 'Burger Végétarien',     desc: 'Galette de légumes rôtis, avocat, tomates confites, sauce yaourt',         prix: '14€', vege: true, allergenes: ['gluten','lait','sesame'],                         imgSrc: '/pamplemousse.jpg' },
      { nom: 'Pavé de Saumon',        desc: 'Purée maison, légumes de saison, beurre blanc au citron',                  prix: '18€', allergenes: ['poisson','lait'],                                             imgSrc: '/mojito.jpg' },
      { nom: 'Soupe du Jour',         desc: 'Préparée chaque matin selon l\'arrivage, pain de campagne',                prix: '7€',  vege: true, allergenes: ['gluten','celeri'],                                imgSrc: '/mojito.jpg' },
      // { nom: 'Sticky Toffee Pudding', desc: 'Caramel beurre salé, crème anglaise vanille, glace vanille',              prix: '8€',  badge: 'Coup de cœur', allergenes: ['gluten','lait','oeufs'],               imgSrc: '/mojito.jpg' },
      // { nom: 'Tarte du Moment',       desc: 'Recette du chef — ardoise du jour',                                        prix: '9€',  allergenes: ['gluten','oeufs','lait'],                                      imgSrc: '/mojito.jpg' },
    ],
  },
  {
    id: 'boire', label: 'Boire', color: 'amber',
    items: [
      { nom: 'Lucky Sour',          desc: 'Whisky bourbon, citron, sirop de miel, blanc d\'œuf',  prix: '11€', badge: 'Signature', allergenes: [],      imgSrc: '/mojito.jpg' },
      { nom: 'Spritz Foire',        desc: 'Aperol, prosecco, orange, eau gazeuse',                prix: '10€', allergenes: [],                                  imgSrc: '/capi.jpg' },
      { nom: 'Moscow Mule',         desc: 'Vodka, ginger beer, citron vert, menthe fraîche',      prix: '10€', allergenes: [],                                            imgSrc: '/juice.jpg' },
      { nom: 'Margarita Classique', desc: 'Tequila blanco, Cointreau, citron vert, fleur de sel', prix: '11€', allergenes: [],                                  imgSrc: '/pamplemousse.jpg' },
      { nom: 'Virgin Colada',       desc: 'Ananas, crème de coco, citron vert — sans alcool',     prix: '8€',  badge: 'Mocktail', allergenes: [],        imgSrc: '/mojito.jpg' },
      { nom: 'Limonade Maison',     desc: 'Citrons pressés du jour, menthe, eau pétillante',      prix: '6€',  badge: 'Mocktail', vege: true, allergenes: [],             imgSrc: '/capi.jpg' },
      { nom: 'Bière Artisanale',    desc: 'Sélection de brasseries locales du moment',            prix: '6€',  allergenes: [],                                    imgSrc: '/juice.jpg' },
      { nom: 'Vin de la Maison',    desc: 'Rouge, blanc ou rosé — ardoise du jour',               prix: '5€',  allergenes: [],                                  imgSrc: '/pamplemousse.jpg' },
    ],
  },
  {
    id: 'snack', label: 'Snack', color: 'green',
    items: [
      { nom: 'Frites Maison',   desc: 'Pommes de terre fraîches, sauce au choix',            prix: '4€',  vege: true, allergenes: ['gluten'],                         imgSrc: '/mojito.jpg' },
      { nom: 'Onion Rings',     desc: 'Rondelles d\'oignons panées, sauce ranch',            prix: '5€',  vege: true, allergenes: ['gluten','oeufs','lait'],           imgSrc: '/mojito.jpg' },
      { nom: 'Nuggets Poulet',  desc: '6 pièces croustillantes, sauce BBQ fumée maison',    prix: '7€',  allergenes: ['gluten','oeufs'],                              imgSrc: '/mojito.jpg' },
      { nom: 'Nachos Festifs',  desc: 'Guacamole, salsa maison, sour cream, jalapeños',     prix: '9€',  badge: 'Best-seller', vege: true, allergenes: ['lait'],      imgSrc: '/mojito.jpg' },
      { nom: 'Cheese Balls',    desc: 'Cœur de cheddar fondant, enrobage doré',             prix: '6€',  vege: true, allergenes: ['gluten','lait','oeufs'],           imgSrc: '/mojito.jpg' },
      { nom: 'Mini Sliders ×3', desc: 'Bœuf, comté fondu, cornichon, brioche grillée',     prix: '10€', allergenes: ['gluten','lait','oeufs','sesame'],              imgSrc: '/mojito.jpg' },
    ],
  },
]

export default function MenuVideo() {
  const [active, setActive]         = useState('manger')
  const [selectedDish, setSelected] = useState<string | null>(null)

  const cat = CATEGORIES.find(c => c.id === active)!

  /* Changement d'onglet → reset la sélection */
  const handleTabChange = (id: string) => {
    setActive(id)
    setSelected(null)
  }

  const enterDish = (dish: Dish) => {
    if (!dish.imgSrc) return
    setSelected(dish.nom)
  }

  const handleBodyLeave = () => setSelected(null)

  const videoOpen = selectedDish !== null

  return (
    <section className="Menu" id="carte-video">

      {/* ── Label distinctif ──
      <div style={{ textAlign: 'center', padding: '0.6rem 1rem 0', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#eba13d', opacity: 0.7 }}>
        ▶ Survolez un plat pour voir la photo
      </div> */}

      {/* ── Onglets ── */}
      <div className="Menu__tabs">
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            className={`Menu__tab Menu__tab--${c.color}${active === c.id ? ' is--active' : ''}`}
            onClick={() => handleTabChange(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* ── Corps ── */}
      <div className="Menu__body" key={active} onMouseLeave={handleBodyLeave}>

        {/* Colonne liste */}
        <div className="Menu__list">
          <h2 className={`Menu__cat-title Menu__cat-title--${cat.color}`}>
            {cat.label}
          </h2>

          {cat.items.map((dish) => (
            <div
              className={`Menu__dish${selectedDish === dish.nom ? ' MenuVideo__dish--active' : ''}`}
              key={dish.nom}
              onMouseEnter={() => { if (active === 'boire') enterDish(dish) }}
            >
              <div className="Menu__dish-row">
                <span className={`Menu__dish-name Menu__dish-name--${cat.color}`}>
                  {dish.nom}
                  {dish.vege  && <span className="Menu__pill Menu__pill--vege">Végé</span>}
                  {dish.badge && <span className="Menu__pill Menu__pill--badge">{dish.badge}</span>}
                </span>
                <span className={`Menu__dish-dots Menu__dish-dots--${cat.color}`} aria-hidden="true" />
                <span className={`Menu__dish-price Menu__dish-price--${cat.color}`}>{dish.prix}</span>
              </div>
              <p className="Menu__dish-desc">{dish.desc}</p>
              {dish.allergenes && dish.allergenes.length > 0 && (
                <div className={`Menu__dish-allergens Menu__dish-allergens--${cat.color}`}>
                  {dish.allergenes.map(a => (
                    <span key={a} className="Menu__allergen" title={ALLERGEN_LABELS[a]}>
                      {ALLERGEN_ICONS[a]}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Colonne déco : lettres ↔ vidéo (CSS grid stacking) ── */}
        <div
          className="Menu__deco-col"
          aria-hidden="true"
          style={{
            gridTemplateColumns:  '160px',
            gridTemplateRows:     'auto',
            paddingTop:           '0.5rem',
            userSelect:           'none',
            alignItems:           'start',
            pointerEvents:        'none',
          }}
        >
          {/* Lettres — cellule [1,1] */}
          <div
            style={{
              gridRow:       1,
              gridColumn:    1,
              display:       'flex',
              flexDirection: 'column',
              alignItems:    'center',
              gap:           0,
              opacity:       videoOpen ? 0 : 1,
              transform:     videoOpen ? 'scale(0.88)' : 'scale(1)',
              transition:    'opacity 0.4s ease, transform 0.4s ease',
              pointerEvents: 'none',
            }}
          >
            {cat.label.split('').map((char, i) => (
              <span key={i} className={`Menu__deco-letter Menu__deco-letter--${cat.color}`}>
                {char}
              </span>
            ))}
            <span className={`Menu__deco-word Menu__deco-word--${cat.color}`}>Menu</span>
          </div>

          {/* Encart image — même cellule [1,1] : se superpose aux lettres */}
          <div
            style={{
              gridRow:      1,
              gridColumn:   1,
              justifySelf:  'left',
              alignSelf:    'center',
              position:     'relative',
              width:        '300px',
              height:       '500px',
              borderRadius: '14px',
              overflow:     'hidden',
              // background:   '#111',
              opacity:      (videoOpen && active === 'boire') ? 1 : 0,
              transition:   'opacity 0.4s ease',
              pointerEvents:'none',
              // boxShadow:    '0 8px 32px rgba(0,0,0,0.3)',
            }}
          >
            {cat.items.map(dish => dish.imgSrc ? (
              <img
                key={dish.nom}
                src={dish.imgSrc}
                alt={dish.nom}
                style={{
                  position:   'absolute',
                  inset:      0,
                  width:      '100%',
                  height:     '100%',
                  objectFit:  'cover',
                  opacity:    selectedDish === dish.nom ? 1 : 0,
                  transition: 'opacity 0.35s ease',
                }}
              />
            ) : null)}
          </div>
        </div>
      </div>

      {/* ── Légende allergènes ── */}
      <div className="Menu__legend">
        <span className="Menu__legend-title">Allergènes :</span>
        {(Object.keys(ALLERGEN_ICONS) as AllergenKey[]).map(k => (
          <span key={k} className="Menu__legend-item">
            <span className="Menu__legend-icon">{ALLERGEN_ICONS[k]}</span>
            {ALLERGEN_LABELS[k]}
          </span>
        ))}
        <p className="Menu__legend-note">
          Informez votre serveur de toute allergie ou intolérance avant de commander.
        </p>
      </div>

    </section>
  )
}
