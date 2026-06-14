import { useState, useEffect } from 'react'
import './Reservation.css'

interface ReservationProps {
  panelOpen: boolean
  onOpenPanel: () => void
  onClosePanel: () => void
}

export default function Reservation({ panelOpen, onOpenPanel, onClosePanel }: ReservationProps) {
  const [tableInfoOpen, setTableInfoOpen] = useState(false)

  /* Reset à chaque fermeture du panneau */
  useEffect(() => {
    if (!panelOpen) setTableInfoOpen(false)
  }, [panelOpen])

  return (
    <>
      {/* ── Section CTA ── */}
      <section className="Reservation is--red" id="reserver">
        <div className="Reservation__inner">
          <span className="Reservation__eyebrow">Réservation</span>
          <h2 className="Reservation__title">
            <span>Alors,</span>
            <span>on réserve ?</span>
          </h2>
          <div className="Reservation__actions">
            <button className="Reservation__btn" onClick={onOpenPanel}>
              Réserver maintenant
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <p className="Reservation__note">
              Ouvert du mardi au dimanche · Services midis et soirs
            </p>
          </div>
        </div>
      </section>

      {/* ── Panneau modal slide-up ── */}
      <div
        className={`ReservationPanel${panelOpen ? ' is--open' : ''}`}
        aria-hidden={!panelOpen}
      >
        <div className="ReservationPanel__overlay" onClick={onClosePanel} />

        <button className="ReservationPanel__close" onClick={onClosePanel}>
          <span className="ReservationPanel__cross" aria-hidden="true" />
          <span>Fermer</span>
        </button>

        {/* Bloc gauche — Manger · Boire */}
        <div className="ReservationPanel__block ReservationPanel__block--eat">
          <div className="ReservationPanel__visual" aria-hidden="true">
            <img src="/tablet.jpg" alt="" />
          </div>
          <div className="ReservationPanel__color-overlay" aria-hidden="true" />
          <div className="ReservationPanel__block-inner">
            <span className="ReservationPanel__tag">Restauration</span>
            <h3 className="ReservationPanel__heading">
              Manger.<br />Boire.
            </h3>
            <p className="ReservationPanel__sub">Une table pour savourer</p>

            <button
              className={`ReservationPanel__btn ReservationPanel__btn--table${tableInfoOpen ? ' is--open' : ''}`}
              onClick={() => setTableInfoOpen(prev => !prev)}
            >
              {tableInfoOpen ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                  Fermer
                </>
              ) : (
                <>
                  Réserver une table
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </>
              )}
            </button>

            {tableInfoOpen && (
              <div className="ReservationPanel__table-info">
                <a href="tel:+33164131304" className="ReservationPanel__table-phone">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.88 1.22 2 2 0 012.88.03H5.9a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
                  </svg>
                  01 64 13 13 04
                </a>
                <div className="ReservationPanel__table-hours">
                  <div><span>Mar — Dim</span><span>12h – 22h30</span></div>
                  <div className="is--closed"><span>Lundi</span><span>Fermé</span></div>
                </div>
                <span className="ReservationPanel__table-note">
                  Réservation conseillée · En direct ou par téléphone
                </span>
              </div>
            )}

            <span className="ReservationPanel__legend">
              Les jeux restent accessibles selon disponibilités
            </span>
          </div>
        </div>

        {/* Bloc droit — Chambres (prochainement) */}
        <div className="ReservationPanel__block ReservationPanel__block--play">
          <div className="ReservationPanel__visual" aria-hidden="true">
            <img src="/drap.jpg" alt="" />
          </div>
          <div className="ReservationPanel__color-overlay" aria-hidden="true" />

          {/* Overlay "coming soon" — visible au hover */}
          <div className="ReservationPanel__soon" aria-hidden="true">
            <span className="ReservationPanel__soon-label">Prochainement</span>
            <span className="ReservationPanel__soon-sub">Pas encore disponible</span>
          </div>

          <div className="ReservationPanel__block-inner">
            <span className="ReservationPanel__tag">Chambres d'hôtes</span>
            <h3 className="ReservationPanel__heading">
              Profiter.
            </h3>
            <p className="ReservationPanel__sub">Un espace pour jouer & se retrouver</p>
            <button className="ReservationPanel__btn ReservationPanel__btn--disabled" disabled>
              Réserver une chambre
            </button>
            <span className="ReservationPanel__legend">
              Ouverture des réservations très prochainement
            </span>
          </div>
        </div>

      </div>
    </>
  )
}
