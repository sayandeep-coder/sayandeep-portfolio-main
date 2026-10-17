import { useEffect, useState } from 'react';

const NAV_MAP: Record<string, string> = {
  top: 'top',
  manifesto: 'top',
  numbers: 'top',
  method: 'method',
  work: 'work',
  writing: 'work',
  experience: 'experience',
  stack: 'stack',
  contact: 'contact',
};

const SECTION_IDS = [
  'top',
  'manifesto',
  'numbers',
  'method',
  'work',
  'writing',
  'experience',
  'stack',
  'contact',
];

export function useActiveSection(): string {
  const [activeNav, setActiveNav] = useState<string>('top');

  useEffect(() => {
    let ticking = false;

    const checkActive = () => {
      const vh = window.innerHeight;
      let currentSection: string | null = null;

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= vh * 0.45) {
            currentSection = NAV_MAP[id] || id;
          }
        }
      }

      if (currentSection) {
        setActiveNav(currentSection);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(checkActive);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    checkActive();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return activeNav;
}
