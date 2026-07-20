import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import InfiniteStroke from './InfiniteStroke';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const slideStyle = {
    transform: `translateX(-${scrollY * 1.15}px)`,
    opacity: Math.max(0, 1 - scrollY / 400),
  };

  return (
    <section style={styles.heroSection}>
      {/* 3D Infinite Perspective Chromatographic Stroke Background */}
      <InfiniteStroke />

      <div className="container" style={{ ...styles.container, ...slideStyle }}>
        <span className="eyebrow" style={styles.eyebrow}>
          Motion designer & creative director.
        </span>
        
        <h1 style={styles.heading}>
          Designing the <br />
          <span style={styles.gradientText}>Future</span> of Motion.
        </h1>

        {/* Minimalistic Left-Aligned CTA */}
        <div style={styles.ctaGroup}>
          <a href="#contact" style={styles.minimalButton} className="btn-minimal">
            Contact Me
            <ArrowRight size={14} style={{ marginLeft: '6px' }} />
          </a>
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  heroSection: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'left',
    overflow: 'hidden',
    backgroundColor: '#050505', // Deep space background
  },
  container: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
    pointerEvents: 'auto',
  },
  eyebrow: {
    fontSize: '11px',
    fontFamily: 'var(--font-mono)',
    color: 'var(--color-brand-orange)',
    letterSpacing: '0.15em',
    marginBottom: '20px',
  },
  heading: {
    fontFamily: 'var(--font-sans)',
    fontSize: '64px',
    lineHeight: '1.05',
    fontWeight: 700,
    letterSpacing: '-0.06em',
    color: '#ffffff',
    maxWidth: '750px',
    marginBottom: '32px',
  },
  gradientText: {
    background: 'linear-gradient(135deg, #ff0080 0%, var(--color-brand-orange) 50%, #7928ca 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  ctaGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  minimalButton: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: 'var(--color-canvas-elevated)',
    color: 'var(--color-ink)',
    border: '1px solid var(--color-hairline-bright)',
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    fontWeight: 500,
    padding: '8px 16px',
    borderRadius: 'var(--radius-pill)',
    textDecoration: 'none',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    cursor: 'pointer',
  },
};

// Inject hover styles
if (typeof document !== 'undefined') {
  const css = `
    .btn-minimal:hover {
      background-color: var(--color-brand-orange-soft) !important;
      border-color: var(--color-brand-orange) !important;
      color: #ffffff !important;
      transform: translateX(4px);
    }
    
    @media (max-width: 768px) {
      h1[style*="heading"] {
        font-size: 42px !important;
        line-height: 1.1 !important;
        letter-spacing: -0.04em !important;
      }
    }
  `;
  const styleSheet = document.createElement("style");
  styleSheet.innerText = css;
  document.head.appendChild(styleSheet);
}
