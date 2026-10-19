import { useEffect, useRef } from 'react'
import SectionHeading from './SectionHeading'
import { timeline, education } from '../data/resume'

export default function Career() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLSpanElement>(null)

  // 时间轴竖线随滚动向下「生长」
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      lineRef.current?.style.setProperty('transform', 'scaleY(1)')
      return
    }
    let raf = 0
    const update = () => {
      raf = 0
      const wrap = wrapRef.current
      const line = lineRef.current
      if (!wrap || !line) return
      const r = wrap.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.7 - r.top) / r.height))
      line.style.transform = `scaleY(${p})`
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="career" className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-36">
      <SectionHeading no="03" zh="职业历程" en="Career 2008 — 2025" />

      <div className="relative" ref={wrapRef}>
        {/* 贯穿竖线（底层静态 + 上层朱砂生长线） */}
        <span className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-px bg-ink/15" aria-hidden />
        <span
          ref={lineRef}
          className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-px bg-cinnabar origin-top"
          style={{ transform: 'scaleY(0)' }}
          aria-hidden
        />

        {timeline.map((t, ti) => (
          <article key={t.company} className="relative pl-10 md:pl-16 pb-16 md:pb-24 last:pb-0">
            {/* 节点 */}
            <span
              className={`timeline-dot absolute left-0 top-2 w-[15px] h-[15px] md:w-[19px] md:h-[19px] rounded-full border-2 ${
                t.venture ? 'bg-cinnabar border-cinnabar' : 'bg-paper border-ink/40'
              }`}
              aria-hidden
            />

            <div className="grid lg:grid-cols-[240px_1fr] gap-6 lg:gap-14">
              {/* 左：期间（粘性） */}
              <div className="lg:sticky lg:top-28 self-start">
                <p className="reveal font-mono text-sm md:text-base tracking-wider text-ink-faint">{t.period}</p>
                <p className="reveal mt-1 text-xs tracking-[0.3em] text-ink-faint">{t.city}</p>
                {t.venture && (
                  <p className="reveal mt-3 inline-block bg-cinnabar text-paper-light text-[10px] tracking-[0.3em] px-3 py-1">
                    创业经历
                  </p>
                )}
              </div>

              {/* 右：内容 */}
              <div className="reveal" style={{ ['--reveal-delay' as string]: '120ms' }}>
                <h3 className="font-display text-2xl md:text-3xl font-bold leading-snug">{t.company}</h3>
                <p className="mt-2 text-sm md:text-base">
                  <span className={t.venture ? 'text-cinnabar font-semibold' : 'text-cinnabar font-medium'}>{t.role}</span>
                  {t.dept && <span className="text-ink-faint"> · {t.dept}</span>}
                </p>

                <ul className="mt-7 space-y-5">
                  {t.points.map((p) => (
                    <li key={p.title} className="grid md:grid-cols-[150px_1fr] gap-1 md:gap-6 group">
                      <span className="flex items-center gap-2 text-sm font-semibold shrink-0">
                        <span
                          className={`w-1.5 h-1.5 ${t.venture ? 'bg-cinnabar' : 'bg-ink/40'} transition-transform duration-300 group-hover:rotate-45 group-hover:bg-cinnabar`}
                        />
                        {p.title}
                      </span>
                      <span className="text-sm md:text-[15px] text-ink-soft leading-loose">{p.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {ti < timeline.length - 1 && <span className="hidden" />}
          </article>
        ))}

        {/* 教育经历 */}
        <article className="relative pl-10 md:pl-16 pt-4">
          <span className="absolute left-0 top-6 w-[15px] h-[15px] md:w-[19px] md:h-[19px] rounded-full bg-paper border-2 border-ink/40" aria-hidden />
          <div className="grid lg:grid-cols-[240px_1fr] gap-6 lg:gap-14">
            <div className="lg:sticky lg:top-28 self-start">
              <p className="reveal font-mono text-sm md:text-base tracking-wider text-ink-faint">{education.period}</p>
              <p className="reveal mt-1 text-xs tracking-[0.3em] text-ink-faint">{education.city}</p>
            </div>
            <div className="reveal" style={{ ['--reveal-delay' as string]: '120ms' }}>
              <p className="text-[11px] tracking-[0.35em] text-ink-faint uppercase mb-2">教育经历 · Education</p>
              <h3 className="font-display text-2xl md:text-3xl font-bold">{education.school}</h3>
              <p className="mt-2 text-sm md:text-base text-ink-soft">{education.major}</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
