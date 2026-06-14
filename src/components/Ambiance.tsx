import './Ambiance.css'

export default function Ambiance() {
  return (
    <section className="Ambiance" id="ambiance">
      {/* h2 visible — span "Surprenante" masqué (accessible) */}
      <div className="Ambiance__container">
        <h2>
          Le tout dans une ambiance{' '}
          <span className="sr-only">Surprenante</span>
        </h2>
      </div>

      {/* Formes organiques SVG décoratifs */}
      <div className="Ambiance__forms" aria-hidden="true">
        <svg width="575" height="494" viewBox="0 0 575.12 494.49">
          <defs>
            <clipPath id="Ambiance__formsMask">
              <path d="M9,252c8.86-60,33.42-109.12,97.86-138.79,78-35.9,146.19-59.33,178.46-85.32,54-43.52,123.49-39.78,157.81,45.45S497.52,181.35,531.74,252,563,470.5,441.12,487.51,178.9,487.79,85,440.34.16,312,9,252Z"/>
            </clipPath>
          </defs>
          <g className="Ambiance__paths">
            <path d="M9,252c8.86-60,33.42-109.12,97.86-138.79,78-35.9,146.19-59.33,178.46-85.32,54-43.52,123.49-39.78,157.81,45.45S497.52,181.35,531.74,252,563,470.5,441.12,487.51,178.9,487.79,85,440.34.16,312,9,252Z"/>
            <path d="M35.73,252.24c8.85-60,15.92-94.24,80.37-123.91,78-35.9,122.77-43.29,161-59.16,70-29,173-48.4,207.32,36.83s-1.85,92.63,32.37,163.24-17.67,192.59-139.53,209.6S141.92,492.8,48,445.35,26.87,312.24,35.73,252.24Z"/>
            <path d="M35.73,252.24c-11.9-59.48,20.81-115,81.49-151.82,73.67-44.65,93.43-48.87,131.72-64.74,70-29,200.91-17.34,219.9,72.56,16.75,79.25,81.69,88.18,102.7,180.83,17.35,76.52-38.95,204.65-161.74,182.32-121-22-244.51-4.12-343.93-27.15C-25.67,423,49.12,319.21,35.73,252.24Z"/>
          </g>
        </svg>
      </div>

      {/* Zone visuelle avec clip-path organique + mot "Surprenante" */}
      <div className="Ambiance__visual" aria-hidden="true">
        <span className="Ambiance__word">Surprenante</span>
        <div className="Ambiance__visual-bg" />
      </div>
    </section>
  )
}
