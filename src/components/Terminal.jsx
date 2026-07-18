import { useEffect, useRef, useState } from 'react'
import { SectionHeading, Reveal } from './Section.jsx'
import {
  profile, skillGroups, projects, experience, research,
  education, certifications, interests,
} from '../data/resume.js'

function triggerResumeDownload() {
  const a = document.createElement('a')
  a.href = '/Milan_Tej_Resume.pdf'
  a.download = 'Milan_Tej_Resume.pdf'
  document.body.appendChild(a)
  a.click()
  a.remove()
}

const HELP = [
  ['help', 'list all available commands'],
  ['resume', 'download the full resume (PDF)'],
  ['whoami', 'identity check'],
  ['skills', 'dump the skill matrix'],
  ['projects', 'list security projects'],
  ['experience', 'show mission log'],
  ['research', 'published research'],
  ['education', 'degrees & scores'],
  ['certs', 'certifications'],
  ['interests', 'off-duty operations'],
  ['contact', 'open a comms channel'],
  ['ls', 'list files'],
  ['cat <file>', 'read a file'],
  ['nmap', 'scan this portfolio'],
  ['sudo hire_me', 'escalate privileges'],
  ['clear', 'wipe the screen'],
]

function runCommand(raw) {
  const input = raw.trim()
  const [cmd, ...args] = input.split(/\s+/)

  switch (cmd.toLowerCase()) {
    case '':
      return []
    case 'help':
      return [
        { text: 'MT-SEC SHELL — available commands:', cls: 'text-neon' },
        ...HELP.map(([c, d]) => ({ text: `  ${c.padEnd(14)} ${d}`, cls: 'text-mist' })),
      ]
    case 'whoami':
      return [
        { text: profile.name, cls: 'text-neon font-bold' },
        { text: 'Penetration Tester | VAPT Specialist | SOC & XDR', cls: 'text-cyber' },
        { text: `Location: ${profile.location}`, cls: 'text-mist' },
        { text: 'Clearance: OWASP Top 10 — full coverage', cls: 'text-mist' },
      ]
    case 'skills':
      return skillGroups.flatMap((g) => [
        { text: `[${g.title}]`, cls: 'text-neon' },
        { text: '  ' + g.skills.join(' · '), cls: 'text-mist' },
      ])
    case 'projects':
      return projects.flatMap((p, i) => [
        { text: `${i + 1}. ${p.name}  <${p.severity}>`, cls: 'text-cyber' },
        { text: `   ${p.tag}`, cls: 'text-mist/70' },
      ])
    case 'experience':
      return experience.flatMap((e) => [
        { text: `> ${e.role} @ ${e.company}`, cls: 'text-neon' },
        { text: `  ${e.period}`, cls: 'text-mist/70' },
      ])
    case 'research':
      return [
        { text: research.title, cls: 'text-violet' },
        { text: `${research.journal} · ${research.date}`, cls: 'text-mist' },
      ]
    case 'education':
      return education.flatMap((e) => [
        { text: `${e.degree} — ${e.school}`, cls: 'text-cyber' },
        { text: `  ${e.period} · ${e.score}`, cls: 'text-mist/70' },
      ])
    case 'certs':
      return certifications.map((c) => ({ text: `★ ${c.name} — ${c.issuer}`, cls: 'text-amber' }))
    case 'interests':
      return interests.map((i) => ({ text: `▸ ${i}`, cls: 'text-mist' }))
    case 'contact':
      return [
        { text: `email:    ${profile.email}`, cls: 'text-cyber' },
        { text: `whatsapp: ${profile.whatsapp}`, cls: 'text-cyber' },
        { text: `linkedin: ${profile.linkedin}`, cls: 'text-cyber' },
        { text: `github:   ${profile.github}`, cls: 'text-cyber' },
      ]
    case 'ls':
      return [{ text: 'resume.pdf  exploits/  soc_lab/  flags.txt  .secrets', cls: 'text-mist' }]
    case 'cat':
      if (args[0] === 'flags.txt')
        return [{ text: 'flag{y0u_f0und_th3_h1dd3n_fl4g_n0w_h1r3_m1l4n}', cls: 'text-neon font-bold' }]
      if (args[0] === '.secrets')
        return [{ text: 'Permission denied. Nice try though — I respect the enumeration.', cls: 'text-danger' }]
      if (args[0] === 'resume.pdf') {
        triggerResumeDownload()
        return [{ text: 'Binary file — dispatching download instead ... ✔', cls: 'text-neon' }]
      }
      return [{ text: `cat: ${args[0] || ''}: No such file or directory`, cls: 'text-danger' }]
    case 'resume':
    case 'download':
    case 'wget':
      triggerResumeDownload()
      return [
        { text: 'wget https://milantej.dev/Milan_Tej_Resume.pdf', cls: 'text-mist' },
        { text: 'Milan_Tej_Resume.pdf         100%[==================>] 164K', cls: 'text-neon' },
        { text: "'Milan_Tej_Resume.pdf' saved — check your downloads folder.", cls: 'text-cyber' },
      ]
    case 'nmap':
      return [
        { text: 'Starting Nmap 7.95 ( https://nmap.org )', cls: 'text-mist' },
        { text: 'PORT     STATE  SERVICE', cls: 'text-mist' },
        { text: '22/tcp   open   dedication', cls: 'text-neon' },
        { text: '80/tcp   open   web-security', cls: 'text-neon' },
        { text: '443/tcp  open   encrypted-work-ethic', cls: 'text-neon' },
        { text: '1337/tcp open   elite-skills', cls: 'text-neon' },
        { text: 'Nmap done: 1 candidate scanned — 0 weaknesses found.', cls: 'text-cyber' },
      ]
    case 'sudo':
      if (args.join(' ') === 'hire_me')
        return [
          { text: '[sudo] password for recruiter: ********', cls: 'text-mist' },
          { text: 'ACCESS GRANTED ✔ Privilege escalation successful.', cls: 'text-neon font-bold' },
          { text: `Deploying offer letter to ${profile.email} ...`, cls: 'text-cyber' },
        ]
      return [{ text: `${args[0] || ''}: command requires hire_me`, cls: 'text-danger' }]
    case 'rm':
      return [{ text: 'rm: cannot remove anything — this portfolio is hardened.', cls: 'text-danger' }]
    case 'exit':
      return [{ text: 'There is no escape. Try "sudo hire_me" instead.', cls: 'text-amber' }]
    case 'clear':
      return null // handled by caller
    default:
      return [
        { text: `bash: ${cmd}: command not found — try 'help'`, cls: 'text-danger' },
      ]
  }
}

