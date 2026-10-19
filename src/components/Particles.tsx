import { useEffect, useRef } from 'react'

interface Props {
  className?: string
  /** 微粒颜色（rgba 前缀，不含透明度） */
  color?: string
  accentColor?: string
  count?: number
}

/** 缓慢上浮的数据微粒画布，用于深色版块背景；reduced-motion 时静止 */
export default function Particles({
  className = '',
  color = '246,242,234',
  accentColor = '195,0,0',
  count = 42,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const DPR = Math.min(2, window.devicePixelRatio || 1)
    let w = 0
    let h = 0
    let raf = 0

    const dots = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.7,
      speed: 0.00018 + Math.random() * 0.00045,
      drift: (Math.random() - 0.5) * 0.00012,
      alpha: 0.1 + Math.random() * 0.28,
      accent: Math.random() < 0.16,
    }))

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * DPR
      canvas.height = h * DPR
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const d of dots) {
        ctx.beginPath()
        ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${d.accent ? accentColor : color},${d.alpha})`
        ctx.fill()
      }
    }

    const loop = () => {
      for (const d of dots) {
        d.y -= d.speed
        d.x += d.drift
        if (d.y < -0.02) {
          d.y = 1.02
          d.x = Math.random()
        }
        if (d.x < -0.02) d.x = 1.02
        if (d.x > 1.02) d.x = -0.02
      }
      draw()
      raf = requestAnimationFrame(loop)
    }

    resize()
    if (reduced) {
      draw()
    } else {
      raf = requestAnimationFrame(loop)
    }
    const ro = new ResizeObserver(() => {
      resize()
      if (reduced) draw()
    })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [color, accentColor, count])

  return <canvas ref={ref} className={className} aria-hidden />
}
