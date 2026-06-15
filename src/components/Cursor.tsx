import { useEffect, useRef } from 'react'
import './Cursor.css'

/**
 * Cursor — Custom amber dot + lagging ring
 *
 * – Dot follows mouse instantly (CSS transform via JS)
 * – Ring follows with lerp (spring-like lag)
 * – On hover of any a / button: ring expands + label "VIEW"
 * – Hidden on touch devices
 */

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const rafRef  = useRef<number>(0)

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(hover: none)').matches) return

    let mx = window.innerWidth  / 2
    let my = window.innerHeight / 2
    let rx = mx, ry = my
    let hovering = false

    // ── Mouse tracking ──────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }

    // ── Lerp animation loop ─────────────────────────────────
    const tick = () => {
      const ease = hovering ? 0.08 : 0.12
      rx += (mx - rx) * ease
      ry += (my - ry) * ease

      dotRef.current?.style.setProperty(
        'transform',
        `translate3d(${mx}px,${my}px,0) translate(-50%,-50%)`
      )
      ringRef.current?.style.setProperty(
        'transform',
        `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`
      )
      rafRef.current = requestAnimationFrame(tick)
    }

    // ── Hover detection on interactive elements ─────────────
    const setHover = (on: boolean) => () => {
      hovering = on
      ringRef.current?.classList.toggle('is-hover', on)
    }

    // Listen on document (handles dynamically added elements)
    const onEnter = (e: MouseEvent) => {
      const t = (e.target as Element).closest('a, button, [data-cursor]')
      if (t) setHover(true)()
    }
    const onLeave = (e: MouseEvent) => {
      const t = (e.target as Element).closest('a, button, [data-cursor]')
      if (t) setHover(false)()
    }

    // ── Visibility ──────────────────────────────────────────
    const onEnterDoc  = () => dotRef.current?.classList.add('is-active')
    const onLeaveDoc  = () => dotRef.current?.classList.remove('is-active')

    document.addEventListener('mousemove',   onMove,     { passive: true })
    document.addEventListener('mouseover',   onEnter,    { passive: true })
    document.addEventListener('mouseout',    onLeave,    { passive: true })
    document.addEventListener('mouseenter',  onEnterDoc, { passive: true })
    document.addEventListener('mouseleave',  onLeaveDoc, { passive: true })

    rafRef.current = requestAnimationFrame(tick)

    // Hide the default cursor
    document.documentElement.style.cursor = 'none'

    return () => {
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mouseover',  onEnter)
      document.removeEventListener('mouseout',   onLeave)
      document.removeEventListener('mouseenter', onEnterDoc)
      document.removeEventListener('mouseleave', onLeaveDoc)
      cancelAnimationFrame(rafRef.current)
      document.documentElement.style.cursor = ''
    }
  }, [])

  return (
    <div className="Cursor" aria-hidden="true">
      <div className="Cursor__dot"  ref={dotRef}  />
      <div className="Cursor__ring" ref={ringRef} />
    </div>
  )
}
