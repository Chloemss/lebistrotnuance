import './Reservation.css'

const PHONE_DISPLAY = '06 12 80 04 34'
const PHONE_HREF    = 'tel:+33612800434'
const EMAIL         = 'lebistrotdesnuances@gmail.com'

export default function Reservation() {
  return (
    <section className="Reservation" id="reserver">
      <div className="Reservation__grain" aria-hidden="true" />

      <div className="Reservation__inner">

        {/* ── Accroche ── */}
        <span className="Reservation__eyebrow">Réservation</span>
        <h2 className="Reservation__title">
          <span>Réservez</span>
          <span>votre table</span>
        </h2>
        <p className="Reservation__lead">
          Une envie de bonne table&nbsp;? Appelez-nous ou écrivez-nous,
          on vous garde la plus belle place.
        </p>

        {/* ── Deux voies de contact ── */}
        <div className="Reservation__cards">

          {/* Appeler */}
          <a href={PHONE_HREF} className="Reservation__card">
            <span className="Reservation__card-icon" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </span>
            <span className="Reservation__card-label">Appelez-nous</span>
            <span className="Reservation__card-value">{PHONE_DISPLAY}</span>
            <span className="Reservation__card-cta">
              Appeler maintenant
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </a>

          {/* Écrire */}
          <a href={`mailto:${EMAIL}?subject=Réservation%20—%20Le%20Bistrot%20des%20Nuances`}
             className="Reservation__card">
            <span className="Reservation__card-icon" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2"/>
                <path d="m3 7 9 6 9-6"/>
              </svg>
            </span>
            <span className="Reservation__card-label">Écrivez-nous</span>
            <span className="Reservation__card-value Reservation__card-value--mail">{EMAIL}</span>
            <span className="Reservation__card-cta">
              Envoyer un e-mail
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </a>

        </div>

        {/* ── Horaires ── */}
        <div className="Reservation__hours">
          <span className="Reservation__hours-row">
            <strong>7 jours sur 7</strong>
            <span>Ouvert tous les jours</span>
          </span>
          <span className="Reservation__hours-sep" aria-hidden="true" />
          <span className="Reservation__hours-row">
            <strong>9h30 — 00h30</strong>
            <span>Service continu</span>
          </span>
        </div>

      </div>
    </section>
  )
}
