import { useState } from 'react'
import './CarteBoissons.css'

/* ══════════════════════════════════════════════════════════
   CARTE DES BOISSONS 2026 — données extraites de la carte
   officielle (BISTROTDESNUANCES_CARTE-BOISSON_A4_NOIR_2026)
══════════════════════════════════════════════════════════ */

interface Item {
  nom: string
  detail?: string        /* degré / contenance — affiché en petit doré */
  desc?: string          /* composition */
  prix: string
  prix2?: string         /* seconde colonne de prix (ex : 50 cl) */
}

interface SubCat {
  titre: string
  note?: string          /* ex : "8 € le cocktail" */
  colonnes?: [string, string]  /* en-têtes quand 2 prix (25 cl / 50 cl) */
  items: Item[]
}

interface Cat {
  id: string
  label: string
  subs: SubCat[]
}

const CARTE: Cat[] = [
  {
    id: 'cocktails', label: 'Cocktails',
    subs: [
      {
        titre: 'Sans alcool', note: '8 €',
        items: [
          { nom: 'Virgin Mojito',      desc: 'Menthe, cassonade, citron vert, Perrier',   prix: '8' },
          { nom: 'Virgin Piña Colada', desc: 'Crème de coco, jus d\'ananas',              prix: '8' },
          { nom: 'Paradis',            desc: 'Jus de fruits exotiques, grenadine',        prix: '8' },
        ],
      },
      {
        titre: 'Short drinks',
        items: [
          { nom: 'Caïpiriñha',  desc: 'Cachaça Leblon 40°, sour, citron vert, cassonade',                                          prix: '10' },
          { nom: 'Caïpiroska',  desc: 'Vodka Eristoff 40°, sour, citron vert, cassonade',                                          prix: '10' },
          { nom: 'Ti Punch',    desc: 'Rhum Saint-James 40°, sour, citron vert, cassonade',                                        prix: '10' },
          { nom: 'Daïquiri',    desc: 'Rhum Bacardi 37,5°, sour, citron vert, sucre',                                              prix: '10' },
          { nom: 'Orgasme',     desc: 'Get 27 17,9°, Bailey\'s 17°',                                                               prix: '10' },
          { nom: 'Margarita',   desc: 'Tequila San José 35°, citron vert, sucre, Triple Sec 40°',                                  prix: '12' },
          { nom: 'Maï Taï',     desc: 'Rhum blanc Bacardi 37,5°, Rhum brun Captain Morgan 35°, sour, Cointreau 40°, citron vert, sucre, sirop d\'orgeat', prix: '12' },
          { nom: 'Gin Fizz',    desc: 'Gin Bombay Sapphire 40°, sour, citron, sucre, Perrier',                                     prix: '12' },
        ],
      },
      {
        titre: 'Long drinks',
        items: [
          { nom: 'Mojito',                   desc: 'Bacardi 40°, menthe fraîche, citron vert, cassonade, Perrier, Angostura (fruits sur demande)',            prix: '12' },
          { nom: 'Cuba Libre',               desc: 'Rhum Captain Morgan 35°, sour, citron vert, Coca-Cola',                                                   prix: '12' },
          { nom: 'Sex on the Beach',         desc: 'Vodka Eristoff 40°, jus de cranberry, jus d\'ananas, crème de pêche 17°, sirop de grenadine',             prix: '12' },
          { nom: 'Planteur',                 desc: 'Rhum brun Captain Morgan 35°, jus exotique, sirop de grenadine',                                          prix: '12' },
          { nom: 'Expresso Martini',         desc: 'Kahlua 20°, café, Vodka Grey Goose 40°, sucre',                                                           prix: '12' },
          { nom: 'Caïpiroska Fruit',         desc: 'Vodka Eristoff 40°, sour, citron vert, cassonade, fruit du moment',                                       prix: '12' },
          { nom: 'Caïpiriñha Fruit',         desc: 'Cachaça Leblon 55°, sour, citron vert, cassonade, fruit du moment',                                       prix: '12' },
          { nom: 'Piña Colada',              desc: 'Rhum brun Captain Morgan 35°, Rhum blanc Bacardi 37,5°, jus d\'ananas, purée de coco, Malibu 18°',        prix: '13' },
          { nom: 'Porn Star Martini',        desc: 'Liqueur de passion Passoa 15°, Vodka 40°, fruit de la passion, citron vert, sirop de vanille, shot de Champagne', prix: '13' },
          { nom: 'Jack Fire Ginger',         desc: 'Jack Fire Ginger, citron',                                                                                prix: '13' },
          { nom: 'Jack Blackberry Limonade', desc: 'Jack Daniel\'s Blackberry, limonade, citron',                                                             prix: '13' },
          { nom: 'Jack Mojito',              desc: 'Jack Daniel\'s, Jack Fire, Jack Honey ou Jack Apple 40°, menthe fraîche, sucre, citron vert, Perrier, Angostura', prix: '13' },
          { nom: 'Tequila Sunrise',          desc: 'Tequila San José 35°, orange, grenadine',                                                                 prix: '14' },
          { nom: 'Long Island',              desc: 'Cointreau, Vodka Eristoff 40°, Tequila San José 35°, Rhum blanc Bacardi 37,5°, Gin Bombay Sapphire 40°, citron vert, sucre, Coca-Cola', prix: '15' },
          { nom: 'Mojito Royal',             desc: 'Bacardi 40°, menthe fraîche, citron vert, cassonade, Angostura, Champagne',                               prix: '15' },
        ],
      },
      {
        titre: 'Les Mules', note: '16 €',
        items: [
          { nom: 'Moscow Mule',    desc: 'Vodka Grey Goose 40°, citron vert, ginger beer, sucre', prix: '16' },
          { nom: 'London Mule',    desc: 'Gin 40°, citron vert, ginger beer, sucre',              prix: '16' },
          { nom: 'Tennessee Mule', desc: 'Jack Daniel\'s, citron vert, ginger beer, sucre',       prix: '16' },
        ],
      },
      {
        titre: 'À partager',
        items: [
          { nom: 'Mètre de shots « Les Dix »', prix: '40' },
        ],
      },
    ],
  },
  {
    id: 'vins', label: 'Les vins',
    subs: [
      {
        titre: 'Nos rosés', colonnes: ['Verre', 'Bouteille'],
        items: [
          { nom: 'Château Peyrassol',        prix: '6', prix2: '29' },
          { nom: 'Château Bernes',           prix: '35' },
          { nom: 'Château Bernes',           detail: 'magnum', prix: '70' },
          { nom: 'Whispering Angel',         prix: '55' },
        ],
      },
      {
        titre: 'Nos blancs', colonnes: ['Verre', 'Bouteille'],
        items: [
          { nom: 'Château Bernes',           detail: 'terre de bernes',        prix: '35' },
          { nom: 'Chardonnay Antoine Rodet',                                   prix: '6', prix2: '29' },
          { nom: 'Chablisienne Finage 2022', detail: 'bourgogne blanc',        prix: '35' },
          { nom: 'Tariquet Premières Grises',                                  prix: '7', prix2: '33' },
        ],
      },
      {
        titre: 'Nos rouges', colonnes: ['Verre', 'Bouteille'],
        items: [
          { nom: 'Château St Esprit',                 detail: 'vallée du rhône', prix: '6', prix2: '29' },
          { nom: 'Croze Hermitage Grand Chemin 2023', detail: 'vallée du rhône', prix: '55' },
          { nom: 'Gigondas Domaine St Damien',        detail: 'vallée du rhône', prix: '42' },
          { nom: 'Brouilly Géraldine Large',          detail: 'beaujolais',      prix: '31' },
          { nom: 'Château le Cluzet',                 detail: 'bordelais',       prix: '6', prix2: '29' },
          { nom: 'St Estèphe Les Hauts de Pez',       detail: 'bordelais',       prix: '39' },
          { nom: 'Pinot Noir Bourgogne Ducal',        detail: 'bourgogne',       prix: '31' },
          { nom: 'Haute Côte de Beaune Domaine Labry', detail: 'bourgogne',      prix: '33' },
        ],
      },
    ],
  },
  {
    id: 'aperitifs', label: 'Apéritifs & Digestifs',
    subs: [
      {
        titre: 'Apéritifs',
        items: [
          { nom: 'Ricard',                  detail: '45° · 4 cl',                 prix: '5' },
          { nom: 'Campari',                 detail: '25° · 5 cl',                 prix: '5' },
          { nom: 'Martini',                 detail: 'blanc / rouge · 14,5° · 5 cl', prix: '5' },
          { nom: 'Kir',                     detail: '13°',                        prix: '7' },
          { nom: 'Coupe Prosecco',          detail: '11°',                        prix: '8' },
          { nom: 'Aperol Spritz',           detail: '11°',                        prix: '9' },
          { nom: 'St Germain',              detail: '11°',                        prix: '10' },
          { nom: 'Kir Royal',               detail: '13°',                        prix: '10' },
          { nom: 'Piscine Prosecco',        detail: '11°',                        prix: '11' },
          { nom: 'Coupe Champagne Deutz',   detail: '12°',                        prix: '12' },
          { nom: 'Piscine Champagne Deutz', detail: '12°',                        prix: '15' },
        ],
      },
      {
        titre: 'Digestifs',
        items: [
          { nom: 'Get 27 / Get 31',      detail: '17,9° · 6 cl', prix: '8' },
          { nom: 'Bailey\'s',            detail: '17° · 6 cl',   prix: '8' },
          { nom: 'Amaretto',             detail: '28° · 6 cl',   prix: '8' },
          { nom: 'Limoncello / Manzana', detail: '28° · 6 cl',   prix: '8' },
          { nom: 'Jägermeister',         detail: '35° · 6 cl',   prix: '8' },
          { nom: 'Cognac Hennessy',      detail: '40° · 4 cl',   prix: '10' },
        ],
      },
    ],
  },
  {
    id: 'bieres', label: 'Bières & Champagnes',
    subs: [
      {
        titre: 'Pressions', colonnes: ['25 cl', '50 cl'],
        items: [
          { nom: 'Heineken',             prix: '5', prix2: '8' },
          { nom: 'Mort Subite Blanche',  prix: '6', prix2: '9' },
        ],
      },
      {
        titre: 'Bières en bouteille',
        items: [
          { nom: 'Desperado', prix: '6' },
          { nom: 'Corona',    prix: '6' },
        ],
      },
      {
        titre: 'Champagnes en bouteille',
        items: [
          { nom: 'Deutz',           prix: '75' },
          { nom: 'Laurent Perrier', prix: '115' },
          { nom: 'Perrier-Jouët',   detail: 'blanc de blancs', prix: '150' },
          { nom: 'Magnum de Deutz', prix: '180' },
        ],
      },
    ],
  },
  {
    id: 'spiritueux', label: 'Spiritueux',
    subs: [
      {
        titre: 'Vodka',
        items: [
          { nom: 'Eristoff',   detail: '40° · 6 cl', prix: '9' },
          { nom: 'Grey Goose', detail: '40° · 6 cl', prix: '12' },
        ],
      },
      {
        titre: 'Gin',
        items: [
          { nom: 'Bombay Sapphire', detail: '40° · 6 cl',   prix: '9' },
          { nom: 'Mare',            detail: '42,7° · 6 cl', prix: '12' },
          { nom: 'Hendrick\'s',     detail: '47,3° · 6 cl', prix: '12' },
        ],
      },
      {
        titre: 'Whisky',
        items: [
          { nom: 'JB',                       detail: '40° · 6 cl', prix: '8' },
          { nom: 'Ballantines',              detail: '40° · 6 cl', prix: '9' },
          { nom: 'Jack Daniel\'s',           detail: '40° · 6 cl', prix: '10' },
          { nom: 'Jack Daniel\'s Fire',      detail: '35° · 6 cl', prix: '10' },
          { nom: 'Jack Daniel\'s Honey',     detail: '35° · 6 cl', prix: '10' },
          { nom: 'Jack Daniel\'s Blackberry', detail: '35° · 6 cl', prix: '10' },
          { nom: 'Chivas 12 ans',            detail: '40° · 4 cl', prix: '10' },
        ],
      },
      {
        titre: 'Rhums',
        items: [
          { nom: 'Bacardi Carta Oro', detail: '37,5° · 6 cl', prix: '9' },
          { nom: 'Captain Morgan',    detail: '35° · 6 cl',   prix: '9' },
          { nom: 'Diplomatico',       detail: '40° · 4 cl',   prix: '10' },
          { nom: 'Don Papa',          detail: '40° · 4 cl',   prix: '10' },
          { nom: 'Zacapa',            detail: '40° · 4 cl',   prix: '12' },
        ],
      },
      {
        titre: 'Tequila',
        items: [
          { nom: 'San José', detail: '35° · 6 cl', prix: '9' },
        ],
      },
    ],
  },
  {
    id: 'softs', label: 'Softs & Boissons chaudes',
    subs: [
      {
        titre: 'Soft drinks',
        items: [
          { nom: 'Sirop à l\'eau',                                              prix: '3' },
          { nom: 'Diabolo',                                                     prix: '3,50' },
          { nom: 'Jus de fruit', detail: '25 cl · pomme, ananas, tomate, multifruits', prix: '4' },
          { nom: 'Coca-Cola',           detail: '33 cl',   prix: '4' },
          { nom: 'Coca-Cola Zéro',      detail: '33 cl',   prix: '4' },
          { nom: 'Schweppes Agrumes',   detail: '25 cl',   prix: '4' },
          { nom: 'Orangina',            detail: '25 cl',   prix: '4' },
          { nom: 'Fuze Tea',            detail: '25 cl',   prix: '4,50' },
          { nom: 'Ginger Beer',         detail: '25 cl',   prix: '5' },
          { nom: 'Red Bull',            detail: '25 cl',   prix: '5' },
          { nom: 'Vittel',              detail: '1 litre', prix: '6' },
          { nom: 'San Pellegrino',      detail: '1 litre', prix: '6' },
        ],
      },
      {
        titre: 'Boissons chaudes',
        items: [
          { nom: 'Café',       prix: '1,80' },
          { nom: 'Déca',       prix: '1,90' },
          { nom: 'Américain',  prix: '2' },
          { nom: 'Thé',        prix: '2,50' },
          { nom: 'Café Crème', prix: '3' },
          { nom: 'Cappuccino', prix: '3' },
        ],
      },
    ],
  },
]

