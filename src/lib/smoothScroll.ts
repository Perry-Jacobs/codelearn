let activeFrame: number | null = null

function easeInOutCubic(progress: number) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2
}

export function cancelSmoothScroll() {
  if (activeFrame !== null) {
    window.cancelAnimationFrame(activeFrame)
    activeFrame = null
  }
}

/**
 * Scroll an element to the top of the viewport with a short eased animation.
 *
 * The animation is driven manually so it also works in browsers (and embedded
 * webviews) that ignore native `behavior: 'smooth'`. The element's
 * `scroll-margin-top` is respected, which keeps the sticky navbar clear of the
 * target.
 */
export function smoothScrollTo(element: HTMLElement | null) {
  if (!element) return

  cancelSmoothScroll()

  const scrollMargin =
    Number.parseFloat(window.getComputedStyle(element).scrollMarginTop) || 0
  const target = element.getBoundingClientRect().top + window.scrollY - scrollMargin

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo({ top: target, left: 0, behavior: 'instant' })
    return
  }

  const start = window.scrollY
  const distance = target - start
  if (Math.abs(distance) < 1) return

  const duration = Math.min(700, Math.max(280, Math.abs(distance) * 0.45))
  const startTime = window.performance.now()

  const step = (now: number) => {
    const progress = Math.min(1, (now - startTime) / duration)
    window.scrollTo({
      top: start + distance * easeInOutCubic(progress),
      left: 0,
      behavior: 'instant',
    })

    if (progress < 1) {
      activeFrame = window.requestAnimationFrame(step)
    } else {
      activeFrame = null
    }
  }

  activeFrame = window.requestAnimationFrame(step)
}
