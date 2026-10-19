import { metrics } from '../data/resume'
import { useCountUp } from '../hooks/useCountUp'
import Particles from '../components/Particles'

/** 纯数字（含 + / − 前缀）的指标值做滚动计数，区间值（7→2）保持静态 */
function MetricValue({ value, unit }: { value: string; unit?: string }) {
  const m = value.match(/^([+−-]?)(\d+)$/)
  if (!m) {
    return (
      <>
        {value}
        <span className="text-lg md:text-xl ml-1 text-paper-light/60 group-hover:text-paper-light/80">{unit}</span>
      </>
    )
  }
  return <CountedValue sign={m[1]} num={parseInt(m[2], 10)} unit={unit} />
}

function CountedValue({ sign, num, unit }: { sign: string; num: number; unit?: string }) {
  const { ref, val } = useCountUp(num)
  return (
    <>
      <span ref={ref}>
        {sign}
        {val}
      </span>
      <span className="text-lg md:text-xl ml-1 text-paper-light/60 group-hover:text-paper-light/80">{unit}</span>
    </>
  )
}

export default function AILab() {
  return (
    <section id="ai" className="relative overflow-hidden bg-ink text-paper-light paper-grain">
      {/* 背景数据微粒 */}
      <Particles className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-36">
        <div className="reveal mb-14 md:mb-20">
          <div className="flex items-end gap-5 md:gap-8">
            <span
              className="font-display text-6xl md:text-8xl font-black leading-none select-none"
              style={{ color: 'transparent', WebkitTextStroke: '1px rgba(246,242,234,0.3)' }}
            >
              02
            </span>
            <div className="pb-1 md:pb-2">
              <p className="text-[11px] md:text-xs tracking-[0.35em] text-paper-light/50 uppercase mb-2">
                AI × Administration
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
                AI 落地的十二模块，用数字说话
              </h2>
            </div>
          </div>
          <div className="mt-6 h-px w-full bg-paper-light/15 relative">
            <span className="absolute left-0 -top-[1.5px] h-[4px] w-16 bg-cinnabar" />
          </div>
          <p className="mt-6 max-w-2xl text-sm md:text-base text-paper-light/70 leading-loose">
            在北京恒源新能任职期间，主导将 AI 工具嵌入行政 12 大工作模块，
            独立完成「流程梳理 — AI 落地 — 效果量化」全链路。以下每一项，都有前后对照。
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-paper-light/12">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="reveal group relative border-r border-b border-paper-light/12 p-7 md:p-9 hover:bg-paper-light/[0.04] transition-colors duration-500"
              style={{ ['--reveal-delay' as string]: `${(i % 3) * 90}ms` }}
            >
              <p className="font-display text-4xl md:text-5xl font-bold tracking-tight group-hover:text-cinnabar transition-colors duration-500">
                <MetricValue value={m.value} unit={m.unit} />
              </p>
              <p className="mt-3 text-sm font-medium tracking-wide">{m.label}</p>
              <p className="mt-2 text-xs text-paper-light/50 leading-relaxed">{m.note}</p>
              <span className="absolute top-4 right-5 text-[10px] tracking-[0.3em] text-paper-light/25 font-mono">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>

        <p className="reveal mt-8 text-[11px] tracking-widest text-paper-light/35">
          * 数据为 2022.11 — 2024.11 任职期间实际落地口径
        </p>
      </div>
    </section>
  )
}
