import './Events.css'

type EventColor = 'amber' | 'red' | 'green'

interface EventCard {
  color:   EventColor
  tag:     string
  freq:    string
  title:   string
  desc:    string
  img:     string
  isNew?:  boolean
  cta:     string
}

const EVENTS: EventCard[] = [
  {
    color: 'amber',
    tag:   'Karaoké',
    freq:  'Chaque vendredi soir',
    title: 'Soirée Karaoké Privé',
    desc:  'Privatisez notre cabine — jusqu\'à 12 personnes, micro en main, playlist sans limite.',
    img:   '/event-karaoke.jpg',
    isNew: true,
    cta:   'Réserver',
  },
  {
    color: 'red',
    tag:   'Quiz Night',
    freq:  'Chaque samedi · 20h',
    title: 'Lucky Quiz Night',
    desc:  'Formez votre équipe et partez à la conquête du tableau d\'honneur.',
    img:   '/event-quiz.jpg',
    cta:   'Rejoindre',
  },
  {
    color: 'green',
    tag:   'Tournoi',
    freq:  'Chaque dimanche · 15h',
    title: 'Tournoi de Fléchettes',
    desc:  'Élimination directe, cadeaux pour les finalistes. Inscription sur place ou en ligne.',
    img:   '/event-darts.jpg',
    isNew: true,
    cta:   'S\'inscrire',
  },
  {
    color: 'amber',
    tag:   'Afterwork',
    freq:  'Chaque jeudi · 18h – 21h',
    title: 'Happy Hour Lucky',
    desc:  'Cocktails à prix doux, bonne humeur garantie. Le meilleur moyen de finir sa semaine.',
    img:   '/event-happy-hour.jpg',
    cta:   'En savoir +',
  },
]

const RECURRING = [
  { label: 'Afterwork Happy Hour',  freq: 'Chaque jeudi · 18h – 21h' },
  { label: 'Brunch du Dimanche',    freq: 'Chaque dimanche · 10h – 14h' },
  { label: 'Jeux de Société',       freq: 'Chaque lundi · 19h' },
  { label: 'Apéro Pétanque',        freq: 'Chaque samedi · 17h' },
]

export default function Events() {
  return (
    <section className="Events">

      {/* ── En-tête ── */}
      <div className="Events__header">
        <div className="Events__header-left">
          <span className="Events__eyebrow">Agenda</span>
          <h2 className="Events__title">Ne manquez<br />rien.</h2>
        </div>
        <p className="Events__subtitle">
          Soirées, tournois, animations —<br />
          il se passe toujours quelque chose.
        </p>
      </div>

      {/* ── Bento grid ── */}
      <div className="Events__grid">
        {EVENTS.map((ev, i) => (
          <article
            className={`Events__card Events__card--${i} Events__card--${ev.color}`}
            key={i}
          >
            {/* Photo plein-bleed */}
            <div className="Events__card-photo">
              <img src={ev.img} alt="" aria-hidden="true" />
            </div>

            {/* Gradient overlay */}
            <div className="Events__card-gradient" aria-hidden="true" />

            {/* Contenu */}
            <div className="Events__card-content">

              {/* Badges haut */}
              <div className="Events__card-badges">
                {ev.isNew && <span className="Events__badge-new">Nouveau</span>}
                <span className={`Events__badge-tag Events__badge-tag--${ev.color}`}>
                  {ev.tag}
                </span>
              </div>

              {/* Texte + CTA bas */}
              <div className="Events__card-body">
                <span className="Events__card-freq">{ev.freq}</span>
                <h3 className="Events__card-title">{ev.title}</h3>
                <p className="Events__card-desc">{ev.desc}</p>
                <a
                  href="#reserver"
                  className={`Events__card-cta Events__card-cta--${ev.color}`}
                >
                  {ev.cta}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ── Récurrents ── */}
      <div className="Events__recurring">
        <span className="Events__recurring-eyebrow">Chaque semaine</span>
        <div className="Events__recurring-list">
          {RECURRING.map((r, i) => (
            <div className="Events__recurring-item" key={i}>
              <span className="Events__recurring-dot" aria-hidden="true" />
              <div className="Events__recurring-text">
                <span className="Events__recurring-name">{r.label}</span>
                <span className="Events__recurring-freq">{r.freq}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
