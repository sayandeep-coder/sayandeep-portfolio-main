import type { ExperienceRole } from '../types/portfolio';

export interface GanttItem {
  company: string;
  leftPercent: number;
  widthPercent: number;
  label: string;
  delay: string;
  colorClass: string;
  isCurrent?: boolean;
}

export const GANTT_AXIS: Array<{ label: string; offsetPercent: number }> = [
  { label: 'Jun 25', offsetPercent: 0 },
  { label: 'Sep 25', offsetPercent: (3 / 17) * 100 },
  { label: 'Dec 25', offsetPercent: (6 / 17) * 100 },
  { label: 'Mar 26', offsetPercent: (9 / 17) * 100 },
  { label: 'Jun 26', offsetPercent: (12 / 17) * 100 },
  { label: 'Sep 26', offsetPercent: (15 / 17) * 100 },
];

export const GANTT_DATA: GanttItem[] = [
  {
    company: 'Secondz',
    leftPercent: 94.12,
    widthPercent: 5.88,
    label: 'Oct 2026 — Present',
    delay: '1.1s',
    colorClass: 'b1',
    isCurrent: true,
  },
  {
    company: 'Khwaaish',
    leftPercent: 17.65,
    widthPercent: 76.47,
    label: 'Sep 2025 — Sep 2026 · 1 yr 1 mo',
    delay: '0.7s',
    colorClass: 'b2',
  },
  {
    company: 'Eastri',
    leftPercent: 0,
    widthPercent: 35.29,
    label: 'Jun 2025 — Nov 2025 · 6 mos',
    delay: '0.3s',
    colorClass: 'b3',
  },
];

export const EXPERIENCES: ExperienceRole[] = [
  {
    company: 'Secondz',
    initial: 'S',
    logoUrl: '/logos/secondz.png',
    badge: 'Current',
    isCurrent: true,
    colors: {
      c1: '#5d8f80',
      c2: '#2f5a50',
    },
    role: 'Technical Team Lead',
    meta: 'Full-time · Oct 2026 — Present · Mumbai, Remote',
    bullets: [
      'Architected an <mark>AI-powered document-to-output backend</mark>.',
      'Combined <mark>LLM extraction with deterministic, auditable decision rules</mark> for reliable results.'
    ],
    chips: ['LLM extraction', 'Decision rules', 'Document AI', 'Backend architecture']
  },
  {
    company: 'Khwaaish',
    initial: 'K',
    logoUrl: '/logos/khwaaish.png',
    badge: '1 yr 1 mo',
    isCurrent: false,
    colors: {
      c1: '#ef4444',
      c2: '#f97316',
    },
    role: 'Tech Lead — AI Engineer (Founding Team)',
    meta: 'Full-time · Sep 2025 — Sep 2026 · Mumbai, Hybrid',
    bullets: [
      'Contributed to the founding team, building an <mark>AI-driven platform that simplifies ordering and booking</mark>.',
      'Owned end-to-end engineering and delivered <mark>two production-ready products</mark>, with scalable backends and AI-driven automation workflows.',
      'Designed cloud infrastructure and led a cross-functional team from product design through deployment.'
    ],
    chips: ['Generative AI', 'LLMs', 'LangGraph', 'Flutter', 'Python', 'Next.js', 'PostgreSQL', 'Celery', 'AWS']
  },
  {
    company: 'Eastri',
    initial: 'E',
    logoUrl: '/logos/eastri.png',
    badge: '6 mos',
    isCurrent: false,
    colors: {
      c1: '#2a86c6',
      c2: '#123f6b',
    },
    role: 'Intern to founding-team Tech Lead',
    meta: 'Full-time · Jun 2025 — Nov 2025',
    bullets: [],
    chips: ['Flutter', 'Node.js', 'PostgreSQL', 'Prisma', 'JWT', 'Razorpay', 'Team leadership'],
    ladder: [
      {
        period: 'Jun 2025',
        location: 'Remote',
        title: 'Flutter Developer',
        description: 'Started as an intern on cross-platform app development for real-world projects.'
      },
      {
        period: 'Aug 2025',
        location: 'Remote',
        title: 'Lead Software Developer',
        description: 'Built scalable software across teams. Shipped Partner and Consumer apps with Razorpay payments and OTP + JWT auth.'
      },
      {
        period: 'Sep 2025',
        location: 'Hybrid',
        title: 'Tech Lead <mark>(founding team)</mark>',
        description: 'Drove design and development of scalable, user-focused software, from hands-on coding to guiding the team.',
        isTop: true
      }
    ]
  }
];