export default function CarteBoissons() {
  const [active, setActive] = useState('cocktails')
  const cat = CARTE.find(c => c.id === active)!

  return (
    <section className="Boissons" id="carte-boissons">

      {/* ── En-tête ── */}
      <div className="Boissons__header">
        <span className="Boissons__eyebrow">La carte 2026</span>
        <h2 className="Boissons__title">
          Boire, <em>nuancé.</em>
        </h2>
      </div>

      {/* ── Onglets catégories ── */}
      <nav className="Boissons__tabs" aria-label="Catégories de boissons">
        {CARTE.map(c => (
          <button
            key={c.id}
            className={`Boissons__tab${active === c.id ? ' is--active' : ''}`}
            onClick={() => setActive(c.id)}
            aria-pressed={active === c.id}
          >
            {c.label}
          </button>
        ))}
      </nav>

      {/* ── Contenu — remonté à chaque changement d'onglet ── */}
      <div className="Boissons__body" key={active}>
        {cat.subs.map(sub => (
          <div className="Boissons__subcat" key={sub.titre}>

            <div className="Boissons__subhead">
              <h3 className="Boissons__subtitle">{sub.titre}</h3>
              <span className="Boissons__subrule" aria-hidden="true" />
              {sub.note && <span className="Boissons__subnote">{sub.note}</span>}
              {sub.colonnes && (
                <span className="Boissons__subcols" aria-hidden="true">
                  {sub.colonnes[0]} / {sub.colonnes[1]}
                </span>
              )}
            </div>

            <ul className="Boissons__list">
              {sub.items.map(item => (
                <li className="Boissons__item" key={`${item.nom}-${item.detail ?? ''}`}>
                  <div className="Boissons__item-row">
                    <span className="Boissons__item-nom">
                      {item.nom}
                      {item.detail && <span className="Boissons__item-detail">{item.detail}</span>}
                    </span>
                    <span className="Boissons__item-dots" aria-hidden="true" />
                    <span className="Boissons__item-prix">
                      {item.prix}
                      {item.prix2 && <span className="Boissons__item-prix2"> / {item.prix2}</span>}
                      <em>€</em>
                    </span>
                  </div>
                  {item.desc && <p className="Boissons__item-desc">{item.desc}</p>}
                </li>
              ))}
            </ul>

          </div>
        ))}
      </div>

      {/* ── Mentions ── */}
      {/* <div className="Boissons__legal">
        <p>Prix nets (€), service inclus — Chèques non acceptés — CB à partir de 10 €</p>
        <p>L'abus d'alcool est dangereux pour la santé, à consommer avec modération.</p>
      </div> */}

    </section>
  )
}
