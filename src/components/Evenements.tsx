import './Evenements.css'

const EVENTS = [
  { emoji: '🎂', title: 'Anniversaires',        desc: 'Célébrez votre anniversaire dans un cadre festif unique avec vos proches.' },
  { emoji: '🏢', title: "Soirées d'entreprise", desc: 'Renforcez la cohésion de votre équipe autour de jeux et d\'une bonne table.' },
  { emoji: '🎊', title: 'Événements privés',    desc: 'EVJF, séminaires, soirées à thème… nous vous accompagnons dans chaque projet.' },
]

export default function Evenements() {
  return (
    <section className="evts" id="evenements">
      <div className="evts__inner">
        <div className="evts__header">
          <span className="section-tag">Évènements</span>
          <h2 className="evts__title">Vivez des moments<br />inoubliables chez nous</h2>
        </div>
        <div className="evts__cards">
          {EVENTS.map((ev) => (
            <div key={ev.title} className="evcard">
              <div className="evcard__emoji">{ev.emoji}</div>
              <h3 className="evcard__title">{ev.title}</h3>
              <p className="evcard__desc">{ev.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
