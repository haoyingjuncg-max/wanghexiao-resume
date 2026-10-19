import { useEffect, useRef } from 'react'

/**
 * 挂载后在容器内查找所有 .reveal 元素，
 * 进入视口时加 .is-visible（只触发一次，克制）。
 */
export function useRevealRoot<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const els = Array.from(root.querySelectorAll<HTMLElement>('.reveal'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    // 同步兜底：IO 在后台标签页/iframe 里可能延迟回调，
    // 首屏已在视口内的元素直接点亮，不依赖 IO。
    const vh = window.innerHeight
    els.forEach((el) => {
      const r = el.getBoundingClientRect()
      if (r.top < vh * 0.94 && r.bottom > 0) el.classList.add('is-visible')
    })
    // 保险丝：2.8s 后仍因任何原因未点亮的首屏元素强制点亮
    const failsafe = window.setTimeout(() => {
      els.forEach((el) => {
        if (el.classList.contains('is-visible')) return
        const r = el.getBoundingClientRect()
        if (r.top < window.innerHeight * 0.94 && r.bottom > 0) el.classList.add('is-visible')
      })
    }, 2800)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    els.forEach((el) => {
      if (!el.classList.contains('is-visible')) io.observe(el)
    })
    return () => {
      io.disconnect()
      clearTimeout(failsafe)
    }
  }, [])

  return ref
}
