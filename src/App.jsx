import { useState } from 'react'
import BootLoader from './components/BootLoader.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Research from './components/Research.jsx'
import Terminal from './components/Terminal.jsx'
import Contact from './components/Contact.jsx'
import { profile } from './data/resume.js'

export default function App() {
  const [booted, setBooted] = useState(false)

  return (
    <div className="scanlines relative min-h-screen bg-bg">
      {!booted && <BootLoader onDone={() => setBooted(true)} />}

      <div className="cyber-grid pointer-events-none fixed inset-0 z-0" />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Research />
          <Terminal />
          <Contact />
        </main>

        <footer className="border-t border-line py-8 text-center font-mono text-xs text-mist/50">
          <p>
            © {new Date().getFullYear()} {profile.name} — built with React · secured by design
          </p>
          <p className="mt-1.5">
            <span className="text-neon">$</span> echo "no vulnerabilities were exploited in the making of this site"
          </p>
        </footer>
      </div>
    </div>
  )
}
