import { useState, useEffect, useCallback } from 'react'
import './ScrollArrow.css'

// Ordre des ancres — doit correspondre aux IDs dans App.tsx
const SECTIONS = [
  'hero',
  'about',
  'carte-video',
  'pagelinks',
  'events',
  'reserver',
  'place',
  'faq',
  'visit',
]

export default function ScrollArrow() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isHidden, setIsHidden]     = useState(false)

  useEffect(() => {
    const update = () => {
      let idx = 0
      SECTIONS.forEach((id, i) => {
        const el = document.getElementById(id)
        if (!el) return
        const top = el.getBoundingClientRect().top
        // La section est considérée "active" dès que son haut passe sous le centre du viewport
        if (top <= window.innerHeight * 0.5) idx = i
      })
      setCurrentIdx(idx)
      setIsHidden(idx >= SECTIONS.length - 1)
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  const scrollToNext = useCallback(() => {
    const nextId = SECTIONS[currentIdx + 1]
    if (!nextId) return
    document.getElementById(nextId)?.scrollIntoView({ behavior: 'smooth' })
  }, [currentIdx])

  return (
    <button
      className={`ScrollArrow${isHidden ? ' ScrollArrow--hidden' : ''}`}
      onClick={scrollToNext}
      aria-label="Section suivante"
    >
      <svg
        width="20" height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  )
}
