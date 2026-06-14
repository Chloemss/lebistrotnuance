import { useEffect, useState } from 'react'
import './Loader.css'

interface LoaderProps { onDone: () => void }

export default function Loader({ onDone }: LoaderProps) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 2600)
    const t2 = setTimeout(() => onDone(), 3200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <div className={`Loader${leaving ? ' Loader--leaving' : ''}`}>
      <div className="Loader__inner">
        <div className="Loader__logo">
          <span className="Loader__lucky">Wine</span>
          <span className="Loader__folks">Bar</span>
        </div>
        <p className="Loader__tag">Eat · Drink · Play</p>
        <div className="Loader__bar">
          <div className="Loader__bar-fill" />
        </div>
      </div>
    </div>
  )
}
