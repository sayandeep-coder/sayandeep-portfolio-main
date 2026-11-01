import { useState, useEffect } from 'react';
import { AuroraBackground } from '../components/effects/AuroraBackground';
import { Hero } from '../components/sections/Hero';
import { OrbitStack } from '../components/sections/OrbitStack';
import { Approach } from '../components/sections/Approach';
import { Metrics } from '../components/sections/Metrics';
import { Method } from '../components/sections/Method';
import { CaseStudies } from '../components/sections/CaseStudies';
import { Experience } from '../components/sections/Experience';
import { CaseDrawer } from '../features/case-studies/CaseDrawer';

export function HomePage() {
  const [activeCaseId, setActiveCaseId] = useState<string | null>(() => {
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#case-')) {
      return window.location.hash.slice(6);
    }
    return null;
  });

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash.startsWith('#case-')) {
        const id = window.location.hash.slice(6);
        setActiveCaseId(id);
      } else if (!window.location.hash.includes('case-')) {
        setActiveCaseId(null);
      }
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleOpenCase = (id: string) => {
    setActiveCaseId(id);
    try {
      history.replaceState(null, '', `#case-${id}`);
    } catch {
      // ignore
    }
  };

  const handleCloseCase = () => {
    setActiveCaseId(null);
    try {
      history.replaceState(null, '', '#work');
    } catch {
      // ignore
    }
  };

  return (
    <>
      <AuroraBackground />
      <Hero />
      <OrbitStack />
      <Approach />
      <Metrics />
      <Method />
      <CaseStudies onOpenCase={handleOpenCase} />
      <Experience />
      <CaseDrawer
        activeCaseId={activeCaseId}
        onClose={handleCloseCase}
        onSelectCase={handleOpenCase}
      />
    </>
  );
}
