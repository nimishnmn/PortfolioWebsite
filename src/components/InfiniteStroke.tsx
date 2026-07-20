import { useEffect, useRef } from 'react';

export default function InfiniteStroke() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let scrollY = 0;

    // Handle resizing
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track scroll
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Generate space theme stars (twinkling in hardware-accelerated loops)
    const stars: { x: number; y: number; size: number; phase: number; speed: number }[] = [];
    for (let i = 0; i < 90; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 1.2 + 0.4,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.015 + 0.005,
      });
    }

    // High-performance ribbon drawing
    const drawRibbon = (
      width: number,
      height: number,
      widthScale: number,
      color: string,
      scrollYOffset: number
    ) => {
      const startX = width * 0.05;
      const startY = height * 1.15;
      const horizonX = width * 0.78;
      const horizonY = height * 0.28;

      const scrollFactor = scrollYOffset * 0.12;
      const controlX = width * 0.28 + scrollFactor;
      const controlY = height * 0.8 - scrollFactor * 0.2;

      const slices = 90;
      const leftPoints: { x: number; y: number }[] = [];
      const rightPoints: { x: number; y: number }[] = [];

      for (let i = 0; i <= slices; i++) {
        const t = i / slices;

        // Quadratic Bezier base coordinates
        const cx1 = startX + t * (controlX - startX);
        const cy1 = startY + t * (controlY - startY);
        const cx2 = controlX + t * (horizonX - controlX);
        const cy2 = controlY + t * (horizonY - controlY);

        const bx = cx1 + t * (cx2 - cx1);
        const y = cy1 + t * (cy2 - cy1);

        // Winding S-curve wave displacement (like a river)
        const waveX = Math.sin(t * Math.PI * 2.3 - (scrollYOffset * 0.0018)) * 170 * Math.pow(1 - t, 1.25);
        const x = bx + waveX;

        // Path tangent vector
        let tx = 0;
        let ty = 0;
        if (i < slices) {
          const nextT = (i + 1) / slices;
          const ncx1 = startX + nextT * (controlX - startX);
          const ncy1 = startY + nextT * (controlY - startY);
          const ncx2 = controlX + nextT * (horizonX - controlX);
          const ncy2 = controlY + nextT * (horizonY - controlY);
          const baseNextX = ncx1 + nextT * (ncx2 - ncx1);
          const nextY = ncy1 + nextT * (ncy2 - ncy1);
          
          const nextWaveX = Math.sin(nextT * Math.PI * 2.3 - (scrollYOffset * 0.0018)) * 170 * Math.pow(1 - nextT, 1.25);
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

        // Thicker width scaling (reduced power exponent and higher base size for prominent curves)
        const strokeWidth = 145 * Math.pow(1 - t, 1.85) * widthScale;

        leftPoints.push({ x: x + nx * (strokeWidth / 2), y: y + ny * (strokeWidth / 2) });
        rightPoints.push({ x: x - nx * (strokeWidth / 2), y: y - ny * (strokeWidth / 2) });
      }

      // Draw unified polygon ribbon
      ctx.beginPath();
      ctx.moveTo(leftPoints[0].x, leftPoints[0].y);
      for (let i = 1; i <= slices; i++) {
        ctx.lineTo(leftPoints[i].x, leftPoints[i].y);
      }
      for (let i = slices; i >= 0; i--) {
        ctx.lineTo(rightPoints[i].x, rightPoints[i].y);
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    };

    // Drawing loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      // PASS 0: Twinkling Space Theme Stars in background
      ctx.save();
      for (const star of stars) {
        const sx = star.x * width;
        const sy = star.y * height;
        const alpha = 0.2 + Math.sin(Date.now() * star.speed + star.phase) * 0.45;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.05, Math.min(1, alpha))})`;
        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // PASS 1: GPU-Accelerated Neon Glow Pass
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.filter = 'blur(36px)';
      ctx.globalAlpha = 0.5;
      drawRibbon(width, height, 1.9, 'rgba(255, 0, 80, 0.75)', scrollY);
      drawRibbon(width, height, 1.3, 'rgba(255, 90, 31, 0.85)', scrollY);
      drawRibbon(width, height, 0.65, 'rgba(0, 112, 243, 1)', scrollY);
      ctx.restore();

      // PASS 2: Medium Glow Pass
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.filter = 'blur(12px)';
      ctx.globalAlpha = 0.75;
      drawRibbon(width, height, 1.4, 'rgba(255, 0, 80, 0.85)', scrollY);
      drawRibbon(width, height, 0.9, 'rgba(255, 90, 31, 0.9)', scrollY);
      drawRibbon(width, height, 0.45, 'rgba(0, 112, 243, 1)', scrollY);
      ctx.restore();

      // PASS 3: Smooth Core Pass (anti-aliased)
      ctx.save();
      ctx.filter = 'blur(1.5px)';
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      drawRibbon(width, height, 0.95, '#ff0050', scrollY);
      drawRibbon(width, height, 0.65, '#ff5a1f', scrollY);
      drawRibbon(width, height, 0.28, '#ffffff', scrollY);
      ctx.restore();

      // Draw the glowing Concorde plane silhouette
      const startX = width * 0.05;
      const startY = height * 1.15;
      const horizonX = width * 0.78;
      const horizonY = height * 0.28;
      const scrollFactor = scrollY * 0.12;
      const controlX = width * 0.28 + scrollFactor;
      const controlY = height * 0.8 - scrollFactor * 0.2;

      const planeT = 0.75;
      const pcx1 = startX + planeT * (controlX - startX);
      const pcy1 = startY + planeT * (controlY - startY);
      const pcx2 = controlX + planeT * (horizonX - controlX);
      const pcy2 = controlY + planeT * (horizonY - controlY);
      
      const floatOffset = Math.sin(Date.now() / 240) * 4;
      const basePlaneX = pcx1 + planeT * (pcx2 - pcx1);
      const basePlaneY = pcy1 + planeT * (pcy2 - pcy1);
      
      const planeWaveX = Math.sin(planeT * Math.PI * 2.3 - (scrollY * 0.0018)) * 170 * Math.pow(1 - planeT, 1.25);
      const planeX = basePlaneX + planeWaveX + 15;
      const planeY = basePlaneY - 32 + floatOffset + (scrollY * 0.05);

      // Draw glowing background for the plane
      ctx.save();
      const planeGlow = ctx.createRadialGradient(planeX, planeY, 1, planeX, planeY, 28);
      planeGlow.addColorStop(0, 'rgba(255, 255, 255, 1)');
      planeGlow.addColorStop(0.25, 'rgba(255, 90, 31, 0.6)');
      planeGlow.addColorStop(0.65, 'rgba(255, 0, 100, 0.2)');
      planeGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = planeGlow;
      ctx.beginPath();
      ctx.arc(planeX, planeY, 28, 0, Math.PI * 2);
      ctx.fill();

      // Draw Concorde delta-wing silhouette
      ctx.translate(planeX, planeY);
      ctx.rotate(-0.16 + (scrollY * 0.0002));

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

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
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
