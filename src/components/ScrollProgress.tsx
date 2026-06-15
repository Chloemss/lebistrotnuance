import { useEffect, useRef } from 'react'
import './ScrollProgress.css'

/**
 * ScrollProgress — paper-thin amber line at the very top of the viewport
 * Fills left → right as the user scrolls through the page
 */

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const ratio = total > 0 ? window.scrollY / total : 0
      barRef.current?.style.setProperty('transform', `scaleX(${ratio})`)
    }

    window.addEventListener('scroll', update, { passive: true })
    update()

    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="ScrollProgress" aria-hidden="true">
      <div className="ScrollProgress__bar" ref={barRef} />
    </div>
  )
}
