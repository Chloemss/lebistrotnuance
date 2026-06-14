import './Venue.css'

export default function Venue() {
  return (
    <section className="Venue">

      <div className="Venue__intro">
        <span className="Venue__intro-label">L'espace</span>
        <h2 className="Venue__intro-title">
          Un endroit pensé<br />pour vous réunir.
        </h2>
      </div>

      <div className="Venue__bento">

        {/* ── Couverts — grande cellule gauche ── */}
        <div className="Venue__cell Venue__cell--couverts">
          <span className="Venue__cell-num">120<sup>+</sup></span>
          <div className="Venue__cell-foot">
            <span className="Venue__cell-title">Couverts</span>
            <span className="Venue__cell-desc">Salle principale &amp; espace lounge</span>
          </div>
        </div>

        {/* ── Terrasse ── */}
        <div className="Venue__cell Venue__cell--outdoor">
          <span className="Venue__cell-badge">☀ Extérieur</span>
          <span className="Venue__cell-title">Terrasse ensoleillée</span>
          <span className="Venue__cell-desc">
            En plein air au cœur du village, idéale dès les beaux jours — la vue sur la vie locale en prime.
          </span>
        </div>

        {/* ── Tables ── */}
        <div className="Venue__cell Venue__cell--tables">
          <span className="Venue__cell-num">24</span>
          <div className="Venue__cell-foot">
            <span className="Venue__cell-title">Tables</span>
            <span className="Venue__cell-desc">Modulables selon vos besoins</span>
          </div>
        </div>

        {/* ── Location groupe ── */}
        <div className="Venue__cell Venue__cell--group">
          <div className="Venue__cell-head">
            <span className="Venue__cell-badge">Privatisation</span>
            <span className="Venue__cell-num Venue__cell-num--sm">80<sup>+</sup></span>
          </div>
          <span className="Venue__cell-title">Location de groupe</span>
          <span className="Venue__cell-desc">
            Anniversaires, séminaires, événements d'entreprise… Le lieu se privatise entièrement pour votre occasion.
          </span>
          <a href="#reservation" className="Venue__cell-cta">Nous contacter &rarr;</a>
        </div>

      </div>

    </section>
  )
}
