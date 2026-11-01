import { useState, useEffect } from 'react';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export function Navbar({ onToggleTheme }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['method', 'work', 'experience', 'orbit', 'contact'];
      let cur = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) {
          cur = id;
        }
      }
      setActiveSection(cur);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header className="nav" id="nav">
      <a
        href="#top"
        className="brand"
        onClick={(e) => {
          e.preventDefault();
          scrollTo('top');
        }}
      >
        <img src="/sayandeep.png" alt="Sayandeep Purkait" className="brand-logo" />
        <span>Sayandeep Purkait</span>
      </a>

      <nav className={`menu ${menuOpen ? 'open' : ''}`} id="menu" aria-label="Primary">
        <a
          href="#method"
          className={activeSection === 'method' ? 'on' : ''}
          onClick={(e) => {
            e.preventDefault();
            scrollTo('method');
          }}
        >
          Method
        </a>
        <a
          href="#work"
          className={activeSection === 'work' ? 'on' : ''}
          onClick={(e) => {
            e.preventDefault();
            scrollTo('work');
          }}
        >
          Case studies
        </a>
        <a
          href="#experience"
          className={activeSection === 'experience' ? 'on' : ''}
          onClick={(e) => {
            e.preventDefault();
            scrollTo('experience');
          }}
        >
          Experience
        </a>
        <a
          href="#orbit"
          className={activeSection === 'orbit' ? 'on' : ''}
          onClick={(e) => {
            e.preventDefault();
            scrollTo('orbit');
          }}
        >
          Stack
        </a>
        <a
          href="#contact"
          className={activeSection === 'contact' ? 'on' : ''}
          onClick={(e) => {
            e.preventDefault();
            scrollTo('contact');
          }}
        >
          Contact
        </a>
      </nav>

      <div className="nav-r">
        <button
          className="theme"
          id="theme"
          aria-label="Toggle light and dark mode"
          onClick={onToggleTheme}
        >
          <svg className="sn" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
          <svg className="mn" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
          </svg>
        </button>

        <a
          href="#contact"
          className="btn p sm"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('contact');
          }}
        >
          Get in touch
        </a>

        <button
          className="burger"
          id="burger"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Menu
        </button>
      </div>
    </header>
  );
}
