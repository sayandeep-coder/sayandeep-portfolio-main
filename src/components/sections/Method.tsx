import { useEffect, useRef, useState } from 'react';
import { createParticleWord } from '../../lib/particleWord';

const METHOD_STEPS = [
  {
    step: '01 / boundaries',
    title: 'Boundaries before frameworks',
    body: 'Domain and application logic never import the web framework, the ORM or the LLM vendor. Those are adapters at the edge, so they stay replaceable.',
  },
  {
    step: '02 / state',
    title: 'Durable state is the source of truth',
    body: 'PostgreSQL holds what happened. Redis and queues move work around, but losing a cache is never the same as losing the record.',
  },
  {
    step: '03 / queues',
    title: 'Separate accepting work from doing it',
    body: 'HTTP validates and persists. Queues and workers execute, scale, retry and shut down gracefully on their own terms.',
  },
  {
    step: '04 / observe',
    title: 'Observable by default',
    body: 'Request, worker, agent and task identifiers travel together. Typed errors, health and readiness exist before the first feature does.',
  },
];

const DIAGRAM_LAYERS = [
  { id: 'edge', title: 'Clients & API', desc: 'REST /v1 · validation' },
  { id: 'app', title: 'Application services', desc: 'use cases · transactions' },
  { id: 'domain', title: 'Domain', desc: 'entities · repository contracts' },
  { id: 'exec', title: 'Queue & workers', desc: 'claim · retry · schedule' },
  { id: 'adapters', title: 'Adapters', desc: 'LLM · tools · ORM · cache' },
  { id: 'store', title: 'PostgreSQL', desc: 'source of truth' },
];

const ACTIVE_MAP = [
  ['app', 'domain', 'adapters'],
  ['store'],
  ['edge', 'exec'],
  ['edge', 'app', 'domain', 'exec', 'adapters', 'store'],
];

export function Method() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const cv = canvasRef.current;
    const sec = sectionRef.current;
    if (!cv || !sec) return;

    const pw = createParticleWord(cv, {
      words: ['BOUNDARIES.', 'STATE.', 'QUEUES.', 'OBSERVE.'],
      watch: sec,
      pos: (W, H) => {
        const mob = window.innerWidth < 860;
        return mob
          ? { x: W / 2, y: H * 0.27, maxW: W * 0.9, maxFs: H * 0.16 }
          : { x: W * 0.3, y: H * 0.5, maxW: W * 0.52, maxFs: H * 0.3 };
      },
    });

    const onScroll = () => {
      const r = sec.getBoundingClientRect();
      const maxScroll = sec.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / maxScroll));
      const a = Math.min(METHOD_STEPS.length - 1, Math.floor(p * METHOD_STEPS.length));

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${p})`;
      }

      if (r.top < window.innerHeight && r.bottom > 0) {
        setActiveStep(a);
        pw.set(a);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    return () => {
      pw.destroy();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const activeLayers = ACTIVE_MAP[activeStep] || [];

  return (
    <section className="mt" id="method" ref={sectionRef}>
      <div className="mt-st">
        <canvas id="mw" ref={canvasRef} aria-hidden="true" />

        <div className="mt-lab">
          <span className="eb" data-scr>
            how i build
          </span>
        </div>

        <div className="mt-panel">
          <div className="mt-wrap" id="mcards">
            {METHOD_STEPS.map((m, idx) => (
              <div key={idx} className={`mcard ${idx === activeStep ? 'on' : ''}`}>
                <small>{m.step}</small>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </div>
            ))}
          </div>

          <div className="diag" id="diag">
            {DIAGRAM_LAYERS.map((layer) => (
              <div
                key={layer.id}
                className={`lyr ${activeLayers.includes(layer.id) ? 'on' : ''}`}
                data-l={layer.id}
              >
                <b>{layer.title}</b>
                <span>{layer.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <span className="mono mt-n" id="mtn">
          {activeStep + 1} / {METHOD_STEPS.length}
        </span>

        <div className="mt-bar">
          <i id="mtb" ref={barRef} />
        </div>
      </div>
    </section>
  );
}
