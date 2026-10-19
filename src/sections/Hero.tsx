import { profile, heroStats } from '../data/resume'
import { useCountUp } from '../hooks/useCountUp'
import portrait from '../assets/portrait'

function StatNumber({ value, unit }: { value: string; unit: string }) {
  const { ref, val } = useCountUp(parseInt(value, 10), 1400, true)
  return (
    <p className="font-display text-3xl md:text-4xl font-bold">
      <span ref={ref}>{val}</span>
      <span className="text-cinnabar text-xl md:text-2xl ml-0.5">{unit}</span>
    </p>
  )
}

export default function Hero() {
  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', String((e.clientX - r.left) / r.width - 0.5))
    e.currentTarget.style.setProperty('--my', String((e.clientY - r.top) / r.height - 0.5))
  }

  return (
    <section
      id="top"
      onPointerMove={onPointerMove}
      className="relative min-h-screen flex flex-col paper-grain overflow-hidden"
    >
      {/* 背景水印数字：视差 + 缓慢浮动 */}
      <span
        aria-hidden
        className="parallax pointer-events-none select-none absolute -right-10 top-16"
        style={{ transform: 'translate3d(calc(var(--mx, 0) * 42px), calc(var(--my, 0) * 42px), 0)' }}
      >
        <span className="animate-drift block font-display font-black text-[38vw] leading-none text-ink/[0.04]">
          17
        </span>
      </span>

      <div className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-10 pt-28 md:pt-32 pb-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-6 items-stretch">
        {/* 左：文字 */}
        <div className="flex flex-col justify-center relative z-10">
          <p className="reveal flex items-center gap-3 text-xs md:text-sm tracking-[0.4em] text-cinnabar font-medium uppercase mb-8">
            <span className="inline-block w-10 h-px bg-cinnabar" />
            行政 × 数字化 × 经营
          </p>

          <h1 className="reveal font-display font-black leading-[0.95]" style={{ ['--reveal-delay' as string]: '80ms' }}>
            <span className="block text-[clamp(4.5rem,13vw,10rem)]">{profile.name}</span>
          </h1>
          <p
            className="reveal mt-4 text-xs md:text-sm tracking-[0.55em] text-ink-faint uppercase"
            style={{ ['--reveal-delay' as string]: '160ms' }}
          >
            {profile.pinyin}
          </p>

          <div
            className="reveal mt-10 md:mt-12 max-w-xl"
            style={{ ['--reveal-delay' as string]: '240ms' }}
          >
            <p className="font-display text-xl md:text-2xl font-semibold leading-relaxed">
              17 年行政与综合管理，从行政主管到集团行政总监。
            </p>
            <p className="mt-4 text-sm md:text-base text-ink-soft leading-loose">
              把 AI 嵌进行政 12 大模块的数字化先行者，也是操盘过品牌、供应链与门店的 0 到 1 创业者——
              以经营者思维，做行政的控本与提效。
            </p>
          </div>

          <div
            className="reveal mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm"
            style={{ ['--reveal-delay' as string]: '320ms' }}
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cinnabar" />
              求职意向：{profile.headline}
            </span>
          </div>
          <div
            className="reveal mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-faint tracking-wider"
            style={{ ['--reveal-delay' as string]: '380ms' }}
          >
            <span>城市 · {profile.city}</span>
            <span>薪资 · {profile.salary}</span>
            <span className="text-cinnabar font-medium">状态 · {profile.availability}</span>
          </div>

          <div
            className="reveal mt-12 flex items-center gap-6"
            style={{ ['--reveal-delay' as string]: '440ms' }}
          >
            <a
              href="#career"
              className="group inline-flex items-center gap-3 bg-ink text-paper-light px-7 py-3.5 text-sm tracking-widest hover:bg-cinnabar transition-colors duration-300"
            >
              查看职业历程
              <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
            </a>
            <a href="#contact" className="nav-link text-sm tracking-widest text-ink-soft hover:text-ink">
              联系方式
            </a>
          </div>
        </div>

        {/* 右：人像 */}
        <div className="reveal relative flex items-end lg:items-stretch" style={{ ['--reveal-delay' as string]: '200ms' }}>
          <figure className="relative w-full max-w-md mx-auto lg:max-w-none">
            <div
              className="parallax absolute -top-3 -left-3 w-full h-full border border-cinnabar/60 pointer-events-none"
              style={{ transform: 'translate3d(calc(var(--mx, 0) * -12px), calc(var(--my, 0) * -12px), 0)' }}
            />
            <img
              src={portrait}
              alt="王鹤晓 职业形象照"
              className="relative w-full h-full max-h-[70vh] lg:max-h-none object-cover object-top grayscale-[12%]"
            />
            <figcaption className="absolute bottom-0 inset-x-0 flex items-center justify-between px-4 py-2.5 bg-ink/85 text-paper-light text-[10px] tracking-[0.25em] uppercase">
              <span>王鹤晓 · 2025</span>
              <span>北京 / 沈阳</span>
            </figcaption>
          </figure>
          {/* 竖排侧注 */}
          <span className="vertical-rl hidden xl:block absolute -right-12 top-6 text-xs tracking-[0.5em] text-ink-faint select-none">
            体系化管理 · 数据化提效
          </span>
        </div>
      </div>

      {/* 底部统计带 */}
      <div className="relative border-t border-ink/15 bg-paper-light/60">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4">
          {heroStats.map((s, i) => (
            <div
              key={s.label}
              className={`reveal py-7 md:py-9 px-2 md:px-8 ${i > 0 ? 'border-l border-ink/10' : ''} ${
                i >= 2 ? 'max-md:border-t max-md:border-ink/10' : ''
              } ${i === 2 ? 'max-md:border-l-0' : ''}`}
              style={{ ['--reveal-delay' as string]: `${i * 90}ms` }}
            >
              <StatNumber value={s.value} unit={s.unit} />
              <p className="mt-2 text-[11px] md:text-xs text-ink-faint tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
