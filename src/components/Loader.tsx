import { useEffect, useRef, useState } from 'react'
import './Loader.css'

interface LoaderProps { onDone: () => void }

export default function Loader({ onDone }: LoaderProps) {
  const [exiting, setExiting] = useState(false)
  const onDoneRef = useRef(onDone)
  useEffect(() => { onDoneRef.current = onDone }, [onDone])

  useEffect(() => {
    const t1 = setTimeout(() => setExiting(true), 4300)
    const t2 = setTimeout(() => onDoneRef.current(), 5000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className={`Loader${exiting ? ' is--exit' : ''}`}>
      <div className="Loader__inner">
        <div className="Loader__logo-wrap">
          <img src="/logo-bn.png" className="Loader__logo" alt="Le Bistrot des Nuances" />
          <span className="Loader__pen" aria-hidden="true" />
        </div>
        <p className="Loader__tagline">Restaurant · Bar · Lounge</p>
        <span className="Loader__rule" aria-hidden="true" />
      </div>
    </div>
  )
}