const WELCOME = [
  { text: '╔══════════════════════════════════════════════╗', cls: 'text-neon' },
  { text: '║   MT-SEC SHELL v9.56 — authorized users only ║', cls: 'text-neon' },
  { text: '╚══════════════════════════════════════════════╝', cls: 'text-neon' },
  { text: "Type 'help' to list commands. Hidden flags exist for the curious.", cls: 'text-mist' },
]

export default function Terminal() {
  const [history, setHistory] = useState(WELCOME)
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [history])

  const submit = (e) => {
    e.preventDefault()
    const out = runCommand(input)
    if (out === null) {
      setHistory([])
    } else {
      setHistory((h) => [
        ...h,
        { text: `visitor@milantej:~$ ${input}`, cls: 'text-ghost', prompt: true },
        ...out,
      ])
    }
    if (input.trim()) setCmdHistory((c) => [input, ...c])
    setHistIdx(-1)
    setInput('')
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(histIdx + 1, cmdHistory.length - 1)
      if (cmdHistory[next]) {
        setHistIdx(next)
        setInput(cmdHistory[next])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = histIdx - 1
      setHistIdx(next)
      setInput(next >= 0 ? cmdHistory[next] : '')
    }
  }

  return (
    <section id="terminal" className="relative mx-auto max-w-6xl px-5 py-24">
      <SectionHeading tag="ssh visitor@milantej" title="Live" accent="Terminal" />

      <Reveal>
        <div
          className="term-shell corner-brackets overflow-hidden"
          onClick={() => inputRef.current?.focus()}
        >
          {/* title bar */}
          <div className="flex items-center gap-2 border-b border-line bg-panel px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-danger/80" />
            <span className="h-3 w-3 rounded-full bg-amber/80" />
            <span className="h-3 w-3 rounded-full bg-neon/80" />
            <span className="ml-3 font-mono text-xs text-mist/70">
              visitor@milantej: ~ — bash — 80×24
            </span>
          </div>

          {/* output */}
          <div ref={bodyRef} className="term-body h-80 overflow-y-auto px-4 py-3 sm:h-96">
            {history.map((line, i) => (
              <div key={i} className={`whitespace-pre-wrap ${line.cls || 'text-mist'}`}>
                {line.prompt ? (
                  <>
                    <span className="text-neon">visitor@milantej</span>
                    <span className="text-mist">:</span>
                    <span className="text-cyber">~</span>
                    <span className="text-mist">$ </span>
                    {line.text.replace('visitor@milantej:~$ ', '')}
                  </>
                ) : (
                  line.text
                )}
              </div>
            ))}

            {/* input row */}
            <form onSubmit={submit} className="flex items-center">
              <span className="text-neon">visitor@milantej</span>
              <span className="text-mist">:</span>
              <span className="text-cyber">~</span>
              <span className="mr-2 text-mist">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                className="flex-1 bg-transparent font-mono text-sm text-ghost caret-neon outline-none"
                spellCheck="false"
                autoComplete="off"
                aria-label="Terminal input"
              />
            </form>
          </div>
        </div>
      </Reveal>

      <p className="mt-4 text-center font-mono text-xs text-mist/50">
        // psst — try <span className="text-neon">sudo hire_me</span> or{' '}
        <span className="text-neon">cat flags.txt</span>
      </p>
    </section>
  )
}
