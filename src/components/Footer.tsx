import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="Footer">

      {/* ── Grande accroche ── */}
      <div className="Footer__cta">
        <span className="Footer__cta-label">Réservez votre table</span>
        <h2 className="Footer__cta-title">
          <span>Venez</span>
          <span>nous voir.</span>
        </h2>
        <a href="#reserver" className="Footer__cta-btn">
          Réserver maintenant
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>

      {/* ── Ligne or ── */}
      <div className="Footer__rule" />

      {/* ── Grille info ── */}
      <div className="Footer__grid">

        {/* Logo + tagline */}
        <div className="Footer__brand">
          <div className="Footer__logo">
            <span className="Footer__lucky">Le Bistrot</span>
            <span className="Footer__folks">des Nuances</span>
          </div>
          <p className="Footer__tagline">Restaurant · Bar · Lounge</p>
          <div className="Footer__socials">
            <a href="https://www.facebook.com/share/18S5W54DGv/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="https://instagram.com/lebistrotdesnuances2026" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Adresse + horaires */}
        <div className="Footer__col">
          <span className="Footer__col-title">Nous trouver</span>
          <address className="Footer__address">
            1 Avenue de la Libération<br />
            06270 Villeneuve-Loubet
          </address>
          <a href="tel:+33497275604" className="Footer__phone">04 97 27 56 04</a>
          <a href="tel:+33633809840" className="Footer__phone">06 33 80 98 40</a>
          <div className="Footer__hours">
            <div className="Footer__hours-row">
              <span>Lun — Mer</span>
              <div className="Footer__hours-times"><span>7h30 – 15h</span></div>
            </div>
            <div className="Footer__hours-row">
              <span>Jeu — Ven</span>
              <div className="Footer__hours-times"><span>7h30 – 15h</span><span>18h – 00h30</span></div>
            </div>
            <div className="Footer__hours-row">
              <span>Samedi</span>
              <div className="Footer__hours-times"><span>10h – 15h</span><span>18h – 00h30</span></div>
            </div>
            <div className="Footer__hours-row">
              <span>Dimanche</span>
              <div className="Footer__hours-times"><span>10h – 17h</span></div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="Footer__col">
          <span className="Footer__col-title">Explorer</span>
          <nav className="Footer__nav">
            <a href="#about">À propos</a>
            <a href="#visit">Nous trouver</a>
            <a href="#carte">La carte</a>
            <a href="#reserver">Réserver</a>
            <a href="#faq">FAQ</a>
          </nav>
        </div>

        {/* Note / Badge */}
        <div className="Footer__col">
          <span className="Footer__col-title">Avis clients</span>
          <div className="Footer__rating">
            <div className="Footer__rating-stars">
              {'★★★★★'.split('').map((s, i) => (
                <span key={i} className="Footer__star">{s}</span>
              ))}
            </div>
            <span className="Footer__rating-count">Votre avis compte</span>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Le+Bistrot+des+Nuances+Villeneuve-Loubet"
            target="_blank"
            rel="noopener noreferrer"
            className="Footer__gmaps"
          >
            Laisser un avis Google →
          </a>
        </div>

      </div>

      {/* ── Barre de bas ── */}
      <div className="Footer__bottom">
        <span>© {year} Le Bistrot des Nuances — Tous droits réservés</span>
        <div className="Footer__bottom-links">
          <a href="#">Mentions légales</a>
          <span aria-hidden="true">·</span>
          <a href="#">Politique de confidentialité</a>
        </div>
      </div>

    </footer>
  )
}
