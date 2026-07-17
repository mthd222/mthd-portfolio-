import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BOOT_LINES = [
  '[  OK  ] Initializing MT-SEC kernel v9.56 ...',
  '[  OK  ] Loading offensive modules: nmap, metasploit, burpsuite',
  '[  OK  ] Wazuh SIEM agent connected :: telemetry online',
  '[  OK  ] Threat intel feed synced :: MITRE ATT&CK v15',
  '[  OK  ] WireGuard tunnel established :: traffic encrypted',
  '[ WARN ] Intrusion attempt detected ... just kidding.',
  '[  OK  ] Deploying portfolio payload ...',
  '',
  '>> ACCESS GRANTED — Welcome to MILAN TEJ H D // SECURITY PORTFOLIO',
]

export default function BootLoader({ onDone }) {
  const [lines, setLines] = useState([])
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      i += 1
      setLines(BOOT_LINES.slice(0, i))
      if (i >= BOOT_LINES.length) {
        clearInterval(timer)
        setTimeout(() => setVisible(false), 700)
        setTimeout(onDone, 1200)
      }
    }, 210)
    return () => clearInterval(timer)
  }, [onDone])

  const skip = () => {
    setVisible(false)
    setTimeout(onDone, 400)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-void px-6"
          onClick={skip}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full max-w-2xl font-mono text-sm leading-7">
            {lines.map((line, idx) => (
              <div
                key={idx}
                className={
                  line.startsWith('>>')
                    ? 'mt-2 font-bold text-neon'
                    : line.includes('WARN')
                      ? 'text-amber'
                      : 'text-mist'
                }
              >
                {line.includes('OK') ? (
                  <>
                    <span className="text-neon">[  OK  ]</span>
                    {line.slice(8)}
                  </>
                ) : (
                  line
                )}
              </div>
            ))}
            <span className="inline-block h-4 w-2.5 translate-y-0.5 bg-neon cursor-blink" />
            <div className="mt-6 text-xs text-mist/50">// click anywhere to skip</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
