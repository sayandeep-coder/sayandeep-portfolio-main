import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAV_LINKS, CONTACT_INFO } from '../../data/navigation';
import { useActiveSection } from '../../hooks/useActiveSection';
import type { Theme } from '../../hooks/useTheme';
import { cn, scrollToSection } from '../../lib/utils';
import { ThemeToggle } from '../ui/ThemeToggle';

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const activeNav = useActiveSection();
  const isHomePage = location.pathname === '/';

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleNavClick = (targetId: string) => {
    setIsOpen(false);
    if (!isHomePage) {
      navigate('/');
      // Delay slightly for homepage render
      setTimeout(() => {
        scrollToSection(targetId);
      }, 100);
    } else {
      scrollToSection(targetId);
    }
  };

  const handleBrandClick = () => {
    setIsOpen(false);
    if (!isHomePage) {
      navigate('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className={cn('nav', isOpen && 'open')} id="nav">
      <button
        type="button"
        className="brand"
        onClick={handleBrandClick}
        aria-label="Sayandeep Purkait - Return to top"
      >
        <img src="/sayandeep.png" alt="Sayandeep Purkait" className="brand-logo" />
        <span>{CONTACT_INFO.name}</span>
      </button>

      <nav className="menu" id="menu" aria-label="Primary navigation">
        {NAV_LINKS.map((link) => {
          const isActive = isHomePage && activeNav === link.targetId;
          return (
            <button
              key={link.targetId}
              type="button"
              className={cn(isActive && 'on')}
              onClick={() => handleNavClick(link.targetId)}
            >
              {link.label}
            </button>
          );
        })}
      </nav>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <button
          type="button"
          onClick={() => handleNavClick('contact')}
          className="pill-btn"
        >
          Get in touch
        </button>
        <button
          type="button"
          className="burger"
          id="burger"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>
      </div>
    </header>
  );
}
