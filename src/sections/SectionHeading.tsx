interface Props {
  no: string
  zh: string
  en: string
}

/** 章节标题：描边序号 + 中文大字 + 英文小注 + 朱砂短尺 */
export default function SectionHeading({ no, zh, en }: Props) {
  return (
    <div className="reveal mb-14 md:mb-20">
      <div className="flex items-end gap-5 md:gap-8">
        <span className="outline-number font-display text-6xl md:text-8xl font-black leading-none select-none">
          {no}
        </span>
        <div className="pb-1 md:pb-2">
          <p className="text-[11px] md:text-xs tracking-[0.35em] text-ink-faint uppercase mb-2">{en}</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">{zh}</h2>
        </div>
      </div>
      <div className="mt-6 h-px w-full bg-ink/15 relative">
        <span className="absolute left-0 -top-[1.5px] h-[4px] w-16 bg-cinnabar" />
      </div>
    </div>
  )
}
