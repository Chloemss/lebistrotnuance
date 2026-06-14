import './HappyHour.css'

export default function HappyHour() {
  return (
    <section className="hh">
      <div className="hh__deco hh__deco--1">🍹</div>
      <div className="hh__deco hh__deco--2">🍺</div>
      <div className="hh__deco hh__deco--3">🍸</div>
      <div className="hh__inner">
        <div className="hh__badge">Happy Hour</div>
        <div className="hh__promo">
          <span className="hh__discount">-20%</span>
          <span className="hh__plus">ou plus</span>
        </div>
        <p className="hh__desc">
          Sur une sélection de Mocktails,<br />Cocktails et Bières
        </p>
        <div className="hh__schedule">
          <div className="hh__item">
            <span>📅</span>
            <div>
              <strong>Du mardi au vendredi</strong>
              <span>Jours ouvrés</span>
            </div>
          </div>
          <div className="hh__sep" />
          <div className="hh__item">
            <span>🕔</span>
            <div>
              <strong>17h30 → 19h30</strong>
              <span>En soirée</span>
            </div>
          </div>
        </div>
        <button className="btn btn--yellow btn--lg">Consulter la FAQ</button>
      </div>
    </section>
  )
}
