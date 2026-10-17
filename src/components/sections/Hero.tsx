import { useState, useEffect } from 'react';
import { CONTACT_INFO } from '../../data/navigation';
import { prefersReducedMotion, scrollToSection } from '../../lib/utils';
import { GridBackground } from '../effects/GridBackground';
import { ArrowRightIcon } from '../ui/Button';

interface LogLine {
  text: string;
  meta: string;
  stateIdx: number;
  isOk?: boolean;
}

const LOG_EVENTS: LogLine[] = [
  { text: 'task.created', meta: 'agent=researcher priority=normal', stateIdx: 0 },
  { text: 'task.persisted', meta: 'store=postgres', stateIdx: 0 },
  { text: 'queue.publish', meta: 'backend=redis stream=tasks', stateIdx: 1 },
  { text: 'worker.claim', meta: 'worker=w-03', stateIdx: 2 },
  { text: 'step.run', meta: 'tool=web.search', stateIdx: 3 },
  { text: 'step.run', meta: 'llm=provider-port', stateIdx: 3 },
  { text: 'task.completed', meta: 'status=succeeded', stateIdx: 4, isOk: true },
];

const STATES = ['Created', 'Queued', 'Claimed', 'Running', 'Succeeded'];

export function Hero() {
  const [activeLogs, setActiveLogs] = useState<LogLine[]>(() =>
    prefersReducedMotion() ? LOG_EVENTS : []
  );
  const [currentStateIdx, setCurrentStateIdx] = useState<number>(() =>
    prefersReducedMotion() ? 4 : -1
  );

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let logIndex = 0;
    let timer: ReturnType<typeof setTimeout>;

    const step = () => {
      const nextLog = LOG_EVENTS[logIndex];
      setActiveLogs((prev) => [...prev, nextLog]);
      setCurrentStateIdx(nextLog.stateIdx);
      logIndex++;

      if (logIndex >= LOG_EVENTS.length) {
        logIndex = 0;
        timer = setTimeout(() => {
          setActiveLogs([]);
          setCurrentStateIdx(-1);
          step();
        }, 3200);
      } else {
        timer = setTimeout(step, 780);
      }
    };

    // Initial delay before logs begin
    const initialDelay = setTimeout(() => {
      step();
    }, 800);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="page hero active" id="top">
      <GridBackground />
      <div className="wrap">
        <div className="grid">
          <div>
            <div className="badge it">
              <b>NOW</b>
              <span>{CONTACT_INFO.roleCurrent}</span>
            </div>

            <h1 className="grad it">
              I build the infrastructure behind <span className="accent">AI products.</span>
            </h1>

            <p className="lede it">
              Agent runtimes, distributed backends and cloud-native platforms, from first schema to production. I lead the engineering, design the system boundaries, and ship what the team operates. <strong>{CONTACT_INFO.location}.</strong>
            </p>

            <div className="cta-row it">
              <button
                type="button"
                className="btn p"
                onClick={() => scrollToSection('work')}
              >
                View case studies <ArrowRightIcon />
              </button>
              <a
                className="btn g"
                href={CONTACT_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <button
                type="button"
                className="btn g"
                onClick={() => scrollToSection('contact')}
              >
                Contact
              </button>
            </div>
          </div>

          {/* Interactive System Terminal */}
          <div className="win it" id="win" aria-hidden="true">
            <div className="win-bar">
              <i />
              <i />
              <i />
              <span>agentforge &middot; task lifecycle</span>
              <em>illustrative</em>
            </div>

            <div className="win-body">
              <div className="states">
                <h4>State</h4>
                {STATES.map((name, idx) => {
                  const isDone = idx < currentStateIdx;
                  const isNow = idx === currentStateIdx;
                  const isFin = idx === STATES.length - 1;
                  const stateClass = [
                    'st',
                    isDone ? 'done' : '',
                    isNow ? 'now' : '',
                    isFin ? 'fin' : '',
                  ]
                    .filter(Boolean)
                    .join(' ');

                  return (
                    <div key={name} className={stateClass}>
                      {name}
                    </div>
                  );
                })}
              </div>

              <div className="logbox" id="log">
                {activeLogs.map((log, index) => (
                  <div
                    key={index}
                    className={`logl ${log.isOk ? 'ok' : ''}`}
                    style={{ opacity: 1, transform: 'none' }}
                  >
                    <b>{log.text}</b>
                    <em>{log.meta}</em>
                  </div>
                ))}
                <span className="cursor" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="scrollcue">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  );
}
