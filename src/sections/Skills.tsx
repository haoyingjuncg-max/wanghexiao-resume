import SectionHeading from './SectionHeading'
import { skills } from '../data/resume'

export default function Skills() {
  return (
    <section id="skills" className="bg-paper-deep/40 border-y border-ink/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-36">
        <SectionHeading no="04" zh="能力图谱" en="Capability Map" />

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {skills.map((s, i) => (
            <div key={s.name} className="reveal" style={{ ['--reveal-delay' as string]: `${(i % 2) * 100}ms` }}>
              <div className="flex items-baseline gap-4 pb-4 border-b-2 border-ink/70">
                <span className="font-mono text-xs text-cinnabar tracking-widest">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-xl md:text-2xl font-bold">{s.name}</h3>
                <span className="ml-auto text-[11px] text-ink-faint">{s.items.length} 项</span>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="text-[13px] md:text-sm px-3.5 py-1.5 border border-ink/25 text-ink-soft hover:border-cinnabar hover:text-cinnabar transition-colors duration-300 cursor-default"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              {'note' in s && s.note && (
                <p className="mt-3 text-xs text-ink-faint tracking-wider">—— {s.note}</p>
              )}
            </div>
          ))}
        </div>

        <p className="reveal mt-16 md:mt-20 font-display text-lg md:text-2xl font-semibold leading-relaxed max-w-3xl">
          「行政不是后勤，是组织的操作系统——
          <span className="text-cinnabar">制度是内核，数据是接口，人是体验。</span>」
        </p>
      </div>
    </section>
  )
}
