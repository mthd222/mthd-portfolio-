import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Research from './components/Research.jsx'
import Education from './components/Education.jsx'
import Terminal from './components/Terminal.jsx'
import Contact from './components/Contact.jsx'
import BackToTop from './components/BackToTop.jsx'
import ThreatCursor from './components/ThreatCursor.jsx'
import { profile } from './data/resume.js'

export default function App() {
  return (
    <>
      <ThreatCursor />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Research />
        <Education />
        <Terminal />
        <Contact />
      </main>

      <footer className="mt-8 border-t border-rule">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-2 px-5 py-8 text-muted sm:px-8">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>NIGHT//OPS interface · signal integrity maintained.</p>
        </div>
      </footer>
      <BackToTop />
    </>
  )
}
