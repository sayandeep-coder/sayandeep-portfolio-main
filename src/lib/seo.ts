import { CONTACT_INFO } from '../data/navigation';
import type { CaseStudy } from '../types/portfolio';

export interface PageSEO {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  jsonLd?: Record<string, unknown>;
}

export const DEFAULT_SEO: PageSEO = {
  title: 'Sayandeep Purkait — Tech Lead & AI Engineer',
  description:
    'Technical Team Lead and AI systems engineer. Agent runtimes, distributed backends and cloud-native platforms, from first schema to production.',
  canonicalPath: '/',
  ogType: 'website',
  ogImage: `${CONTACT_INFO.siteUrl}/sayandeep.png`,
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sayandeep Purkait',
    jobTitle: 'Technical Team Lead & AI Engineer',
    image: `${CONTACT_INFO.siteUrl}/sayandeep.png`,
    worksFor: {
      '@type': 'Organization',
      name: 'Secondz',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mumbai',
      addressCountry: 'India',
    },
    email: CONTACT_INFO.email,
    sameAs: [
      CONTACT_INFO.github,
      CONTACT_INFO.linkedin,
      CONTACT_INFO.agentforgeRepo,
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'AI Agent Runtimes',
      'Distributed Systems',
      'Cloud-Native Architectures',
      'Go',
      'Python',
      'TypeScript',
      'PostgreSQL',
      'System Architecture',
    ],
  },
};

export function getCaseStudySEO(caseStudy: CaseStudy): PageSEO {
  const isCode = Boolean(caseStudy.repo);
  const type = isCode ? 'SoftwareApplication' : 'TechArticle';

  const schemaData: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': type,
    name: caseStudy.name,
    headline: caseStudy.title,
    description: caseStudy.lede,
    image: `${CONTACT_INFO.siteUrl}/sayandeep.png`,
    author: {
      '@type': 'Person',
      name: 'Sayandeep Purkait',
      url: CONTACT_INFO.siteUrl,
    },
    about: caseStudy.cat,
    keywords: caseStudy.stack.join(', '),
  };

  if (caseStudy.repo) {
    schemaData.codeRepository = caseStudy.repo;
    schemaData.programmingLanguage = caseStudy.stack;
  }

  return {
    title: `${caseStudy.name} — Case study · Sayandeep Purkait`,
    description: caseStudy.card,
    canonicalPath: `/case-studies/${caseStudy.id}`,
    ogType: 'article',
    ogImage: `${CONTACT_INFO.siteUrl}/sayandeep.png`,
    jsonLd: schemaData,
  };
}

export function get404SEO(): PageSEO {
  return {
    title: '404: Page Not Found — Sayandeep Purkait',
    description: 'The requested page could not be found. Return to Sayandeep Purkait portfolio homepage.',
    canonicalPath: '/404',
    ogImage: `${CONTACT_INFO.siteUrl}/sayandeep.png`,
  };
}
