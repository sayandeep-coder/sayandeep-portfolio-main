import { SEOHead } from '../components/ui/SEOHead';
import { Hero } from '../components/sections/Hero';
import { Approach } from '../components/sections/Approach';
import { Metrics } from '../components/sections/Metrics';
import { Method } from '../components/sections/Method';
import { CaseStudies } from '../components/sections/CaseStudies';
import { Writing } from '../components/sections/Writing';
import { Experience } from '../components/sections/Experience';
import { TechStack } from '../components/sections/TechStack';
import { DEFAULT_SEO } from '../lib/seo';

export function HomePage() {
  return (
    <main id="home">
      <SEOHead seo={DEFAULT_SEO} />
      <Hero />
      <Approach />
      <Metrics />
      <Method />
      <CaseStudies />
      <Writing />
      <Experience />
      <TechStack />
    </main>
  );
}
