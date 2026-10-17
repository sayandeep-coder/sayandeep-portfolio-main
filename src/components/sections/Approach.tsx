import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../lib/utils';
import { Eyebrow } from '../ui/Badge';

interface WordItem {
  text: string;
  isKey?: boolean;
}

const MANIFESTO_WORDS: WordItem[] = [
  { text: 'Most' }, { text: 'AI' }, { text: 'products' }, { text: 'fail' }, { text: 'in' },
  { text: 'the' }, { text: 'plumbing,' }, { text: 'not' }, { text: 'the' }, { text: 'model.' },
  { text: 'I' }, { text: 'design' }, { text: 'the' }, { text: 'boundaries' }, { text: 'first:' },
  { text: 'domain' }, { text: 'logic' }, { text: 'that' }, { text: 'never' }, { text: 'learns' },
  { text: 'which' }, { text: 'LLM' }, { text: 'it' }, { text: 'is' }, { text: 'talking' }, { text: 'to,' },
  { text: 'state', isKey: true }, { text: 'that', isKey: true }, { text: 'survives', isKey: true },
  { text: 'a', isKey: true }, { text: 'crashed', isKey: true }, { text: 'worker,', isKey: true },
  { text: 'and' }, { text: 'logs' }, { text: 'you' }, { text: 'can' }, { text: 'follow' },
  { text: 'from' }, { text: 'request' }, { text: 'to' }, { text: 'result.' },
  { text: 'Then' }, { text: 'I' }, { text: 'ship' }, { text: 'it,' }, { text: 'and' },
  { text: 'lead' }, { text: 'the' }, { text: 'team' }, { text: 'that' }, { text: 'keeps' }, { text: 'it' }, { text: 'running.' }
];

export function Approach() {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [litCount, setLitCount] = useState<number>(() =>
    prefersReducedMotion() ? MANIFESTO_WORDS.length : 0
  );

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let ticking = false;

    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(
        1,
        Math.max(0, (vh * 0.82 - rect.top) / (rect.height + vh * 0.34))
      );
      const targetCount = Math.round(progress * MANIFESTO_WORDS.length);
      setLitCount(targetCount);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="page active" id="manifesto">
      <div className="wrap">
        <div className="pg">
          <Eyebrow className="it" style={{ marginBottom: '28px' }}>
            Approach
          </Eyebrow>

          <p className="lit" ref={containerRef} id="lit">
            {MANIFESTO_WORDS.map((w, idx) => {
              const isOn = idx < litCount;
              const classes = [
                isOn ? 'on' : '',
                isOn && w.isKey ? 'k' : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <span key={idx} className={classes}>
                  {w.text}{' '}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
