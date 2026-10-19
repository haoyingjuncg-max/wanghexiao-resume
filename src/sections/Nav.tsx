import { useEffect, useState } from 'react'
import { profile } from '../data/resume'

const links = [
  { href: '#advantages', label: '核心优势' },
  { href: '#ai', label: 'AI 实践' },
  { href: '#career', label: '职业历程' },
  { href: '#skills', label: '能力图谱' },
  { href: '#contact', label: '联系' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-paper/90 backdrop-blur-md border-b border-ink/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <span className="w-2.5 h-2.5 bg-cinnabar transition-transform duration-500 group-hover:rotate-45" />
          <span className="font-display font-bold text-lg tracking-wide">{profile.name}</span>
          <span className="hidden md:inline text-[10px] tracking-[0.3em] text-ink-faint uppercase mt-0.5">
            {profile.pinyin}
          </span>
        </a>
        <nav className="flex items-center gap-5 md:gap-8 text-sm">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link text-ink-soft hover:text-ink hidden sm:inline">
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="sm:hidden text-cinnabar font-medium"
          >
            联系
          </a>
        </nav>
      </div>
    </header>
  )
}
