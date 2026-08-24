export const site = {
  name: 'Abod',
  formalName: 'Abdulqader Mohammed',
  title: 'Software Engineer & Content Creator',
  description:
    'Abod is a senior software engineer, founder, and creator building useful products and teaching what he learns.',
  url: 'https://abod.dev',
  email: 'hello@abod.dev',
  location: 'Cairo, Egypt',
  socials: {
    youtube: 'https://www.youtube.com/@abodbtw',
    x: 'https://x.com/OneAbodFTW',
    linkedin: 'https://www.linkedin.com/in/abdulqader-mohammed-ba5573196/',
    github: 'https://github.com/OneAbodFTW'
  }
} as const

export type Project = {
  name: string
  url: string
  label: string
  statement: string
  description: string
  role: string
  tags: string[]
  image: string
  imageAlt: string
  accent: 'blue' | 'orange' | 'ink'
}

export const projects: Project[] = [
  {
    name: 'Proicon',
    url: 'https://proicon.ai',
    label: 'AI BRAND SYSTEM',
    statement: 'A logo studio that starts with language, not templates.',
    description:
      'Proicon turns a plain-English brand brief into original logo directions, editable assets, and complete export-ready brand kits.',
    role: 'Founder · Product & engineering',
    tags: ['Generative AI', 'Design tooling', 'SaaS'],
    image: '/projects/proicon.png',
    imageAlt: 'Proicon AI logo designer interface',
    accent: 'blue'
  },
  {
    name: 'ClawFleet',
    url: 'https://clawfleet.dev',
    label: 'MANAGED AI OPERATIONS',
    statement: 'A fully managed AI employee, configured for the business.',
    description:
      'ClawFleet removes the infrastructure work from running OpenClaw by handling setup, hosting, integrations, monitoring, and maintenance.',
    role: 'Product · Platform engineering',
    tags: ['OpenClaw', 'Infrastructure', 'Automation'],
    image: '/projects/clawfleet.png',
    imageAlt: 'ClawFleet managed AI employee product page',
    accent: 'orange'
  },
  {
    name: 'AqarLoata',
    url: 'https://aqarloata.com',
    label: 'ARABIC PROPERTY MARKETPLACE',
    statement: 'Owner-listed property opportunities, built for how Egypt buys.',
    description:
      'لؤطة is an Arabic-first marketplace where owners list for free and buyers unlock verified property details one opportunity at a time.',
    role: 'Product · Full-stack engineering',
    tags: ['Marketplace', 'Arabic UX', 'Property tech'],
    image: '/projects/aqarloata.png',
    imageAlt: 'AqarLoata Arabic property marketplace',
    accent: 'ink'
  }
]

export type Experience = {
  company: string
  role: string
  period: string
  description: string
  highlights?: string[]
  current?: boolean
}

export const experience: Experience[] = [
  {
    company: 'Proicon',
    role: 'Founder',
    period: 'Sep 2024 — Present',
    description:
      'Building an AI-native logo and brand-kit product from product strategy through engineering and go-to-market.',
    current: true
  },
  {
    company: 'Snippet Digital',
    role: 'Senior Software Engineer',
    period: 'May 2022 — Present',
    description:
      'Designing and shipping software systems, solving complex backend problems, reviewing architecture, and mentoring engineers.',
    current: true
  },
  {
    company: 'Upwork',
    role: 'Full-stack Python Web Developer',
    period: 'Apr 2019 — Present',
    description:
      'Helping businesses turn operational problems into focused web applications using Python and JavaScript.',
    current: true
  },
  {
    company: 'Simple.ink',
    role: 'Full-stack Developer · Tech Lead',
    period: 'Nov 2021 — Nov 2022',
    description:
      'Worked across product infrastructure, subscriptions, crawling, testing, and delivery for a large-scale website builder.',
    highlights: [
      'Reduced site builds from 2–3 minutes to under 10 seconds',
      'Built sitemap and pretty-URL crawling for 8,000+ websites',
      'Implemented subscription management and improved CI/CD'
    ]
  },
  {
    company: 'Snippet Digital',
    role: 'Full-stack Developer',
    period: 'Sep 2020 — May 2022',
    description:
      'Built web tools and connected internal workflows that made SEO research and reporting more efficient.'
  },
  {
    company: 'Autaway',
    role: 'Software Engineer',
    period: 'Oct 2019 — Mar 2020',
    description:
      'Helped shape the architecture and automation tooling for an end-to-end office operations product.'
  }
]

export type Video = {
  title: string
  url: string
  eyebrow: string
  language: 'English' | 'Arabic'
  index: string
}

export const videos: Video[] = [
  {
    title: 'Setting up OpenClaw with Discord',
    url: 'https://www.youtube.com/watch?v=VnhYd02JP8w',
    eyebrow: 'Agents · practical setup',
    language: 'English',
    index: '01'
  },
  {
    title: 'Tailwind CSS course — episode one',
    url: 'https://www.youtube.com/watch?v=g7YM3KcR7fY',
    eyebrow: 'Frontend · course',
    language: 'Arabic',
    index: '02'
  },
  {
    title: 'Solving Diagonal Difference with Python',
    url: 'https://www.youtube.com/watch?v=TeP6fJyWHos',
    eyebrow: 'Python · problem solving',
    language: 'English',
    index: '03'
  }
]
