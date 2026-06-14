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
        <a href="#reservation" className="Footer__cta-btn">
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
            <span className="Footer__lucky">Wine</span>
            <span className="Footer__folks">Bar</span>
          </div>
          <p className="Footer__tagline">Eat · Drink · Play</p>
          <div className="Footer__socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Adresse + horaires */}
        <div className="Footer__col">
          <span className="Footer__col-title">Nous trouver</span>
          <address className="Footer__address">
            5-7 Allée du Trait d'Union<br />
            77127 Lieusaint
          </address>
          <a href="tel:+33164131304" className="Footer__phone">01 64 13 13 04</a>
          <div className="Footer__hours">
            <div className="Footer__hours-row">
              <span>Mar — Dim</span>
              <span>12h – 22h30</span>
            </div>
            <div className="Footer__hours-row Footer__hours-row--closed">
              <span>Lundi</span>
              <span>Fermé</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="Footer__col">
          <span className="Footer__col-title">Explorer</span>
          <nav className="Footer__nav">
            <a href="#">Manger</a>
            <a href="#">Boire</a>
            <a href="#">Jouer</a>
            <a href="#">Évènements</a>
            <a href="#">Offres groupes</a>
            <a href="#">Réserver</a>
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
            <span className="Footer__rating-score">4,8 / 5</span>
            <span className="Footer__rating-count">+340 avis Google</span>
          </div>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="Footer__gmaps"
          >
            Voir sur Google Maps →
          </a>
        </div>

      </div>

      {/* ── Barre de bas ── */}
      <div className="Footer__bottom">
        <span>© {year} Wine Bar — Tous droits réservés</span>
        <div className="Footer__bottom-links">
          <a href="#">Mentions légales</a>
          <span aria-hidden="true">·</span>
          <a href="#">Politique de confidentialité</a>
        </div>
      </div>

    </footer>
  )
}
