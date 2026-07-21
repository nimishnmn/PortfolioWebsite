import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Showcase from './components/Showcase';

export default function App() {
  const [grainUrl, setGrainUrl] = useState('');
  const [windowHeight, setWindowHeight] = useState(800);

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);

    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Generate static film grain tile ONCE, off the critical path. Skipped for
  // reduced-motion users since it's purely decorative.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    raf = requestAnimationFrame(() => {
      const SIZE = 200;
      const c = document.createElement('canvas');
      c.width = SIZE;
      c.height = SIZE;
      const ctx = c.getContext('2d');
      if (!ctx) return;
      const img = ctx.createImageData(SIZE, SIZE);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 14;
      }
      ctx.putImageData(img, 0, 0);
      setGrainUrl(c.toDataURL('image/png'));
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const slabHeight = windowHeight;

  return (
    <div style={styles.app}>
      {/* Static film grain — tiled PNG texture, GPU cached, zero repaint */}
      {grainUrl && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundImage: `url(${grainUrl})`,
            backgroundRepeat: 'repeat',
            opacity: 0.9,
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        />
      )}

      <main style={{ position: 'relative' }}>
        <Hero />

        {/* Spacer to push showcase below the fixed Hero */}
        <div style={{ height: '100vh', width: '100%' }} />

        {/* Scroll Track: only enough scroll height to bring showcase into sticky position */}
        <div
          style={{
            height: `${slabHeight}px`,
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Glass slab — locks to sticky top when it reaches the viewport top */}
          <div style={{ ...styles.glassSlab, height: `${slabHeight}px` }} className="glass-slab">
            <Showcase />
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  app: {
    backgroundColor: '#050505',
    minHeight: '100vh',
    position: 'relative' as const,
    overflowX: 'hidden' as const,
  },
  glassSlab: {
    position: 'sticky' as const,
    top: '0px',
    zIndex: 2,
    backgroundColor: '#0a0a0a',
    borderTop: '1px solid rgba(255, 90, 31, 0.22)',
    borderLeft: '1px solid rgba(255, 90, 31, 0.22)',
    borderRight: '1px solid rgba(255, 90, 31, 0.22)',
    borderRadius: '28px 28px 0 0',
    boxShadow: '0 -1px 0 0 rgba(255,60,20,0.1), 0 -24px 60px rgba(0, 0, 0, 0.7)',
    overflow: 'hidden' as const,
  },
};
