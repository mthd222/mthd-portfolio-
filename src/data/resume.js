export const profile = {
  name: 'MILAN TEJ H D',
  roles: ['Penetration Tester', 'VAPT Specialist', 'SOC Analyst', 'XDR Developer', 'Security Researcher'],
  location: 'Bengaluru, India',
  phone: '+91 8050675711',
  email: 'milantej02@gmail.com',
  linkedin: 'https://linkedin.com/in/mthd22',
  github: 'https://github.com/mthd222',
  whatsapp: 'https://wa.me/918050675711',
  summary:
    'Cybersecurity intern and VAPT specialist with hands-on experience across SOC operations, threat detection engineering, and offensive security testing. Currently building and operating a SOC lab using Wazuh at Netcradus Pvt Ltd, developing internal security tools, and contributing to an XDR solution. Published security researcher (IJRASET) with expertise in threat modelling, secure system design, and structured vulnerability report writing.',
  availability: 'Immediately available — open to on-site, remote, or hybrid roles.',
}

export const stats = [
  { label: 'Vulnerability classes exploited', value: 15, suffix: '+' },
  { label: 'Network packets analysed', value: 10000, suffix: '+' },
  { label: 'Security controls implemented', value: 20, suffix: '' },
  { label: 'OWASP Top 10 coverage', value: 100, suffix: '%' },
]

export const skillRadar = [
  { axis: 'Pentesting / VAPT', value: 90 },
  { axis: 'Web App Security', value: 88 },
  { axis: 'SOC / SIEM (Wazuh)', value: 85 },
  { axis: 'Threat Modeling', value: 84 },
  { axis: 'Network Security', value: 82 },
  { axis: 'Python / Scripting', value: 80 },
]

export const skillGroups = [
  {
    title: 'SOC & Detection Engineering',
    icon: 'radar',
    skills: ['Wazuh (SIEM/XDR)', 'SOC Lab Setup & Admin', 'Log Collection & Correlation', 'Threat Detection', 'XDR Development', 'Security Tool Development'],
  },
  {
    title: 'Penetration Testing',
    icon: 'crosshair',
    skills: ['VAPT', 'Red Team Exercises', 'Black-box & Grey-box Testing', 'Exploit Development', 'Post-Exploitation', 'Privilege Escalation'],
  },
  {
    title: 'Web Application Security',
    icon: 'globe',
    skills: ['OWASP Top 10', 'SQL Injection', 'XSS', 'CSRF', 'IDOR', 'File Inclusion', 'Broken Authentication', 'Session Hijacking'],
  },
  {
    title: 'Threat Modeling & Analysis',
    icon: 'target',
    skills: ['MITRE ATT&CK', 'STRIDE', 'CVE/CVSS Scoring', 'Attack Surface Mapping', 'Risk Prioritisation'],
  },
  {
    title: 'Security Arsenal',
    icon: 'tool',
    skills: ['Burp Suite', 'Nmap', 'Metasploit', 'Wireshark', 'Nikto', 'Dirb', 'Netcat', 'OWASP ZAP', 'Postman'],
  },
  {
    title: 'Network Security',
    icon: 'network',
    skills: ['TCP/IP', 'OSI Model (L2–L7)', 'Packet Capture & Analysis', 'Protocol Forensics', 'TLS/SSL', 'WireGuard VPN'],
  },
  {
    title: 'Programming & Platforms',
    icon: 'code',
    skills: ['Python (exploits & automation)', 'Bash', 'SQL', 'Kali Linux', 'Ubuntu', 'Windows Server', 'VMware / VirtualBox', 'Active Directory'],
  },
  {
    title: 'Reporting',
    icon: 'doc',
    skills: ['Vulnerability Reports', 'Executive Summaries', 'CVSS Risk Ratings', 'Remediation Recommendations'],
  },
]

export const experience = [
  {
    role: 'Cyber Security Intern',
    company: 'Netcradus Pvt Ltd',
    period: 'May 2026 – Present',
    current: true,
    points: [
      'Set up and configured a SOC lab using Wazuh — centralized log collection, correlation rules, and real-time alerting for endpoint and network monitoring.',
      'Developed custom security tools to support SOC workflows, improving detection efficiency and analyst response time.',
      'Building an XDR (Extended Detection and Response) solution — detection logic, alert correlation, and automated response across multiple telemetry sources.',
    ],
  },
  {
    role: 'Full Stack Web Development Intern',
    company: 'Dream Buzz Solutions',
    period: 'Feb 2024 – Mar 2024',
    current: false,
    points: [
      'Identified and remediated 5 high-severity vulnerabilities (SQL injection, XSS) by applying OWASP secure coding standards.',
      'Conducted structured vulnerability assessments on 3 web interfaces with CVSS-rated findings reports.',
      'Reduced injection attack surface to zero critical findings on re-test via parameterised queries and input validation.',
    ],
  },
]

