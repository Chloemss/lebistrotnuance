import './Hero.css'

export default function Hero() {
  return (
    <section className="Hero">
      {/* Fond vidéo plein-écran */}
      <div className="Hero__bg" aria-hidden="true">
        <video
          className="Hero__bg-video"
          src="/salleRestaurant.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Fallback si la vidéo n'est pas encore uploadée */}
        <div className="Hero__bg-overlay" />
      </div>

      {/* Texte vertical gauche "EAT" */}
      <span className="Hero__side Hero__side--left" aria-hidden="true">EAT</span>

      {/* Texte vertical droite "PLAY" */}
      <span className="Hero__side Hero__side--right" aria-hidden="true">PLAY</span>

      {/* Contenu central */}
      <div className="Hero__container">
        <h1 className="Hero__title">
          <span>Boire</span>
          <span>Manger</span>
          <span>Profiter</span>
        </h1>
        <p className="Hero__subtitle">Le lieu incontournable situé à Villeneuve Loubet</p>
      </div>

      {/* Indicateur scroll vertical */}
      <div className="Hero__scroll" aria-hidden="true">
        <span className="Hero__scroll-line" />
        <span className="Hero__scroll-label">scroll</span>
      </div>

      {/* Cercle rotatif "scroll" bas-droite */}

    </section>
  )
}
