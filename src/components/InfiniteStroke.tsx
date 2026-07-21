import { useEffect, useRef } from 'react';

interface Props {
  scrollY?: number;
  heroHidden?: boolean;
}

export default function InfiniteStroke({ heroHidden }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroHiddenRef = useRef(heroHidden);

  useEffect(() => {
    heroHiddenRef.current = heroHidden;
  }, [heroHidden]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const startTime = Date.now();
    const duration = 2000; // 2 seconds to draw
    let rawProgress = 0;

    // High-performance static ribbon drawing
    const drawRibbon = (
      targetCtx: CanvasRenderingContext2D,
      width: number,
      height: number,
      widthScale: number,
      color: string,
      progress: number
    ) => {
      const startX = width * 0.05;
      const startY = height * 1.15;
      const horizonX = width * 0.78;
      const horizonY = height * 0.28;

      const controlX = width * 0.28;
      const controlY = height * 0.8;

      const slices = 90;
      const leftPoints: { x: number; y: number }[] = [];
      const rightPoints: { x: number; y: number }[] = [];

      const addPoint = (t: number) => {
        const cx1 = startX + t * (controlX - startX);
        const cy1 = startY + t * (controlY - startY);
        const cx2 = controlX + t * (horizonX - controlX);
        const cy2 = controlY + t * (horizonY - controlY);

        const bx = cx1 + t * (cx2 - cx1);
        const y = cy1 + t * (cy2 - cy1);

        // Retain the aesthetic S-curve, but remove scroll displacement
        const waveX = Math.sin(t * Math.PI * 2.3) * 170 * Math.pow(1 - t, 1.25);
        const x = bx + waveX;

        let tx = 0;
        let ty = 0;
        if (t < 1) {
          const nextT = Math.min(1, t + 1/slices);
          const ncx1 = startX + nextT * (controlX - startX);
          const ncy1 = startY + nextT * (controlY - startY);
          const ncx2 = controlX + nextT * (horizonX - controlX);
          const ncy2 = controlY + nextT * (horizonY - controlY);
          const baseNextX = ncx1 + nextT * (ncx2 - ncx1);
          const nextY = ncy1 + nextT * (ncy2 - ncy1);
          
          const nextWaveX = Math.sin(nextT * Math.PI * 2.3) * 170 * Math.pow(1 - nextT, 1.25);
          const nextX = baseNextX + nextWaveX;
          
          tx = nextX - x;
          ty = nextY - y;
        } else {
          tx = horizonX - x;
          ty = horizonY - y;
        }

        const len = Math.sqrt(tx * tx + ty * ty);
        const nx = len > 0 ? -ty / len : -1;
        const ny = len > 0 ? tx / len : 0;

        const strokeWidth = 145 * Math.pow(1 - t, 1.85) * widthScale;

        leftPoints.push({ x: x + nx * (strokeWidth / 2), y: y + ny * (strokeWidth / 2) });
        rightPoints.push({ x: x - nx * (strokeWidth / 2), y: y - ny * (strokeWidth / 2) });
      };

      for (let i = 0; i <= slices; i++) {
        const t = i / slices;
        if (t > progress) break;
        addPoint(t);
      }
      
      if (progress > 0 && progress < 1) {
        addPoint(progress);
      }

      if (leftPoints.length > 0) {
        targetCtx.beginPath();
        targetCtx.moveTo(leftPoints[0].x, leftPoints[0].y);
        for (let i = 1; i < leftPoints.length; i++) {
          targetCtx.lineTo(leftPoints[i].x, leftPoints[i].y);
        }
        for (let i = rightPoints.length - 1; i >= 0; i--) {
          targetCtx.lineTo(rightPoints[i].x, rightPoints[i].y);
        }
        targetCtx.closePath();
        targetCtx.fillStyle = color;
        targetCtx.fill();
      }
    };

    const render = (force = false) => {
      // If the animation is fully completed and we're not explicitly forcing a redraw (like a window resize), completely halt rendering
      if (rawProgress >= 1 && !force) return;
      
      // If the section is scrolled out of view during the 2s animation, pause rendering
      if (heroHiddenRef.current && !force) {
        animationFrameId = requestAnimationFrame(() => render());
        return;
      }

      const elapsed = Date.now() - startTime;
      rawProgress = Math.min(1, elapsed / duration);
      const progress = 1 - Math.pow(1 - rawProgress, 5);

      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw all ribbon passes directly to the main canvas
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.filter = 'blur(36px)';
      ctx.globalAlpha = 0.5;
      drawRibbon(ctx, width, height, 1.9, 'rgba(255, 0, 80, 0.75)', progress);
      drawRibbon(ctx, width, height, 1.3, 'rgba(255, 90, 31, 0.85)', progress);
      drawRibbon(ctx, width, height, 0.65, 'rgba(0, 112, 243, 1)', progress);
      ctx.restore();

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.filter = 'blur(12px)';
      ctx.globalAlpha = 0.75;
      drawRibbon(ctx, width, height, 1.4, 'rgba(255, 0, 80, 0.85)', progress);
      drawRibbon(ctx, width, height, 0.9, 'rgba(255, 90, 31, 0.9)', progress);
      drawRibbon(ctx, width, height, 0.45, 'rgba(0, 112, 243, 1)', progress);
      ctx.restore();

      ctx.save();
      ctx.filter = 'blur(1.5px)';
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      drawRibbon(ctx, width, height, 0.95, '#ff0050', progress);
      drawRibbon(ctx, width, height, 0.65, '#ff5a1f', progress);
      drawRibbon(ctx, width, height, 0.28, '#ffffff', progress);
      ctx.restore();

      // Draw the static glowing plane silhouette on top
      const planeT = 0.75;
      const planeOpacity = Math.max(0, Math.min(1, (progress - 0.6) * 5));
      
      if (planeOpacity > 0) {
        const startX = width * 0.05;
        const startY = height * 1.15;
        const horizonX = width * 0.78;
        const horizonY = height * 0.28;
        const controlX = width * 0.28;
        const controlY = height * 0.8;

        const pcx1 = startX + planeT * (controlX - startX);
        const pcy1 = startY + planeT * (controlY - startY);
        const pcx2 = controlX + planeT * (horizonX - controlX);
        const pcy2 = controlY + planeT * (horizonY - controlY);
        
        const basePlaneX = pcx1 + planeT * (pcx2 - pcx1);
        const basePlaneY = pcy1 + planeT * (pcy2 - pcy1);
        
        // Retain the curve offset so it aligns with the line, but remove scroll turbulence
        const planeWaveX = Math.sin(planeT * Math.PI * 2.3) * 170 * Math.pow(1 - planeT, 1.25);
        const planeX = basePlaneX + planeWaveX + 15;
        const planeY = basePlaneY - 32;

        ctx.save();
        ctx.globalAlpha = planeOpacity;
        const planeGlow = ctx.createRadialGradient(planeX, planeY, 1, planeX, planeY, 28);
        planeGlow.addColorStop(0, 'rgba(255, 255, 255, 1)');
        planeGlow.addColorStop(0.25, 'rgba(255, 90, 31, 0.6)');
        planeGlow.addColorStop(0.65, 'rgba(255, 0, 100, 0.2)');
        planeGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = planeGlow;
        ctx.beginPath();
        ctx.arc(planeX, planeY, 28, 0, Math.PI * 2);
        ctx.fill();

        ctx.translate(planeX, planeY);
        ctx.rotate(-0.16);

        ctx.beginPath();
        ctx.moveTo(-16, 0); 
        ctx.lineTo(16, -2); 
        ctx.lineTo(-4, 6);  
        ctx.lineTo(-12, 1);
        ctx.lineTo(-12, -1);
        ctx.lineTo(-4, -6); 
        ctx.closePath();
        
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ffffff';
        ctx.fill();
        ctx.restore();
      }

      // Continue animating until drawing is fully complete
      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(() => render());
      }
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelWidth = rect.width * window.devicePixelRatio;
      const pixelHeight = rect.height * window.devicePixelRatio;
      
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      
      // If the animation already finished, force a redraw so the static image resizes!
      if (rawProgress >= 1) render(true);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
