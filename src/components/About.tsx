import './About.css'

export default function About() {
  return (
    <section className="About is--red">

      {/* ── Zone texte principale ── */}
      <div className="About__content">

        <span className="About__eyebrow">Wine Bar · Villeneuve-Loubet</span>

        <h2 className="About__title">
          <span>Manger,</span>
          <span>boire</span>
          <span>&amp;&nbsp;profiter.</span>
        </h2>

        <div className="About__grid">

          {/* À propos */}
          <div className="About__apropos">
            <span className="About__section-label">À propos</span>
            <p className="About__desc">
              Restaurant-bar à jeux dans l'esprit fête foraine revisitée.
              Situé au cœur de Villeneuve-Loubet, ce lieu de vie original mêle
              cuisine maison, ambiance chaleureuse et jeux à partager — fléchettes,
              shuffleboard, pétanque, karaoké privatif et bien plus encore.
            </p>
            <div className="About__location">
              <span className="About__location-dot" aria-hidden="true" />
              <div>
                <strong className="About__location-name">Villeneuve-Loubet</strong>
                <span className="About__location-coords">43°37′N · 7°07′E</span>
              </div>
            </div>
          </div>

          {/* Horaires — mis en avant */}
          <div className="About__schedule">
            <span className="About__section-label">Horaires d'ouverture</span>

            <div className="About__schedule-row">
              <div className="About__schedule-day-block">
                <span className="About__schedule-day">Mar — Dim</span>
              </div>
              <div className="About__schedule-times">
                <span>
                  <em>Midi</em>
                  12h – 14h30
                </span>
                <span>
                  <em>Soir</em>
                  19h – 22h30
                </span>
              </div>
            </div>

            <div className="About__schedule-divider" aria-hidden="true" />

            <div className="About__schedule-row About__schedule-row--off">
              <span className="About__schedule-day">Lundi</span>
              <span className="About__schedule-closed">Fermé</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}
