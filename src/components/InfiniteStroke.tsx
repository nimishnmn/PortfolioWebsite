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

    // Drawing loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      // Base coordinates for 3D perspective stroke
      const startX = width * 0.05;
      const startY = height * 1.1; // Out of bottom screen
      const horizonX = width * 0.75;
      const horizonY = height * 0.28; // Infinite end point

      // Scroll changes the curvature (giving 3D camera pan effect)
      const scrollFactor = scrollY * 0.12;
      const controlX = width * 0.25 + scrollFactor;
      const controlY = height * 0.8 - scrollFactor * 0.2;

      // Draw the 3D stroke by drawing horizontal slices
      const slices = 120;
      let prevL: { x: number; y: number } | null = null;
      let prevR: { x: number; y: number } | null = null;

      for (let i = 0; i <= slices; i++) {
        const t = i / slices;

        // Quadratic Bezier interpolation for centerline
        const cx1 = startX + t * (controlX - startX);
        const cy1 = startY + t * (controlY - startY);
        const cx2 = controlX + t * (horizonX - controlX);
        const cy2 = controlY + t * (horizonY - controlY);

        const x = cx1 + t * (cx2 - cx1);
        const y = cy1 + t * (cy2 - cy1);

        // Path tangent vector (numerical approximation)
        let tx = 0;
        let ty = 0;
        if (i < slices) {
          const nextT = (i + 1) / slices;
          const ncx1 = startX + nextT * (controlX - startX);
          const ncy1 = startY + nextT * (controlY - startY);
          const ncx2 = controlX + nextT * (horizonX - controlX);
          const ncy2 = controlY + nextT * (horizonY - controlY);
          const nextX = ncx1 + nextT * (ncx2 - ncx1);
          const nextY = ncy1 + nextT * (ncy2 - ncy1);
          tx = nextX - x;
          ty = nextY - y;
        } else {
          // Last point fallback
          tx = horizonX - x;
          ty = horizonY - y;
        }

        const len = Math.sqrt(tx * tx + ty * ty);
        const nx = len > 0 ? -ty / len : -1;
        const ny = len > 0 ? tx / len : 0;

        // Perspective width scaling (parabolic curve for realistic depth)
        // Foreground is wide (150px), horizon converges to 0px
        const strokeWidth = 140 * Math.pow(1 - t, 2.5);

        // Compute left and right edge points
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

          // Create chromatic dispersion gradient (thermal look: pink -> orange -> blue -> orange -> pink)
          const grad = ctx.createLinearGradient(lx, ly, rx, ry);
          // Aurora/Thermal colors matching Concorde image
          grad.addColorStop(0, 'rgba(255, 0, 128, 0.9)');    // Pink border
          grad.addColorStop(0.18, 'rgba(255, 90, 31, 0.95)'); // Orange boundary
          grad.addColorStop(0.48, 'rgba(0, 112, 243, 0.98)'); // Electric Blue center
          grad.addColorStop(0.82, 'rgba(255, 90, 31, 0.95)');
          grad.addColorStop(1, 'rgba(255, 0, 128, 0.9)');

          ctx.fillStyle = grad;
          ctx.fill();
        }

        prevL = { x: lx, y: ly };
        prevR = { x: rx, y: ry };
      }

      // Draw the glowing Concorde plane silhouette
      // Place it at t = 0.72 (flying along the upper half of the stroke)
      const planeT = 0.75;
      const pcx1 = startX + planeT * (controlX - startX);
      const pcy1 = startY + planeT * (controlY - startY);
      const pcx2 = controlX + planeT * (horizonX - controlX);
      const pcy2 = controlY + planeT * (horizonY - controlY);
      
      // Floating/hover effect based on timestamp
      const floatOffset = Math.sin(Date.now() / 240) * 4;
      const planeX = (pcx1 + planeT * (pcx2 - pcx1)) + 15;
      const planeY = (pcy1 + planeT * (pcy2 - pcy1)) - 32 + floatOffset + (scrollY * 0.05);

      // Draw glowing background for the plane
      const planeGlow = ctx.createRadialGradient(planeX, planeY, 1, planeX, planeY, 28);
      planeGlow.addColorStop(0, 'rgba(255, 255, 255, 1)');
      planeGlow.addColorStop(0.2, 'rgba(255, 90, 31, 0.6)');
      planeGlow.addColorStop(0.6, 'rgba(255, 0, 128, 0.2)');
      planeGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = planeGlow;
      ctx.beginPath();
      ctx.arc(planeX, planeY, 28, 0, Math.PI * 2);
      ctx.fill();

      // Draw Concorde delta-wing silhouette
      ctx.save();
      ctx.translate(planeX, planeY);
      ctx.rotate(-0.16 + (scrollY * 0.0002)); // Tilt of the flight path

      ctx.beginPath();
      ctx.moveTo(-16, 0); // Tail
      ctx.lineTo(16, -2); // Long nose cone
      ctx.lineTo(-4, 6);  // Right wing tip
      ctx.lineTo(-12, 1);
      ctx.lineTo(-12, -1);
      ctx.lineTo(-4, -6); // Left wing tip
      ctx.closePath();
      
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#ffffff';
      ctx.fill();
      ctx.restore();

      // Infinite End point glow
      const horizonGlow = ctx.createRadialGradient(horizonX, horizonY, 0, horizonX, horizonY, 40);
      horizonGlow.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
      horizonGlow.addColorStop(0.5, 'rgba(121, 40, 202, 0.1)');
      horizonGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = horizonGlow;
      ctx.beginPath();
      ctx.arc(horizonX, horizonY, 40, 0, Math.PI * 2);
      ctx.fill();

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
