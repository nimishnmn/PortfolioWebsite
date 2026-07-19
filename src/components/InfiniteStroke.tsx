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

    // Helper function to draw the road with specific width and blur filters
    const drawRoad = (
      width: number,
      height: number,
      filter: string,
      widthMultiplier: number,
      globalAlpha: number
    ) => {
      ctx.save();
      ctx.filter = filter;
      ctx.globalAlpha = globalAlpha;

      const startX = width * 0.05;
      const startY = height * 1.1; 
      const horizonX = width * 0.75;
      const horizonY = height * 0.28;

      const scrollFactor = scrollY * 0.12;
      const controlX = width * 0.25 + scrollFactor;
      const controlY = height * 0.8 - scrollFactor * 0.2;

      const slices = 160; // Increased slices for smoother curve resolution
      let prevL: { x: number; y: number } | null = null;
      let prevR: { x: number; y: number } | null = null;

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
        const waveX = Math.sin(t * Math.PI * 2.3 - (scrollY * 0.002)) * 160 * Math.pow(1 - t, 1.3);
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
          
          const nextWaveX = Math.sin(nextT * Math.PI * 2.3 - (scrollY * 0.002)) * 160 * Math.pow(1 - nextT, 1.3);
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

        // Width logic (narrower at the horizon)
        const strokeWidth = 120 * Math.pow(1 - t, 2.5) * widthMultiplier;

        // Compute edge points
        const lx = x + nx * (strokeWidth / 2);
        const ly = y + ny * (strokeWidth / 2);
        const rx = x - nx * (strokeWidth / 2);
        const ry = y - ny * (strokeWidth / 2);

        if (prevL && prevR) {
          ctx.beginPath();
          ctx.moveTo(prevL.x, prevL.y);
          ctx.lineTo(lx, ly);
          ctx.lineTo(rx, ry);
          ctx.lineTo(prevR.x, prevR.y);
          ctx.closePath();

          // Create chromatic dispersion gradient (NO GREEN)
          const grad = ctx.createLinearGradient(lx, ly, rx, ry);
          grad.addColorStop(0, 'rgba(255, 0, 100, 0)');        // Fade out red-pink
          grad.addColorStop(0.12, 'rgba(255, 0, 80, 0.9)');    // Glowing red-pink
          grad.addColorStop(0.3, 'rgba(255, 90, 31, 0.95)');   // Glowing orange
          grad.addColorStop(0.5, 'rgba(0, 112, 243, 1)');      // Neon blue core
          grad.addColorStop(0.7, 'rgba(255, 90, 31, 0.95)');
          grad.addColorStop(0.88, 'rgba(255, 0, 80, 0.9)');
          grad.addColorStop(1, 'rgba(255, 0, 100, 0)');

          ctx.fillStyle = grad;
          ctx.fill();
        }

        prevL = { x: lx, y: ly };
        prevR = { x: rx, y: ry };
      }
      ctx.restore();
    };

    // Drawing loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      // Pass 1: Wide, soft glow (Large blur)
      drawRoad(width, height, 'blur(28px)', 1.5, 0.45);

      // Pass 2: Medium glow (Mid blur)
      drawRoad(width, height, 'blur(10px)', 1.2, 0.65);

      // Pass 3: Sharp core path (No blur - zero jaggedness!)
      drawRoad(width, height, 'none', 0.95, 1.0);

      // Draw the glowing Concorde plane silhouette
      const startX = width * 0.05;
      const startY = height * 1.1;
      const horizonX = width * 0.75;
      const horizonY = height * 0.28;
      const scrollFactor = scrollY * 0.12;
      const controlX = width * 0.25 + scrollFactor;
      const controlY = height * 0.8 - scrollFactor * 0.2;

      const planeT = 0.75;
      const pcx1 = startX + planeT * (controlX - startX);
      const pcy1 = startY + planeT * (controlY - startY);
      const pcx2 = controlX + planeT * (horizonX - controlX);
      const pcy2 = controlY + planeT * (horizonY - controlY);
      
      const floatOffset = Math.sin(Date.now() / 240) * 4;
      const basePlaneX = pcx1 + planeT * (pcx2 - pcx1);
      const basePlaneY = pcy1 + planeT * (pcy2 - pcy1);
      
      const planeWaveX = Math.sin(planeT * Math.PI * 2.3 - (scrollY * 0.002)) * 160 * Math.pow(1 - planeT, 1.3);
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

      // Infinite End point glow
      ctx.save();
      const horizonGlow = ctx.createRadialGradient(horizonX, horizonY, 0, horizonX, horizonY, 40);
      horizonGlow.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
      horizonGlow.addColorStop(0.5, 'rgba(121, 40, 202, 0.1)');
      horizonGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = horizonGlow;
      ctx.beginPath();
      ctx.arc(horizonX, horizonY, 40, 0, Math.PI * 2);
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
