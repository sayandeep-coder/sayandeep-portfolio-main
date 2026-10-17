export interface CaseStudyPageItem {
  t?: string;
  d?: string;
  n?: string;
}

export interface CaseStudyComparisonSide {
  s: string;
  t: string;
  p: string;
}

export interface CaseStudyPageData {
  k: 'two' | 'list' | 'chips' | 'steps' | 'cards' | 'ticks' | 'vs' | 'stats' | 'outcome';
  l: string;
  h: string;
  p?: string | string[];
  list?: string[];
  chips?: string[];
  steps?: Array<[string, string?]>;
  cols?: number;
  items?: CaseStudyPageItem[] | string[];
  note?: string;
  a?: CaseStudyComparisonSide;
  b?: CaseStudyComparisonSide;
  stats?: Array<[string, string]>;
}

export interface CaseStudy {
  id: string;
  n: string;
  name: string;
  title: string;
  cat: string;
  yr: string;
  rt: string;
  group: 'sys' | 'wr';
  card: string;
  lede: string;
  role: string;
  status: string;
  repo: string | null;
  site?: string | null;
  stack: string[];
  pages: CaseStudyPageData[];
}

export interface MetricItem {
  number: number;
  suffix?: string;
  description: string;
}

export interface MethodRule {
  number: string;
  title: string;
  description: string;
  highlightLayers: string[];
}

export interface ArchitectureLayer {
  id: string;
  title: string;
  subtitle: string;
  isExternal?: boolean;
}

export interface ExperienceRole {
  company: string;
  initial: string;
  logoUrl?: string;
  badge: string;
  isCurrent?: boolean;
  colors: {
    c1: string;
    c2: string;
  };
  role: string;
  meta: string;
  bullets: string[];
  chips: string[];
  ladder?: Array<{
    period: string;
    location: string;
    title: string;
    description: string;
    isTop?: boolean;
  }>;
}

export interface SkillItem {
  name: string;
  iconSlug?: string | null;
  iconFallback?: string;
  invertOnLight?: boolean;
  iconColor?: string;
}

export interface SkillCategory {
  category: string;
  skills: SkillItem[];
}
