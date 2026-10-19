import { profile } from '../data/resume'
import Particles from '../components/Particles'

const rows = [
  { label: '电话', value: profile.phone, href: `tel:${profile.phone}` },
  { label: '邮箱', value: profile.email, href: `mailto:${profile.email}` },
  { label: '工作城市', value: profile.city },
  { label: '期望薪资', value: profile.salary },
  { label: '到岗时间', value: profile.availability },
]

export default function Contact() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-ink text-paper-light paper-grain">
      <Particles className="absolute inset-0 w-full h-full pointer-events-none" count={26} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="reveal flex items-center gap-3 text-xs tracking-[0.4em] text-cinnabar uppercase mb-8">
          <span className="inline-block w-10 h-px bg-cinnabar" />
          Contact · 联系
        </div>

        <h2 className="reveal font-display text-4xl md:text-6xl font-black leading-tight max-w-3xl">
          随时到岗，
          <br className="md:hidden" />
          期待与您共事。
        </h2>
        <p className="reveal mt-6 text-sm md:text-base text-paper-light/60 leading-loose max-w-xl" style={{ ['--reveal-delay' as string]: '100ms' }}>
          求职意向：{profile.headline}。{profile.summary}。
        </p>

        <div className="reveal mt-14 border-t border-paper-light/15" style={{ ['--reveal-delay' as string]: '180ms' }}>
          {rows.map((r) => (
            <div key={r.label} className="contact-row grid grid-cols-[100px_1fr] md:grid-cols-[160px_1fr] items-center py-5 md:py-6 border-b border-paper-light/15 px-2 md:px-4">
              <span className="text-xs tracking-[0.35em] text-paper-light/45">{r.label}</span>
              {r.href ? (
                <a href={r.href} className="font-display text-xl md:text-3xl font-semibold hover:text-cinnabar transition-colors duration-300 break-all">
                  {r.value}
                </a>
              ) : (
                <span className="font-display text-xl md:text-3xl font-semibold">{r.value}</span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-paper-light/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[11px] tracking-[0.25em] text-paper-light/35 uppercase">
          <span>© 2025 王鹤晓 · 个人简历站</span>
          <span>行政管理 × AI 数字化 × 经营视角</span>
        </div>
      </div>
    </footer>
  )
}
