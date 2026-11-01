export interface ParticleWordOptions {
  words: string[];
  every?: number;
  start?: number;
  step?: number;
  on?: (index: number) => void;
  pos: (W: number, H: number) => { x: number; y: number; maxW: number; maxFs?: number };
  watch?: HTMLElement | null;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  on: number;
  h: number;
}

export function createParticleWord(cv: HTMLCanvasElement, o: ParticleWordOptions) {
  const c = cv.getContext('2d');
  if (!c) return { set: () => {}, destroy: () => {} };

  let W = 0;
  let H = 0;
  let dpr = 1;
  const parts: Particle[] = [];
  let cur = -1;
  let vis = true;
  let mx = -999;
  let my = -999;
  let destroyed = false;
  let animId = 0;
  let intervalId: ReturnType<typeof setInterval> | null = null;

  const off = document.createElement('canvas');
  const oc = off.getContext('2d', { willReadFrequently: true });
  if (!oc) return { set: () => {}, destroy: () => {} };

  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function targets(word: string): [number, number][] {
    if (W < 2 || H < 2 || !oc) return [];
    const p = o.pos(W, H);
    const fs = Math.min(p.maxW / (word.length * 0.56), p.maxFs || 340);
    off.width = W;
    off.height = H;
    oc.clearRect(0, 0, W, H);
    oc.fillStyle = '#fff';
    oc.font = `600 ${fs}px Lexend,Inter,sans-serif`;
    oc.textAlign = 'center';
    oc.textBaseline = 'middle';
    const measure = oc.measureText(word).width || 1;
    const k = Math.min(1, p.maxW / measure);
    oc.font = `600 ${fs * k}px Lexend,Inter,sans-serif`;
    oc.fillText(word, p.x, p.y);
    const d = oc.getImageData(0, 0, W, H).data;
    const st = o.step || 4;
    const pts: [number, number][] = [];
    for (let y = 0; y < H; y += st) {
      for (let x = 0; x < W; x += st) {
        if (d[(y * W + x) * 4 + 3] > 140) {
          pts.push([x + (Math.random() - 0.5) * 2, y + (Math.random() - 0.5) * 2]);
        }
      }
    }
    return pts;
  }

  function set(i: number) {
    if (destroyed) return;
    cur = i;
    const t = targets(o.words[i]);
    for (let j = t.length - 1; j > 0; j--) {
      const k = (Math.random() * (j + 1)) | 0;
      const s = t[j];
      t[j] = t[k];
      t[k] = s;
    }
    const need = t.length;
    while (parts.length < need) {
      parts.push({
        x: W * (0.2 + Math.random() * 0.6),
        y: H + Math.random() * 80,
        vx: 0,
        vy: 0,
        tx: 0,
        ty: 0,
        on: 1,
        h: Math.random(),
      });
    }
    parts.forEach((p, j) => {
      if (j < need) {
        p.tx = t[j][0];
        p.ty = t[j][1];
        p.on = 1;
      } else {
        p.on = 0;
        p.tx = Math.random() * W;
        p.ty = -40 - Math.random() * H * 0.3;
      }
    });
  }

  function size() {
    if (destroyed) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = cv.clientWidth;
    H = cv.clientHeight;
    if (W < 2 || H < 2) return;
    cv.width = W * dpr;
    cv.height = H * dpr;
    c?.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (cur >= 0) set(cur);
  }

  size();
  let rz: ReturnType<typeof setTimeout>;
  const resizeObserver = new ResizeObserver(() => {
    clearTimeout(rz);
    rz = setTimeout(size, 120);
  });
  resizeObserver.observe(cv);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      if (cur >= 0 && !destroyed) set(cur);
    });
  }

  const onPointerMove = (e: PointerEvent) => {
    const r = cv.getBoundingClientRect();
    mx = e.clientX - r.left;
    my = e.clientY - r.top;
  };

  const onPointerLeave = () => {
    mx = -999;
    my = -999;
  };

  const watchEl = o.watch || cv;
  watchEl.addEventListener('pointermove', onPointerMove as EventListener);
  watchEl.addEventListener('pointerleave', onPointerLeave as EventListener);

  const io = new IntersectionObserver((entries) => {
    vis = entries[0]?.isIntersecting ?? true;
  });
  io.observe(watchEl);

  set(o.start || 0);
  if (o.on) o.on(cur);

  if (o.every && !reduceMotion) {
    intervalId = setInterval(() => {
      if (!vis || document.hidden || destroyed) return;
      const next = (cur + 1) % o.words.length;
      set(next);
      if (o.on) o.on(next);
    }, o.every);
  }

  function frame() {
    if (destroyed) return;
    if (vis && W > 1 && c) {
      c.clearRect(0, 0, W, H);
      const isL = document.documentElement.dataset.theme === 'light';
      for (let i = 0; i < parts.length; i++) {
        const q = parts[i];
        q.vx += (q.tx - q.x) * 0.05;
        q.vy += (q.ty - q.y) * 0.05;
        const ex = q.x - mx;
        const ey = q.y - my;
        const d2 = ex * ex + ey * ey;
        if (d2 < 14400 && d2 > 1) {
          const d = Math.sqrt(d2);
          const f2 = (1 - d / 120) * 3;
          q.vx += (ex / d) * f2;
          q.vy += (ey / d) * f2;
        }
        q.vx *= 0.86;
        q.vy *= 0.86;
        q.x += q.vx;
        q.y += q.vy;
        if (!q.on && q.y < -30) continue;
        const sp = Math.min(1, Math.abs(q.vx) + Math.abs(q.vy));

        c.fillStyle =
          q.h < 0.5
            ? isL
              ? `rgba(${(61 + sp * 80) | 0},92,245,0.95)`
              : `rgba(${(150 + sp * 100) | 0},${(180 + sp * 60) | 0},255,1)`
            : q.h < 0.78
              ? isL
                ? 'rgba(139,61,235,0.9)'
                : 'rgba(205,150,255,1)'
              : isL
                ? 'rgba(11,16,32,0.85)'
                : 'rgba(255,255,255,1)';
        c.fillRect(q.x, q.y, 2.7 + sp * 1.5, 2.7 + sp * 1.5);
      }
    }
    animId = requestAnimationFrame(frame);
  }

  animId = requestAnimationFrame(frame);

  return {
    set: (i: number) => {
      if (i !== cur) set(i);
    },
    destroy: () => {
      destroyed = true;
      cancelAnimationFrame(animId);
      if (intervalId) clearInterval(intervalId);
      resizeObserver.disconnect();
      io.disconnect();
      watchEl.removeEventListener('pointermove', onPointerMove as EventListener);
      watchEl.removeEventListener('pointerleave', onPointerLeave as EventListener);
    },
  };
}

const GL = '█▓▒░/\\#%&@*+=<>';

export function scrambleText(
  el: HTMLElement,
  targetText: string,
  duration = 800
) {
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    el.textContent = targetText;
    return;
  }
  const t0 = performance.now();
  let cancelled = false;

  function f(t: number) {
    if (cancelled) return;
    const k = Math.min(1, Math.max(0, (t - t0) / duration));
    let o = '';
    for (let i = 0; i < targetText.length; i++) {
      const c = targetText[i];
      o += c === ' ' || i < targetText.length * k * 1.15 - 2 ? c : GL[(Math.random() * GL.length) | 0];
    }
    el.textContent = o;
    if (k < 1) {
      requestAnimationFrame(f);
    } else {
      el.textContent = targetText;
    }
  }

  requestAnimationFrame(f);
  return () => {
    cancelled = true;
  };
}
