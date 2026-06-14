import './Visit.css'

export default function Visit() {
  return (
    <section className="Visit" id="nous-trouver">

      {/* ── Carte en fond (OpenStreetMap statique) ── */}
      <div className="Visit__map">
        {/* Centré sur 1 Av. de la Libération, 06270 Villeneuve-Loubet */}
        <iframe
          title="Wine Bar — carte"
          src="https://www.openstreetmap.org/export/embed.html?bbox=7.100,43.648,7.140,43.668&layer=mapnik&marker=43.658,7.120"
          style={{ border: 0 }}
          loading="lazy"
          aria-hidden="true"
        />
      </div>

      {/* ── Card blanche à droite ── */}
      <div className="Visit__card">

        {/* Logo texte */}
        <div className="Visit__card-logo">
          <span className="Visit__card-logo-text">Wine Bar</span>
        </div>

        {/* Nom & adresse */}
        <div className="Visit__card-body">
          <p className="Visit__card-brand">Wine Bar</p>
          <h2 className="Visit__card-city">Villeneuve-<br/>Loubet</h2>
          <address className="Visit__card-address">
            1 Av. de la Libération<br />
            06270 Villeneuve-Loubet
          </address>
        </div>

        {/* Icônes */}
        <div className="Visit__icons">

          <a
            href="https://www.google.com/maps/dir/?api=1&destination=1+Av+de+la+Liberation+06270+Villeneuve-Loubet"
            target="_blank"
            rel="noopener noreferrer"
            className="Visit__icon-link"
          >
            <span className="Visit__icon-circle">
              {/* Flèche directions */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11"/>
              </svg>
            </span>
            <span>Itinéraire</span>
          </a>

          <a
            href="tel:+33000000000"
            className="Visit__icon-link"
          >
            <span className="Visit__icon-circle">
              {/* Téléphone */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </span>
            <span>Nous appeler</span>
          </a>

          <a
            href="mailto:contact@luckyfolks.fr"
            className="Visit__icon-link"
          >
            <span className="Visit__icon-circle">
              {/* Email */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </span>
            <span>Email</span>
          </a>

        </div>

        {/* CTA */}
        <a
          href="https://bookings.zenchef.com/results?rid=354122&pid=1001"
          target="_blank"
          rel="noopener noreferrer"
          className="Visit__btn"
        >
          Réserver une table
        </a>

      </div>

    </section>
  )
}
