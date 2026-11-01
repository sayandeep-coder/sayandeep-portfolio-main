import { useEffect, useRef, useState } from 'react';

const TEXT_PARTS: { text: string; isK?: boolean }[] = [
  { text: 'Most ' }, { text: 'AI ' }, { text: 'products ' }, { text: 'fail ' }, { text: 'in ' }, { text: 'the ' },
  { text: 'plumbing, ' }, { text: 'not ' }, { text: 'the ' }, { text: 'model. ' }, { text: 'I ' }, { text: 'design ' },
  { text: 'the ' }, { text: 'boundaries ' }, { text: 'first: ' }, { text: 'domain ' }, { text: 'logic ' }, { text: 'that ' },
  { text: 'never ' }, { text: 'learns ' }, { text: 'which ' }, { text: 'LLM ' }, { text: 'it ' }, { text: 'is ' },
  { text: 'talking ' }, { text: 'to, ' },
  { text: 'state ', isK: true }, { text: 'that ', isK: true }, { text: 'survives ', isK: true },
  { text: 'a ', isK: true }, { text: 'crashed ', isK: true }, { text: 'worker, ', isK: true },
  { text: 'and ' }, { text: 'logs ' }, { text: 'you ' }, { text: 'can ' }, { text: 'follow ' }, { text: 'from ' },
  { text: 'request ' }, { text: 'to ' }, { text: 'result. ' }, { text: 'Then ' }, { text: 'I ' }, { text: 'ship ' },
  { text: 'it, ' }, { text: 'and ' }, { text: 'lead ' }, { text: 'the ' }, { text: 'team ' }, { text: 'that ' },
  { text: 'keeps ' }, { text: 'it ' }, { text: 'running.' }
];

export function Approach() {
  const sectionRef = useRef<HTMLElement>(null);
  const [litCount, setLitCount] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return TEXT_PARTS.length;
    }
    return 0;
  });

  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const handleScroll = () => {
      const r = sec.getBoundingClientRect();
      const maxScroll = sec.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / maxScroll));
      const n = Math.round(Math.min(1, Math.max(0, p * 1.15)) * TEXT_PARTS.length);
      setLitCount(n);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="ap" id="approach" ref={sectionRef}>
      <div className="ap-st">
        <div className="o3d" aria-hidden="true">
          <div className="sc">
            <i style={{ '--r': 'min(70vw,640px)', '--k': '0' } as React.CSSProperties}></i>
            <i style={{ '--r': 'min(52vw,470px)', '--k': '1' } as React.CSSProperties}></i>
            <i style={{ '--r': 'min(34vw,300px)', '--k': '2' } as React.CSSProperties}></i>
          </div>
        </div>
        <div className="ap-lab">
          <span className="eb" data-scr>
            approach
          </span>
        </div>
        <p className="lit" id="lit">
          {TEXT_PARTS.map((item, idx) => (
            <span
              key={idx}
              className={`lw ${item.isK ? 'k' : ''} ${idx < litCount ? 'on' : ''}`}
            >
              {item.text}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
