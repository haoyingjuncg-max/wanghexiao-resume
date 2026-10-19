import '../App.css'
import { useRevealRoot } from '../hooks/useReveal'
import ScrollProgress from '../components/ScrollProgress'
import Nav from '../sections/Nav'
import Hero from '../sections/Hero'
import Advantages from '../sections/Advantages'
import AILab from '../sections/AILab'
import Career from '../sections/Career'
import Skills from '../sections/Skills'
import Contact from '../sections/Contact'

export default function Home() {
  const ref = useRevealRoot<HTMLDivElement>()

  return (
    <div ref={ref} className="min-h-screen bg-paper text-ink">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Advantages />
        <AILab />
        <Career />
        <Skills />
      </main>
      <Contact />
    </div>
  )
}
