import { useEffect, useRef, useState } from 'react'
import { Section, Reveal } from './Section.jsx'
import { prefersReducedMotion } from '../motion.js'
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
  ['experience', 'show work history'],
  ['research', 'published research'],
  ['education', 'degrees and scores'],
  ['certs', 'certifications'],
  ['interests', 'what I do off the clock'],
  ['contact', 'ways to reach me'],
  ['ls', 'list files'],
  ['cat <file>', 'read a file'],
  ['nmap', 'scan this portfolio'],
  ['sudo hire_me', 'escalate privileges'],
  ['clear', 'wipe the screen'],
]

const QUICK = ['help', 'whoami', 'nmap', 'sudo hire_me']

// Commands whose output arrives slowly, the way the real tools report.
const SLOW = new Set(['nmap', 'sudo', 'wget', 'resume', 'download'])

const PROMPT = 'visitor@milantej:~$ '

function runCommand(raw) {
  const input = raw.trim()
  const [cmd, ...args] = input.split(/\s+/)

  switch (cmd.toLowerCase()) {
    case '':
      return []
    case 'help':
      return [
        { text: 'Available commands:', cls: 'text-lime' },
        ...HELP.map(([c, d]) => ({ text: `  ${c.padEnd(14)} ${d}`, cls: 'text-shell-ink' })),
      ]
    case 'whoami':
      return [
        { text: profile.name, cls: 'text-lime font-bold' },
        { text: profile.roles.join(' | '), cls: 'text-udp' },
        { text: `Location: ${profile.location}`, cls: 'text-shell-ink' },
        { text: 'Clearance: OWASP Top 10, full coverage', cls: 'text-shell-ink' },
      ]
    case 'skills':
      return skillGroups.flatMap((g) => [
        { text: `[${g.title}]`, cls: 'text-lime' },
        { text: '  ' + g.skills.join(', '), cls: 'text-shell-ink' },
      ])
    case 'projects':
      return projects.flatMap((p, i) => [
        { text: `${i + 1}. ${p.name}  <${p.severity}>`, cls: 'text-udp' },
        { text: `   ${p.tag}`, cls: 'text-shell-ink/75' },
      ])
    case 'experience':
      return experience.flatMap((e) => [
        { text: `> ${e.role} @ ${e.company}`, cls: 'text-lime' },
        { text: `  ${e.period}`, cls: 'text-shell-ink/75' },
      ])
    case 'research':
      return [
        { text: research.title, cls: 'text-icmp' },
        { text: `${research.journal}, ${research.date}`, cls: 'text-shell-ink' },
      ]
    case 'education':
      return education.flatMap((e) => [
        { text: `${e.degree}, ${e.school}`, cls: 'text-udp' },
        { text: `  ${e.period}  ${e.score}`, cls: 'text-shell-ink/75' },
      ])
    case 'certs':
      return certifications.map((c) => ({ text: `* ${c.name}, ${c.issuer}`, cls: 'text-wheat' }))
    case 'interests':
      return interests.map((i) => ({ text: `- ${i}`, cls: 'text-shell-ink' }))
    case 'contact':
      return [
        { text: `email:    ${profile.email}`, cls: 'text-udp' },
        { text: `whatsapp: ${profile.whatsapp}`, cls: 'text-udp' },
        { text: `linkedin: ${profile.linkedin}`, cls: 'text-udp' },
        { text: `github:   ${profile.github}`, cls: 'text-udp' },
      ]
    case 'ls':
      return [{ text: 'resume.pdf  exploits/  soc_lab/  flags.txt  .secrets', cls: 'text-shell-ink' }]
    case 'cat':
      if (args[0] === 'flags.txt')
        return [{ text: 'flag{y0u_f0und_th3_h1dd3n_fl4g_n0w_h1r3_m1l4n}', cls: 'text-lime font-bold' }]
      if (args[0] === '.secrets')
        return [{ text: 'Permission denied. Nice try though, I respect the enumeration.', cls: 'text-salmon' }]
      if (args[0] === 'resume.pdf') {
        triggerResumeDownload()
        return [{ text: 'Binary file, downloading it instead.', cls: 'text-lime' }]
      }
      return [{ text: `cat: ${args[0] || ''}: No such file or directory`, cls: 'text-salmon' }]
    case 'resume':
    case 'download':
    case 'wget':
      triggerResumeDownload()
      return [
        { text: `wget ${window.location.origin}/Milan_Tej_Resume.pdf`, cls: 'text-shell-ink' },
        { text: 'Milan_Tej_Resume.pdf   100%[==========>] 164K', cls: 'text-lime' },
        { text: "'Milan_Tej_Resume.pdf' saved. Check your downloads folder.", cls: 'text-udp' },
      ]
    case 'nmap':
      return [
        { text: 'Starting Nmap 7.95 ( https://nmap.org )', cls: 'text-shell-ink' },
        { text: 'PORT     STATE  SERVICE', cls: 'text-shell-ink' },
        { text: '22/tcp   open   dedication', cls: 'text-lime' },
        { text: '80/tcp   open   web-security', cls: 'text-lime' },
        { text: '443/tcp  open   encrypted-work-ethic', cls: 'text-lime' },
        { text: '1337/tcp open   elite-skills', cls: 'text-lime' },
        { text: 'Nmap done: 1 candidate scanned, 0 weaknesses found.', cls: 'text-udp' },
      ]
    case 'sudo':
      if (args.join(' ') === 'hire_me')
        return [
          { text: '[sudo] password for recruiter: ********', cls: 'text-shell-ink' },
          { text: 'Access granted. Privilege escalation successful.', cls: 'text-lime font-bold' },
          { text: `Send the offer letter to ${profile.email}`, cls: 'text-udp' },
        ]
      return [{ text: `${args[0] || ''}: command requires hire_me`, cls: 'text-salmon' }]
    case 'rm':
      return [{ text: 'rm: cannot remove anything, this portfolio is hardened.', cls: 'text-salmon' }]
    case 'exit':
      return [{ text: 'There is no escape. Try "sudo hire_me" instead.', cls: 'text-wheat' }]
    case 'clear':
      return null // handled by caller
    default:
      return [{ text: `bash: ${cmd}: command not found. Try 'help'.`, cls: 'text-salmon' }]
  }
}

