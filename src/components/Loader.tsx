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
          <span className="Loader__lucky">LE BISTROT</span>
          <span className="Loader__folks">DES NUANCES</span>
        </div>
        <p className="Loader__tag">LOUNGE BAR · VILLENEUVE LOUBET</p>
        <div className="Loader__bar">
          <div className="Loader__bar-fill" />
        </div>
      </div>
    </div>
  )
}
