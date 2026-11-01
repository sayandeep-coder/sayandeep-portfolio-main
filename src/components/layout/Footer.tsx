import { useEffect, useRef } from 'react';
import { createParticleWord } from '../../lib/particleWord';

export function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    const sec = sectionRef.current;
    if (!cv || !sec) return;

    const pw = createParticleWord(cv, {
      words: ['HELLO.'],
      watch: sec,
      pos: (W, H) => {
        const ctIn = contentRef.current;
        const ctTop = ctIn ? ctIn.offsetTop : H * 0.45;
        // Available space strictly above the text content
        const availH = Math.max(ctTop - 20, 160);
        const centerY = availH * 0.5;
        const maxFs = Math.min(availH * 0.5, W * 0.16, 160);
        return {
          x: W / 2,
          y: Math.max(80, centerY),
          maxW: Math.min(W * 0.85, 1050),
          maxFs,
        };
      },
    });

    return () => {
      pw.destroy();
    };
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="ct" id="contact" ref={sectionRef}>
      <canvas id="cw" ref={canvasRef} aria-hidden="true" />

      <div className="ct-in" ref={contentRef}>
        <span className="eb" data-scr>
          contact
        </span>
        <h2>
          Building something that has to <mark>work in production</mark>?
        </h2>
        <p>I am happy to talk architecture, AI infrastructure and engineering leadership.</p>
        <a className="btn p" href="mailto:sayandeeppurkait789@gmail.com">
          sayandeeppurkait789@gmail.com →
        </a>

        <div className="ct-l">
          <a href="https://github.com/sayandeep-coder" target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
          <a href="https://www.linkedin.com/in/sayandeeppurkait/" target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
          <a href="https://github.com/sayandeep-coder/agentforge" target="_blank" rel="noopener noreferrer">
            AgentForge ↗
          </a>
        </div>

        <div className="copy">
          <span>© 2026 Sayandeep Purkait · Mumbai, India</span>
          <a href="#top" onClick={scrollToTop}>
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
