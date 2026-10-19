import SectionHeading from './SectionHeading'
import { advantages } from '../data/resume'

export default function Advantages() {
  return (
    <section id="advantages" className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-36">
      <SectionHeading no="01" zh="核心优势" en="Core Strengths" />
      <div className="space-y-0">
        {advantages.map((a, i) => (
          <article
            key={a.title}
            className="reveal group grid md:grid-cols-[110px_1fr_1.4fr] gap-4 md:gap-10 py-10 md:py-12 border-t border-ink/12 last:border-b items-start"
            style={{ ['--reveal-delay' as string]: `${i * 100}ms` }}
          >
            <span className="font-display text-2xl md:text-3xl font-bold text-cinnabar/80 group-hover:text-cinnabar transition-colors duration-300">
              {a.index}
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-bold leading-snug">{a.title}</h3>
            <p className="text-sm md:text-[15px] text-ink-soft leading-loose md:pt-1.5 relative pl-5 md:pl-6 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-ink/15 group-hover:before:bg-cinnabar before:transition-colors before:duration-500">
              {a.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
