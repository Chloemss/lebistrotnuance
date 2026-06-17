import './Reviews.css'

const REVIEWS = [
  {
    quote: "Un endroit qui mêle à la perfection l'art de vivre à la française et la convivialité.",
    author: 'Sophie M.',
    stars: 5,
  },
  {
    quote: "La cuisine est généreuse, authentique. Le Lucky Burger est une révélation absolue.",
    author: 'Thomas R.',
    stars: 5,
  },
  {
    quote: "Soirée karaoké mémorable dans un cadre élégant. Service absolument irréprochable.",
    author: 'Camille D.',
    stars: 5,
  },
  {
    quote: "Un coup de cœur absolu — festif et chic à la fois. On y revient encore et encore.",
    author: 'Antoine B.',
    stars: 5,
  },
  {
    quote: "La meilleure adresse de Villeneuve-Loubet, sans hésitation. Accueil chaleureux.",
    author: 'Marie-Claire F.',
    stars: 5,
  },
  {
    quote: "Les cocktails sont de véritables œuvres d'art. L'ambiance du lieu est envoûtante.",
    author: 'Lucas P.',
    stars: 5,
  },
]

/* Chaque rangée a un ordre légèrement décalé pour briser la symétrie */
const ROW_A = [...REVIEWS,              ...REVIEWS             ]
const ROW_B = [...REVIEWS.slice(2), ...REVIEWS.slice(0, 2), ...REVIEWS.slice(2), ...REVIEWS.slice(0, 2)]
const ROW_C = [...REVIEWS.slice(4), ...REVIEWS.slice(0, 4), ...REVIEWS.slice(4), ...REVIEWS.slice(0, 4)]

function Stars({ n }: { n: number }) {
  return (
    <span className="Reviews__stars" aria-label={`${n} étoiles sur 5`}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} className="Reviews__star" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M6 .5l1.2 2.4 2.6.38-1.9 1.85.45 2.62L6 6.5 3.65 7.75l.45-2.62L2.2 3.28l2.6-.38z"
                fill="currentColor" />
        </svg>
      ))}
    </span>
  )
}

function Card({ quote, author, stars }: (typeof REVIEWS)[0]) {
  return (
    <article className="Reviews__card" aria-label={`Avis de ${author}`}>
      <Stars n={stars} />
      <blockquote className="Reviews__card-quote">{quote}</blockquote>
      <footer className="Reviews__card-author">— {author}</footer>
    </article>
  )
}

function MarqueeRow({
  items,
  direction = 'left',
  duration = 36,
}: {
  items: typeof REVIEWS
  direction?: 'left' | 'right'
  duration?: number
}) {
  return (
    <div className="Reviews__row" aria-hidden="true">
      <div
        className={`Reviews__track Reviews__track--${direction}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {items.map((r, i) => <Card key={i} {...r} />)}
      </div>
    </div>
  )
}

export default function Reviews() {
  return (
    <section className="Reviews" id="avis">

      {/* Grain pelliculaire */}
      <div className="Reviews__grain" aria-hidden="true" />

      {/* ── En-tête score ── */}
      <header className="Reviews__header" data-reveal="">
        <p className="Reviews__eyebrow">Ce qu'ils disent</p>

        <div className="Reviews__score">
          <span className="Reviews__score-num" aria-label="Note 4,8 sur 5">4,8</span>
          <div className="Reviews__score-right">
            <Stars n={5} />
            <span className="Reviews__score-count">340+ avis Google</span>
          </div>
        </div>
      </header>

      {/* ── Trois rangées de cartes ── */}
      <div className="Reviews__marquee">
        <MarqueeRow items={ROW_A} direction="left"  duration={38} />
        <MarqueeRow items={ROW_B} direction="right" duration={46} />
        <MarqueeRow items={ROW_C} direction="left"  duration={32} />
      </div>

      {/* ── Lien Google ── */}
      <footer className="Reviews__footer" data-reveal="">
        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="Reviews__google-link"
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
      </footer>

    </section>
  )
}
