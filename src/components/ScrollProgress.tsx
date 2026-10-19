import { useEffect, useRef } from 'react'

/** 页面顶部朱砂色滚动进度线 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      const el = ref.current
      if (!el) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      el.style.transform = `scaleX(${p})`
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-[2.5px] pointer-events-none">
      <div ref={ref} className="h-full w-full bg-cinnabar origin-left" style={{ transform: 'scaleX(0)' }} />
    </div>
  )
}
