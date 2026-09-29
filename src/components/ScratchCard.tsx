import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * A pastel scratch-off panel. Drag a finger or the mouse across it to uncover
 * the content underneath; once ~45% is cleared the rest dissolves away.
 */
export function ScratchCard({ children, onReveal }: { children: ReactNode; onReveal?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [revealed, setRevealed] = useState(false);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'source-over';

    const g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, '#fbe1d0');
    g.addColorStop(0.5, '#f7c8d4');
    g.addColorStop(1, '#cfe5f2');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 90; i++) {
      ctx.fillStyle = `rgba(255,255,255,${0.25 + Math.random() * 0.45})`;
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 1.7, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = 'rgba(110, 40, 60, 0.8)';
    ctx.textAlign = 'center';
    ctx.font = "500 14px 'Cinzel', serif";
    ctx.fillText('✦ SCRATCH TO REVEAL ✦', width / 2, height / 2 - 4);
    ctx.font = "italic 15px 'Cormorant Garamond', serif";
    ctx.fillText('the date of our forever', width / 2, height / 2 + 18);
  }, []);

  useEffect(() => {
    // Wait for the web fonts so the canvas lettering uses them.
    let cancelled = false;
    const run = () => !cancelled && paint();
    if (document.fonts?.ready) document.fonts.ready.then(run);
    else run();
    return () => {
      cancelled = true;
    };
  }, [paint]);

  const reveal = useCallback(() => {
    setRevealed(true);
    onReveal?.();
  }, [onReveal]);

  const point = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const scratch = (x: number, y: number) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineWidth = 48;
    ctx.beginPath();
    if (last.current) ctx.moveTo(last.current.x, last.current.y);
    else ctx.moveTo(x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
    last.current = { x, y };
  };

  const clearedRatio = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return 0;
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const step = 16;
    let clear = 0;
    let total = 0;
    for (let y = 0; y < canvas.height; y += step) {
      for (let x = 0; x < canvas.width; x += step) {
        total++;
        if (data[(y * canvas.width + x) * 4 + 3] === 0) clear++;
      }
    }
    return total ? clear / total : 0;
  };

  const end = () => {
    if (!drawing.current) return;
    drawing.current = false;
    last.current = null;
    if (!revealed && clearedRatio() > 0.45) reveal();
  };

  return (
    <div className="relative mx-auto aspect-[16/9] w-full max-w-[340px] overflow-hidden rounded-2xl shadow-[0_14px_40px_-14px_rgba(180,90,120,0.5)] ring-1 ring-white/70">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-ivory px-4 text-center">
        <div className={revealed ? 'animate-pop' : ''}>{children}</div>
      </div>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full cursor-grab touch-none transition-opacity duration-700 ${
          revealed ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          drawing.current = true;
          const p = point(e);
          scratch(p.x, p.y);
        }}
        onPointerMove={(e) => {
          if (!drawing.current) return;
          const p = point(e);
          scratch(p.x, p.y);
        }}
        onPointerUp={end}
        onPointerCancel={end}
      />
      {!revealed && (
        <>
          <span className="pointer-events-none absolute inset-y-0 left-0 w-1/4 animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <button
            type="button"
            onClick={reveal}
            className="sr-only focus:not-sr-only focus:absolute focus:bottom-2 focus:left-1/2 focus:-translate-x-1/2 focus:rounded-full focus:bg-white focus:px-3 focus:py-1 focus:text-sm"
          >
            Reveal the date
          </button>
        </>
      )}
    </div>
  );
}