export const research = {
  title: 'Comparative Security Analysis of RDP and VNC with WireGuard VPN Implementation',
  journal: 'IJRASET — International Journal for Research in Applied Science & Engineering Technology',
  date: 'Mar 2026',
  points: [
    'Executed threat modeling on RDP and VNC protocols, identifying 3 critical attack vectors including plaintext credential exposure in VNC sessions across a controlled 4-VM lab.',
    'Captured and analysed 10,000+ packets with Wireshark to quantify the RDP TLS vs VNC plaintext security gap — threat surface reduced 100% with WireGuard encapsulation.',
    'Published a structured security report with CVSS-based risk ratings, exploit impact analysis, and prioritised remediation in a peer-reviewed international journal.',
  ],
}

export const projects = [
  {
    name: 'Automated Privacy Policy Detection & Compliance Analysis',
    tag: 'Final Year MCA Project · 2026',
    severity: 'CRITICAL',
    tech: ['Chrome Extension (MV3)', 'Flask', 'NLP', 'DistilBART', 'GDPR', 'DPDP Act'],
    points: [
      'Chrome extension + Flask backend that auto-detects privacy policy links via DOM scanning and delivers real-time NLP summarisation at the point of consent.',
      'Three-level NLP pipeline and rule-based risk engine covering 8 GDPR + 5 DPDP Act 2023 compliance dimensions with cited evidence and confidence scoring.',
      'Evaluated on 62 real-world policies across 10 sectors — 93.2% precision / 94.8% recall; exposed a 90.3% failure rate in data retention disclosure.',
    ],
  },
  {
    name: 'Secure Authentication System',
    tag: 'Cybersecurity Project · Jun 2026',
    severity: 'HIGH',
    tech: ['Flask', 'SQLite', 'TOTP / pyotp', 'PBKDF2', 'OWASP ZAP'],
    points: [
      'Full-stack auth system implementing 20 security controls with full OWASP Top 10 coverage.',
      'TOTP 2FA (RFC 6238) with QR enrollment + email OTP fallback, PBKDF2-HMAC-SHA256 hashing, CSRF protection, CSP and hardened response headers.',
      'Brute-force lockout, 10-minute session TTL, HttpOnly/SameSite cookies, fixation prevention, and IP-stamped audit logging — validated across 9 attack scenarios.',
    ],
  },
  {
    name: 'Automated Web Application Security Scanner',
    tag: 'Personal Project · Jan – Apr 2025',
    severity: 'HIGH',
    tech: ['Python', 'OWASP Top 10', 'Recon Automation', 'Exploit Modules'],
    points: [
      'Python VAPT tool detecting 8 OWASP Top 10 vulnerability categories (SQLi, XSS, IDOR) across 5 test applications.',
      'Cut manual pentesting time ~60% by scripting recon, scanning, and exploit validation into one repeatable pipeline.',
      'Custom exploit modules for SQL injection and authentication bypass — core exploit development for red team engagements.',
    ],
  },
  {
    name: 'Code4You — Secure Coding Contest Platform',
    tag: 'Academic Project · Jun – Oct 2024',
    severity: 'MEDIUM',
    tech: ['Full Stack', 'RBAC', 'Razorpay', 'TLS', 'PCI-DSS'],
    points: [
      'Hardened a full-stack platform against OWASP Top 10, eliminating 6 identified vulnerabilities via parameterised queries, RBAC, and secure sessions.',
      'Integrated Razorpay payments with TLS encryption for 200+ registered users, aligned with PCI-DSS transaction security.',
    ],
  },
]

export const education = [
  {
    degree: 'Master of Computer Applications (MCA)',
    school: 'MS Ramaiah Institute of Technology, Bangalore',
    period: 'Aug 2024 – Jul 2026',
    score: 'CGPA 9.56 / 10',
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    school: 'De Paul College, Mysore',
    period: 'Jun 2021 – May 2024',
    score: 'CGPA 9.1 / 10',
  },
]

export const certifications = [
  { name: 'Cybersecurity and Ethical Hacking', issuer: 'Boston Institute of Analytics' },
]

export const interests = [
  'CTF — TryHackMe / HackTheBox',
  'Bug Bounty — HackerOne / Bugcrowd',
  'SOC Operations',
  'Red Team Research',
  'Exploit Development',
]

export const languages = ['English (Professional)', 'Kannada (Native)', 'Hindi (Conversational)']
