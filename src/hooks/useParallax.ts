import { useEffect, useRef } from 'react'

/**
 * useParallax — injecte --py CSS custom property sur l'élément
 * en fonction du scroll. speed 0 = statique, 1 = scroll 1:1.
 */
export function useParallax(speed = 0.3) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let raf = 0
    let current = 0
    let target = 0

    const update = () => {
      const rect = el.parentElement?.getBoundingClientRect() ?? el.getBoundingClientRect()
      const center = rect.top + rect.height / 2 - window.innerHeight / 2
      target = center * speed
      // lerp doux
      current += (target - current) * 0.1
      el.style.setProperty('--py', `${current.toFixed(2)}px`)
      raf = requestAnimationFrame(update)
    }

    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [speed])

  return ref
}
