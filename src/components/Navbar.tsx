import { useState, useEffect } from 'react'
import './Navbar.css'

interface NavbarProps { onReserve: () => void }

const NAV = [
  { label: 'À propos',     href: '#about' },
  { label: 'La carte',     href: '#carte' },
  { label: 'FAQ',          href: '#faq' },
  { label: 'Nous trouver', href: '#visit' },
]

export default function Navbar({ onReserve }: NavbarProps) {
  const [scrolled,  setScrolled]  = useState(false)
  const [hidden,    setHidden]    = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    let lastY = window.scrollY

    const fn = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 60)
      if (currentY > lastY && currentY > 120) {
        setHidden(true)   // scroll vers le bas → masquer
      } else {
        setHidden(false)  // scroll vers le haut → afficher
      }
      lastY = currentY
    }

    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <header className={`Header${scrolled ? ' Header--scrolled' : ''}${hidden ? ' Header--hidden' : ''}`}>
        {/* Logo centré */}
        <a href="#hero" className="Header__logo">
          <span className="Header__logo-lucky">Le Bistrot</span>
          <span className="Header__logo-folks">des Nuances</span>
          <span className="Header__logo-tag">Restaurant · Bar · Lounge</span>
        </a>

        {/* CTAs droite */}
        <div className="Header__right">
          <button className="btn btn--amber btn--sm" onClick={onReserve}>
            Réserver
          </button>
          <button
            className={`Header__burger${menuOpen ? ' is--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Menu plein écran */}
      <nav className={`Menu${menuOpen ? ' Menu--open' : ''}`}>
        <div className="Menu__overlay" onClick={() => setMenuOpen(false)} />
        <div className="Menu__panel">
          <button className="Menu__close" onClick={() => setMenuOpen(false)} aria-label="Fermer le menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
          <ul className="Menu__list">
            {NAV.map(l => (
              <li key={l.label}>
                <a href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
              </li>
            ))}
          </ul>
          <button className="btn btn--amber btn--lg" onClick={() => { setMenuOpen(false); onReserve() }}>
            Réserver
          </button>
          <div className="Menu__socials">
            <a href="https://www.facebook.com/share/18S5W54DGv/?mibextid=wwXIfr"  target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="https://instagram.com/lebistrotdesnuances2026" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}
