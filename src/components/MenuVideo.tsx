import { useState } from 'react'
import './MenuVideo.css'

/* ══════════════════════════════════════════════════════════
   LA CARTE — Le Bistrot des Nuances (maquette officielle 2026)
   Design : éditorial sombre, typographie surdimensionnée,
   miroir de la carte des boissons ("Boire, nuancé.")
══════════════════════════════════════════════════════════ */

interface Dish {
  nom: string
  desc?: string
  prix: string
  badge?: string
}

interface Category {
  id: string
  label: string
  items: Dish[]
}

const CATEGORIES: Category[] = [
  {
    id: 'incontournables', label: 'Incontournables',
    items: [
      { nom: 'Tartare de bœuf au couteau',                                                          prix: '17' },
      { nom: 'Carpaccio de bœuf',                                                                   prix: '19,50' },
      { nom: 'Magret de canard au miel',    desc: '350/400 grs',                                    prix: '28' },
      { nom: 'Notre entrecôte grillée',     desc: '250 grs — beurre maître d\'hôtel ou sauce selon l\'humeur du chef', prix: '30' },
      { nom: 'Poulpe grillé à notre façon',                                                         prix: '28' },
      { nom: 'Pavé de saumon rôti au soja',                                                         prix: '17' },
      { nom: '1/2 poulet fermier rôti',                                                             prix: '17' },
    ],
  },
  {
    id: 'assiettes', label: 'Assiettes gourmandes',
    items: [
      { nom: 'La César du Bistrot',   desc: 'Iceberg, tomates, croûtons, poulet, œuf, sauce César, lard grillé, champignons, copeaux de parmesan', prix: '17' },
      { nom: 'La Biquette du Berger', desc: 'Iceberg, noix, toasts de chèvre, lard grillé, pignons',                                               prix: '17' },
      { nom: 'La Dolce Vita',         desc: 'Jambon cru, tomates, œuf, mozzarella, basilic',                                                       prix: '18,50' },
      { nom: 'La Reine des Pouilles', desc: 'Tomates, burrata, pistou, pignons',                                                                   prix: '18,50' },
    ],
  },
  {
    id: 'burgers', label: 'Burgers',
    items: [
      { nom: 'Le Bistrotier bœuf',   prix: '22' },
      { nom: 'Le Bistrotier poulet', prix: '21' },
      { nom: 'Menu enfant',          desc: 'Steak haché ou nuggets, boule de glace', prix: '10', badge: '-12 ans' },
    ],
  },
  {
    id: 'douceurs', label: 'Douceurs',
    items: [
      { nom: 'Tiramisu',             prix: '8' },
      { nom: 'Crème brûlée',         prix: '8' },
      { nom: 'Panna cotta',          prix: '8' },
      { nom: 'Mousse au chocolat',   prix: '8' },
      { nom: 'Tarte aux pommes',     prix: '8' },
      { nom: 'Café gourmand',        prix: '12' },
      { nom: 'Glaces artisanales',   desc: 'Une boule 2,50 € · deux boules 4,50 € · trois boules 6 €', prix: 'dès 2,50' },
      { nom: 'Coupe Colonel',        desc: 'Glace citron, vodka', prix: '10' },
    ],
  },
]

export default function MenuVideo() {
  const [active, setActive]   = useState('incontournables')
  const [hovered, setHovered] = useState<string | null>(null)

  const cat = CATEGORIES.find(c => c.id === active)!

  const changeTab = (id: string) => {
    setActive(id)
    setHovered(null)
  }

  return (
    <section className="Carte" id="carte-video">

      {/* ── En-tête — miroir de "Boire, nuancé." ── */}
      <div className="Carte__header">
        <span className="Carte__eyebrow">La carte 2026</span>
        <h2 className="Carte__title">
          Manger, <em>nuancé.</em>
        </h2>
      </div>

      {/* ── Onglets ── */}
      <nav className="Carte__tabs" aria-label="Catégories de la carte">
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            className={`Carte__tab${active === c.id ? ' is--active' : ''}`}
            onClick={() => changeTab(c.id)}
            aria-pressed={active === c.id}
          >
            {c.label}
          </button>
        ))}
      </nav>

      {/* ── Liste — typographie géante, les autres plats s'estompent ── */}
      <div className="Carte__body" key={active}>
        <ol className={`Carte__list${hovered ? ' has--hover' : ''}`}>
          {cat.items.map((dish, i) => (
            <li
              key={dish.nom}
              className={`Carte__dish${hovered === dish.nom ? ' is--hover' : ''}`}
              onMouseEnter={() => setHovered(dish.nom)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="Carte__dish-num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="Carte__dish-main">
                <h3 className="Carte__dish-nom">
                  {dish.nom}
                  {dish.badge && <span className="Carte__dish-badge">{dish.badge}</span>}
                </h3>
                {dish.desc && <p className="Carte__dish-desc">{dish.desc}</p>}
              </div>
              <span className="Carte__dish-prix">
                {dish.prix}<em>€</em>
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* ── Mentions ── */}
      <div className="Carte__legal">
        <p>
          Liste des allergènes disponible sur demande — informez votre serveur de toute
          allergie ou intolérance. Prix nets (€), service inclus.
        </p>
      </div>

    </section>
  )
}
