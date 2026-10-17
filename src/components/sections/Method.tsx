import { useEffect, useRef, useState } from 'react';
import { ARCHITECTURE_LAYERS, METHOD_RULES } from '../../data/method';
import { cn, prefersReducedMotion } from '../../lib/utils';
import { Eyebrow } from '../ui/Badge';

export function Method() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      if (window.innerWidth <= 980) {
        setIsMobile(true);
        ticking = false;
        return;
      }
      setIsMobile(false);

      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Only calculate if the sticky container is in view
      if (r.top <= 0 && r.bottom >= vh) {
        const scrollDistance = r.height - vh;
        const progress = Math.min(0.9999, Math.max(0, -r.top / scrollDistance));
        const step = Math.min(3, Math.floor(progress * 4));
        setActiveStep(step);
      } else if (r.top > 0) {
        setActiveStep(0);
      } else if (r.bottom < vh) {
        setActiveStep(3);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    onScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleStepClick = (idx: number) => {
    setActiveStep(idx);
    const el = sectionRef.current;
    if (el && window.innerWidth > 980) {
      const vh = window.innerHeight;
      const scrollDistance = el.offsetHeight - vh;
      const sectionTop = el.getBoundingClientRect().top + window.scrollY;
      const targetScroll = sectionTop + (idx / 4) * scrollDistance + 15;

      window.scrollTo({
        top: targetScroll,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      });
    }
  };

  const currentRule = METHOD_RULES[activeStep];
  const highlightedLayers = currentRule?.highlightLayers || [];

  return (
    <section className="page active" id="method" ref={sectionRef}>
      <div className="wrap">
        <div className="pg">
          <div className="m-grid">
            <div>
              <Eyebrow className="it">How I build</Eyebrow>
              <h2 className="grad it">
                Four rules in <mark>every system</mark>.
              </h2>

              <div className="m-steps it">
                {METHOD_RULES.map((rule, idx) => {
                  const isActive = isMobile || idx === activeStep;
                  return (
                    <div
                      key={rule.number}
                      className={cn('m-step', isActive && 'on')}
                      onClick={() => handleStepClick(idx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleStepClick(idx);
                        }
                      }}
                      aria-pressed={isActive}
                    >
                      <h3>
                        <small>{rule.number}</small>
                        {rule.title}
                      </h3>
                      <p>{rule.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Architecture Diagram Visualization */}
            <div className="diag it">
              <div className="diag-h">
                <span>System shape</span>
                <span id="dstep">
                  0{activeStep + 1} / 04
                </span>
              </div>

              {ARCHITECTURE_LAYERS.map((layer) => {
                const isLit = isMobile || highlightedLayers.includes(layer.id);
                return (
                  <div
                    key={layer.id}
                    className={cn(
                      'lyr',
                      layer.isExternal && 'ext',
                      isLit && 'on'
                    )}
                  >
                    <strong>{layer.title}</strong>
                    <span>{layer.subtitle}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
