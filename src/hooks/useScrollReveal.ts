import { useEffect } from 'react'

/**
 * useScrollReveal — Intersection Observer–driven scroll reveal
 *
 * Strategy (no JSX changes needed in most components):
 *  1. Auto-discovers specific CSS classes and marks them data-reveal
 *  2. Handles stagger delays for sibling groups (cards, FAQ items…)
 *  3. Adds .is-visible when the element enters the viewport
 *  4. Runs a second pass after 400ms to catch late-mounting components
 */

type RevealType = '' | 'left' | 'right' | 'scale' | 'heading'

interface AutoTarget {
  selector: string
  reveal?: RevealType
}

const AUTO_TARGETS: AutoTarget[] = [
  // Navbar eyebrow tags / labels (subtle)
  { selector: '.About__eyebrow', reveal: '' },
  { selector: '.About__apropos',  reveal: '' },
  { selector: '.About__location', reveal: '' },
  { selector: '.About__schedule', reveal: 'right' },
  { selector: '.About__photo-strip', reveal: '' },

  // Events
  { selector: '.Events__header',       reveal: '' },
  { selector: '.Events__recurring-item', reveal: '' },

  // Gallery
  { selector: '.Gallery__header', reveal: '' },

  // Atouts (dans À propos) — cascade via animation CSS
  { selector: '.About__features', reveal: '' },

  // Devanture (dans À propos)
  { selector: '.About__figure', reveal: 'scale' },

  // FAQ
  { selector: '.Faq__left',  reveal: 'left' },
  { selector: '.Faq__intro', reveal: '' },

  // Place
  { selector: '.Place__icon',    reveal: '' },
  { selector: '.Place__content', reveal: '' },

  // Visit
  { selector: '.Visit__col--links', reveal: 'right' },

  // Reservation
  { selector: '.Reservation__eyebrow', reveal: '' },
  { selector: '.Reservation__actions', reveal: '' },
  { selector: '.Reservation__note',    reveal: '' },

  // Footer
  { selector: '.Footer__cta-label',   reveal: '' },
  { selector: '.Footer__cta-btn',     reveal: '' },
  { selector: '.Footer__rule',        reveal: '' },   /* line-draw via CSS override */
  { selector: '.Footer__grid',        reveal: '' },
  { selector: '.Footer__bottom',      reveal: '' },

  // About photo strip
  { selector: '.About__photos', reveal: '' },

  // Reviews (header + footer — marquee géré par CSS)
  { selector: '.Reviews__header', reveal: '' },
  { selector: '.Reviews__footer', reveal: '' },
]

/**
 * Headings that get the dedicated "heading" reveal
 * (their child spans animate with stagger via CSS)
 * ONLY include headings whose direct children are <span> elements,
 * NOT headings that use <br/> + text nodes.
 */
const HEADING_TARGETS = [
  '.About__title',        // 3 child spans: Manger / boire / &profiter
  '.Reservation__title',  // 2 child spans: Alors / on réserve
  '.Footer__cta-title',   // 2 child spans: Venez / nous voir
]

/**
 * Groups where every child gets an incremental data-delay
 */
const STAGGER_GROUPS: Array<{ container: string; item: string }> = [
  { container: '.Events__grid',          item: '.Events__card' },
  /* .Faq__item retiré : sa className change au clic (is--open), React la
     réécrit et efface le is-visible posé par l'observer → l'item disparaissait */
  { container: '.Events__recurring-list', item: '.Events__recurring-item' },
  { container: '.About__grid',           item: '.About__apropos, .About__schedule' },
]

export function useScrollReveal() {
  useEffect(() => {
    // ── 1. Mark headings ─────────────────────────────────────
    HEADING_TARGETS.forEach(sel => {
      document.querySelectorAll<HTMLElement>(sel).forEach(el => {
        el.dataset.reveal = 'heading'
      })
    })

    // ── 2. Mark auto-targets ─────────────────────────────────
    AUTO_TARGETS.forEach(({ selector, reveal = '' }) => {
      document.querySelectorAll<HTMLElement>(selector).forEach(el => {
        if (!el.dataset.reveal) {
          el.dataset.reveal = reveal
        }
      })
    })

    // ── 3. Stagger siblings ───────────────────────────────────
    STAGGER_GROUPS.forEach(({ container, item }) => {
      document.querySelectorAll(container).forEach(wrap => {
        wrap.querySelectorAll<HTMLElement>(item).forEach((child, i) => {
          if (!child.dataset.reveal) child.dataset.reveal = ''
          child.dataset.delay = String(Math.min(i + 1, 6))
        })
      })
    })

    // ── 4. IntersectionObserver ───────────────────────────────
    const IO = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            IO.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.07, rootMargin: '0px 0px -48px 0px' }
    )

    const observeAll = () => {
      document.querySelectorAll('[data-reveal]').forEach(el => IO.observe(el))
    }

    observeAll()

    // Second pass — covers components that mount slightly later
    const timer = setTimeout(observeAll, 420)

    return () => {
      IO.disconnect()
      clearTimeout(timer)
    }
  }, [])
}
