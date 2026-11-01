import { useEffect, useRef, useState } from 'react';
import { createParticleWord, scrambleText } from '../../lib/particleWord';

const SUBTITLES = [
  'Agent runtimes, durable and observable.',
  'Distributed backends, from first schema to production.',
  'Cloud-native platforms the team can operate.',
  'System boundaries designed before frameworks.',
];

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hsRef = useRef<HTMLParagraphElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;

    const pw = createParticleWord(cv, {
      words: ['AGENTS.', 'BACKENDS.', 'PLATFORMS.', 'SYSTEMS.'],
      every: 3800,
      on: (i) => {
        setActiveStep(i);
        if (hsRef.current) {
          scrambleText(hsRef.current, SUBTITLES[i], 700);
        }
      },
      pos: (W, H) => {
        const mob = window.innerWidth < 860;
        return mob
          ? { x: W / 2, y: Math.min(H * 0.31, 285), maxW: W * 0.9, maxFs: Math.min(H * 0.11, 62) }
          : { x: W / 2, y: H * 0.4, maxW: W * 0.9, maxFs: H * 0.4 };
      },
    });

    return () => {
      pw.destroy();
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="top">
      <h1 className="sr">Sayandeep Purkait. I build the infrastructure behind AI products.</h1>
      <canvas id="hw" ref={canvasRef} aria-hidden="true" />

      <div className="hero-top">
        <span className="eb">
          <b>NOW</b> Head of Engineering &amp; Product · Instant Labz Pvt. Ltd.
        </span>
      </div>

      <div className="hero-bot">
        <div className="hb-l">
          <div className="hl" aria-hidden="true">
            <span>I BUILD THE INFRASTRUCTURE BEHIND</span>{' '}
            <em>AI PRODUCTS.</em>
          </div>
          <p className="hs" id="hs" ref={hsRef}>
            {SUBTITLES[0]}
          </p>
          <div className="cta">
            <a
              className="btn p"
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('work');
              }}
            >
              View case studies →
            </a>
            <a className="btn g" href="https://github.com/sayandeep-coder" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a
              className="btn g"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('contact');
              }}
            >
              Contact
            </a>
          </div>
        </div>

        <a
          className="rb"
          href="#orbit"
          aria-label="Scroll down"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('orbit');
          }}
        >
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <defs>
              <path id="rbp" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" />
            </defs>
            <text>
              <textPath href="#rbp" startOffset="0" textLength="272" lengthAdjust="spacing">
                SCROLL · SCROLL · SCROLL · SCROLL ·{' '}
              </textPath>
            </text>
          </svg>
          <b>↓</b>
        </a>
      </div>

      <div className="hprog" id="hprog" aria-hidden="true">
        <span className="mono" id="hpn">
          0{activeStep + 1} / 04
        </span>
        <div className="hp-s">
          {[0, 1, 2, 3].map((stepIdx) => {
            let cls = '';
            if (stepIdx < activeStep) cls = 'done';
            else if (stepIdx === activeStep) cls = 'on';
            return <i key={stepIdx} className={cls} />;
          })}
        </div>
      </div>
    </section>
  );
}
