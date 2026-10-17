import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../../lib/utils';

export function GridBackground() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    let targetX = 70;
    let targetY = 30;
    let currentX = 70;
    let currentY = 30;
    let isRunning = false;

    const loop = () => {
      const el = gridRef.current;
      if (!el) {
        isRunning = false;
        return;
      }

      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      el.style.setProperty('--gx', `${currentX.toFixed(2)}%`);
      el.style.setProperty('--gy', `${currentY.toFixed(2)}%`);

      if (Math.abs(targetX - currentX) + Math.abs(targetY - currentY) > 0.05) {
        requestAnimationFrame(loop);
      } else {
        isRunning = false;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const hero = document.getElementById('top');
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width) * 100;
      targetY = ((e.clientY - rect.top) / rect.height) * 100;

      if (!isRunning) {
        isRunning = true;
        requestAnimationFrame(loop);
      }
    };

    document.addEventListener('pointermove', handlePointerMove);
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return <div ref={gridRef} className="gridbg" id="gridbg" aria-hidden="true" />;
}
