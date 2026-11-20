import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import MotionReel from './components/MotionReel.jsx'
import Skills from './components/Skills.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Research from './components/Research.jsx'
import Education from './components/Education.jsx'
import Terminal from './components/Terminal.jsx'
import Contact from './components/Contact.jsx'
import BackToTop from './components/BackToTop.jsx'
import ThreatCursor from './components/ThreatCursor.jsx'
import AttackSurface from './components/AttackSurface.jsx'
import Methodology from './components/Methodology.jsx'
import { profile } from './data/resume.js'

export default function App() {
  return (
    <>
      <ThreatCursor />
      <AttackSurface />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <MotionReel />
        <Projects />
        <Experience />
        <Methodology />
        <Skills />
        <Research />
        <Education />
        <Terminal />
        <Contact />
      </main>

      <footer className="site-footer">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-2 px-5 py-8 text-muted sm:px-8">
          <p>
            © {new Date().getFullYear()} {profile.name} <span className="footer-alias">// MTHD</span>
          </p>
          <p>Designed as a field dossier. Built for clarity, evidence, and speed.</p>
        </div>
      </footer>
      <BackToTop />
    </>
  )
}
