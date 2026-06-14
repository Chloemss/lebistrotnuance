import './InfosFooter.css'

export default function InfosFooter() {
  return (
    <section className="Infos" id="evenements">
      <div className="Infos__container">

        {/* Happy Hour */}
        <div className="Infos__block Infos__block--hh">
          <p className="Infos__block-tag">Happy Hour</p>
          <p className="Infos__block-big">-20%</p>
          <p className="Infos__block-detail">
            ou plus sur une sélection de Mocktails&nbsp;/
            cocktails et bières 50cl
          </p>
          <p className="Infos__block-schedule">
            Du mardi au vendredi, de 17h30 à 19h30
          </p>
        </div>

        {/* Réserver */}
        <div className="Infos__block Infos__block--resa">
          <h2 className="Infos__resa-title">Alors,<br />on réserve&nbsp;?</h2>
          <p className="Infos__resa-sub">
            Ouvert du mardi au dimanche<br />Services midis et soirs
          </p>
          <div className="Infos__resa-ctas">
            <a href="tel:+33164131304" className="btn btn--amber btn--lg">
              📞 01 64 13 13 04
            </a>
          </div>
        </div>

        {/* FAQ & Évènements */}
        <div className="Infos__block Infos__block--faq">
          <p className="Infos__block-tag">Évènements</p>
          <p className="Infos__block-text">
            Une question ?
          </p>
          <a href="#" className="Infos__link">
            Consulter la FAQ&nbsp;!
          </a>
          <div className="Infos__events">
            {[
              { emoji: '🎂', label: 'Anniversaires' },
              { emoji: '🏢', label: "Soirées d'entreprise" },
              { emoji: '🎊', label: 'EVJF & enterrements' },
              { emoji: '🎓', label: 'Séminaires' },
            ].map(ev => (
              <div key={ev.label} className="Infos__event-chip">
                <span>{ev.emoji}</span>
                <span>{ev.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
