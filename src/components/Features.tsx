import './Features.css'

const CARDS = [
  {
    id: 'jeux',
    tag: 'Jouer',
    title: 'La salle de jeux parfaite',
    desc: 'Des dizaines de jeux pour tous les goûts : fléchettes électroniques, shuffleboard géant, terrains de pétanque intérieure, jeux de société, et même un karaoké privatif pour passer une soirée inoubliable.',
    cta: 'Découvrir les jeux',
    bg: 'dark',
    emoji: '🎯',
    items: ['Fléchettes électroniques','Shuffleboard','Pétanque indoor','Jeux de société','Karaoké privatif'],
  },
  {
    id: 'restaurant',
    tag: 'Manger',
    title: 'Le restaurant idéal',
    desc: "Une cuisine maison généreuse mijotée avec soin : burgers, planches, salades et desserts gourmands. Accompagnez le tout d'une belle carte de cocktails, de bières et de mocktails.",
    cta: 'Voir la carte',
    bg: 'light',
    emoji: '🍔',
    items: ['Cuisine maison','Cocktails & bières','Mocktails','Planches & burgers','Desserts gourmands'],
  },
]

export default function Features() {
  return (
    <section className="features" id="jouer">
      <div className="features__grid">
        {CARDS.map((c) => (
          <div key={c.id} className={`fcard fcard--${c.bg}`}>
            <div className="fcard__content">
              <span className="fcard__emoji">{c.emoji}</span>
              <span className="fcard__tag">{c.tag}</span>
              <h3 className="fcard__title">{c.title}</h3>
              <p className="fcard__desc">{c.desc}</p>
              <ul className="fcard__list">
                {c.items.map((item) => (
                  <li key={item}><span className="fcard__dot" />{item}</li>
                ))}
              </ul>
              <button className={`btn ${c.bg === 'dark' ? 'btn--yellow' : 'btn--red'} btn--lg`}>{c.cta}</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
