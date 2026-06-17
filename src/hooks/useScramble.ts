import { useState, useRef, useCallback } from 'react'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const FRAMES_PER_CHAR = 2   // ~33ms par lettre à 60fps → effet snappy

function isLetter(char: string): boolean {
  return /[a-zA-ZÀ-ÿ]/.test(char)
}

export function useScramble(original: string) {
  const [text, setText] = useState(original)
  const rafRef = useRef<number | null>(null)

  const scramble = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    const chars = Array.from(original)
    let frame = 0

    const tick = () => {
      frame++
      const resolved = Math.floor(frame / FRAMES_PER_CHAR)

      const next = chars
        .map((c, i) => {
          if (!isLetter(c)) return c          // ponctuation / espaces intacts
          if (i < resolved) return c          // lettre déjà résolue → original
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        })
        .join('')

      setText(next)

      if (resolved < chars.length) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setText(original)                     // état final propre
        rafRef.current = null
      }
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [original])

  const reset = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    setText(original)
  }, [original])

  return { text, scramble, reset }
}