const WELCOME = [
  { text: 'mthd222 shell', cls: 'text-lime font-bold' },
  { text: "Type 'help' to list commands. There is a flag hidden in here.", cls: 'text-shell-ink' },
]

function Prompt() {
  return (
    <>
      <span className="text-lime">visitor@milantej</span>
      <span className="text-shell-ink">:</span>
      <span className="text-udp">~</span>
      <span className="text-shell-ink">$ </span>
    </>
  )
}

export default function Terminal() {
  const [history, setHistory] = useState(WELCOME)
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  const pending = useRef([])
  const printer = useRef(0)

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [history])

  useEffect(() => () => clearInterval(printer.current), [])

  // Output is printed a line at a time; a new command flushes whatever is left.
  const flush = () => {
    clearInterval(printer.current)
    const rest = pending.current
    pending.current = []
    return rest
  }

  const run = (raw) => {
    const out = runCommand(raw)
    const rest = flush()
    if (out === null) {
      setHistory([])
    } else {
      const promptLine = { text: raw, cls: 'text-white', prompt: true }
      if (prefersReducedMotion() || out.length < 2) {
        setHistory((h) => [...h, ...rest, promptLine, ...out])
      } else {
        setHistory((h) => [...h, ...rest, promptLine])
        pending.current = out
        const cmd = raw.trim().split(/\s+/)[0].toLowerCase()
        printer.current = setInterval(
          () => {
            const [line, ...later] = pending.current
            pending.current = later
            if (line) setHistory((h) => [...h, line])
            if (!later.length) clearInterval(printer.current)
          },
          SLOW.has(cmd) ? 150 : 28,
        )
      }
    }
    if (raw.trim()) setCmdHistory((c) => [raw, ...c])
    setHistIdx(-1)
    setInput('')
  }

  const submit = (e) => {
    e.preventDefault()
    run(input)
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
      const next = Math.max(histIdx - 1, -1)
      setHistIdx(next)
      setInput(next >= 0 ? cmdHistory[next] : '')
    }
  }

  return (
    <Section id="terminal" title="Shell" note="The same resume, for people who prefer a prompt">
      <Reveal className="shell overflow-hidden">
        <div
          ref={bodyRef}
          className="shell-body h-80 overflow-y-auto px-4 py-4 sm:h-96 sm:px-5"
          onClick={() => {
            if (!window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true })
          }}
        >
          <div role="log" aria-live="polite" aria-label="Shell output">
            {history.map((line, i) => (
              <div key={i} className={`shell-line break-words whitespace-pre-wrap ${line.cls || 'text-shell-ink'}`}>
                {line.prompt && <Prompt />}
                {line.text}
              </div>
            ))}
          </div>

          <form onSubmit={submit} className="flex items-center">
            <label htmlFor="shell-input" className="shrink-0">
              <span className="sr-only">Shell command</span>
              <span aria-hidden="true">
                <Prompt />
              </span>
            </label>
            <input
              id="shell-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className="ml-2 min-h-11 min-w-0 flex-1 rounded-sm bg-transparent text-base text-white caret-lime outline-offset-0"
              spellCheck="false"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              enterKeyHint="go"
            />
          </form>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-white/15 px-4 py-3 sm:px-5">
          <span className="mr-1 text-sm text-shell-ink">Run one:</span>
          {QUICK.map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => run(cmd)}
              className="hex min-h-11 rounded border border-white/30 px-3 text-sm text-white transition-colors hover:bg-white/12"
            >
              {cmd}
            </button>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
