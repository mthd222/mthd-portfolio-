import { Section, Reveal } from './Section.jsx'

const CAPABILITIES = [
  {
    level: 'Professional exposure',
    title: 'SOC & detection engineering',
    context: 'Applied during cybersecurity internships and controlled SOC lab work.',
    skills: ['Wazuh SIEM / XDR', 'TrendMicro', 'Qualys', 'Log correlation', 'Alert triage', 'Detection logic'],
  },
  {
    level: 'Built & validated',
    title: 'Application security',
    context: 'Used to design, test, and document security controls in project environments.',
    skills: ['OWASP Top 10', 'Burp Suite', 'OWASP ZAP', 'Postman', 'Authentication testing', 'CSRF / XSS / SQLi'],
  },
  {
    level: 'Project & lab practice',
    title: 'Network and offensive testing',
    context: 'Used across reconnaissance, protocol analysis, exploit validation, and reporting.',
    skills: ['Nmap', 'Wireshark', 'Metasploit', 'Netcat', 'TCP/IP', 'WireGuard', 'Kali Linux'],
  },
  {
    level: 'Engineering foundation',
    title: 'Automation & secure systems',
    context: 'Used to build repeatable tools, secure applications, and supporting infrastructure.',
    skills: ['Python', 'Flask', 'Bash', 'SQL', 'Linux', 'SQLite', 'REST APIs'],
  },
  {
    level: 'Analysis & communication',
    title: 'Threat modelling and reporting',
    context: 'Used to connect technical evidence with risk, remediation, and stakeholder decisions.',
    skills: ['STRIDE', 'MITRE ATT&CK', 'CVSS', 'Attack surface mapping', 'Executive summaries', 'Remediation guidance'],
  },
  {
    level: 'Developing depth',
    title: 'Red team craft',
    context: 'Continuing hands-on development through labs, research, and purpose-built projects.',
    skills: ['Privilege escalation', 'Post-exploitation', 'Exploit scripting', 'Active Directory basics', 'CTFs'],
  },
]

export default function Skills() {
  return (
    <Section id="skills" title="Capabilities" note="Evidence-based, not percentage-based">
      <Reveal className="capability-intro">
        <p className="section-lead">
          Capability is shown by where I used it: professional exposure, completed builds, controlled labs,
          published analysis, or active development.
        </p>
      </Reveal>

      <div className="capability-grid">
        {CAPABILITIES.map((group, index) => (
          <Reveal as="article" key={group.title} className="capability-card" delay={index % 3}>
            <div className="capability-card-head">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{group.level}</p>
            </div>
            <h3>{group.title}</h3>
            <p className="capability-context">{group.context}</p>
            <ul className="skill-cluster">
              {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
