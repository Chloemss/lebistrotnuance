import './Devanture.css'

export default function Devanture() {
  return (
    <section className="Devanture">

      {/* ── En-tête ── */}
      <div className="Devanture__header">
        <div>
          <span className="Devanture__eyebrow">Le lieu</span>
          <h2 className="Devanture__title">
            Poussez<br /><em>la porte.</em>
          </h2>
        </div>
        <p className="Devanture__intro">
          Au cœur de Villeneuve-Loubet, une façade qui donne envie
          d'entrer — et une ambiance qui donne envie de rester.
        </p>
      </div>

      {/* ── Photo devanture — entière, zoom léger au survol ── */}
      <figure className="Devanture__frame">
        <img
          className="Devanture__img"
          src="/devanture.png"
          alt="La devanture du Bistrot des Nuances à Villeneuve-Loubet"
          loading="lazy"
        />
        <figcaption className="Devanture__caption">
          <span className="Devanture__caption-label">La devanture</span>
          <span className="Devanture__caption-loc">1 Av. de la Libération · Villeneuve-Loubet</span>
        </figcaption>
      </figure>

    </section>
  )
}
