import { useEffect, useRef, useState } from 'react'

/** 数字进入视口后从 0 滚动计数到 target；immediate 时挂载后直接开始。手动几何判定 + 定时器驱动，任何环境都能完成；尊重 reduced-motion */
export function useCountUp(target: number, duration = 1400, immediate = false) {
  const ref = useRef<HTMLSpanElement>(null)
  const [val, setVal] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(target)
      return
    }

    let started = false
    let timer = 0

    const start = () => {
      if (started) return
      started = true
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
      const t0 = performance.now()
      const tick = () => {
        const p = Math.min(1, (performance.now() - t0) / duration)
        const eased = 1 - Math.pow(1 - p, 3)
        setVal(Math.round(target * eased))
        if (p < 1) timer = window.setTimeout(tick, 40)
      }
      timer = window.setTimeout(tick, 40)
    }

    const check = () => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) start()
    }

    if (immediate) {
      timer = window.setTimeout(start, 500)
    } else {
      check()
      window.addEventListener('scroll', check, { passive: true })
      window.addEventListener('resize', check)
    }
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
      clearTimeout(timer)
    }
  }, [target, duration, immediate])

  return { ref, val }
}
