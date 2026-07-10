import './Visit.css'

const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21c-4-4-7-7.5-7-11a7 7 0 1114 0c0 3.5-3 7-7 11z"/><circle cx="12" cy="10" r="2.5"/>
  </svg>
)
const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.8 19.8 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
  </svg>
)
const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
)
const IconFacebook = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
)

export default function Visit() {
  return (
    <section className="Visit" id="visit" aria-label="Nous trouver">
      <div className="Visit__inner">

        {/* ── Adresse & itinéraire ── */}
        <div className="Visit__col">
          <p className="Visit__eyebrow">Où nous trouver</p>
          <h2 className="Visit__heading">Au cœur de<br/>Villeneuve-Loubet</h2>
          <address className="Visit__address">
            <span className="Visit__address-icon"><IconPin /></span>
            1 Avenue de la Libération<br/>06270 Villeneuve-Loubet
          </address>
          <a
            className="Visit__map-link"
            href="https://maps.google.com/?q=1+Avenue+de+la+Liberation,+06270+Villeneuve-Loubet"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Itinéraire</span>
            <IconArrow />
          </a>
        </div>

        {/* ── Contact ── */}
        <div className="Visit__col Visit__col--links">
          <p className="Visit__eyebrow">Nous contacter</p>
          <div className="Visit__links">

            <a className="Visit__link" href="tel:+33612800434">
              <span className="Visit__link-icon"><IconPhone /></span>
              <span className="Visit__link-text">
                <em>Téléphone</em>
                <span>06 12 80 04 34</span>
              </span>
            </a>

            <a className="Visit__link" href="https://instagram.com/lebistrotdesnuances2026" target="_blank" rel="noopener noreferrer">
              <span className="Visit__link-icon"><IconInstagram /></span>
              <span className="Visit__link-text">
                <em>Instagram</em>
                <span>@lebistrotdesnuances</span>
              </span>
            </a>

            <a className="Visit__link" href="https://www.facebook.com/share/18S5W54DGv/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
              <span className="Visit__link-icon"><IconFacebook /></span>
              <span className="Visit__link-text">
                <em>Facebook</em>
                <span>Le Bistrot des Nuances</span>
              </span>
            </a>

          </div>
        </div>

      </div>
    </section>
  )
}
