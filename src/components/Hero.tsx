import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section style={styles.heroSection}>
      {/* Background Mesh Gradient */}
      <div className="mesh-gradient-container">
        <div className="mesh-gradient-circle"></div>
      </div>

      <div className="container" style={styles.container}>
        <span className="eyebrow" style={styles.eyebrow}>
          CREATIVE DIRECTOR & MOTION DESIGNER
        </span>
        
        <h1 style={styles.heading}>
          Designing the <span style={styles.gradientText}>Future</span> of Movement.
        </h1>
        
        <p style={styles.description}>
          I'm Nimish. An 18-year-old artist shaping raw concepts into high-fidelity cinematic visuals, immersive layouts, and dynamic brand assets.
        </p>

        {/* Bimodal CTAs: Pills for Marketing Context */}
        <div style={styles.ctaGroup}>
          <a href="#work" style={styles.primaryPill} className="btn-primary">
            View Showcase
            <Play size={16} fill="currentColor" style={{ marginLeft: '6px' }} />
          </a>
          <a href="#contact" style={styles.secondaryPill} className="btn-secondary">
            Get in Touch
            <ArrowRight size={16} style={{ marginLeft: '6px' }} />
          </a>
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  heroSection: {
    position: 'relative',
    padding: '160px 0 100px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    overflow: 'hidden',
    minHeight: '80vh',
  },
  container: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  eyebrow: {
    fontSize: '12px',
    color: 'var(--color-brand-orange)',
    marginBottom: '16px',
  },
  heading: {
    fontFamily: 'var(--font-sans)',
    fontSize: '56px',
    lineHeight: '1.05',
    fontWeight: 700,
    letterSpacing: '-0.05em', // Tightly-tracked Geist Display style
    color: 'var(--color-ink)',
    maxWidth: '800px',
    marginBottom: '24px',
  },
  gradientText: {
    background: 'linear-gradient(135deg, var(--color-brand-orange) 0%, #ff0080 50%, #7928ca 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  description: {
    fontSize: '18px',
    lineHeight: '28px',
    color: 'var(--color-body)',
    maxWidth: '600px',
    marginBottom: '40px',
  },
  ctaGroup: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryPill: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: 'var(--color-ink)',
    color: 'var(--color-canvas)',
    fontFamily: 'var(--font-sans)',
    fontSize: '15px',
    fontWeight: 500,
    padding: '14px 28px',
    borderRadius: 'var(--radius-pill)', // Pill CTA
    textDecoration: 'none',
    transition: 'transform 0.2s ease, opacity 0.2s ease',
    cursor: 'pointer',
  },
  secondaryPill: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
    color: 'var(--color-ink)',
    border: '1px solid var(--color-hairline-bright)',
    fontFamily: 'var(--font-sans)',
    fontSize: '15px',
    fontWeight: 500,
    padding: '14px 28px',
    borderRadius: 'var(--radius-pill)', // Pill CTA
    textDecoration: 'none',
    transition: 'background-color 0.2s ease, border-color 0.2s ease',
    cursor: 'pointer',
  },
};

// Add styles injection for hover micro-animations
if (typeof document !== 'undefined') {
  const css = `
    .btn-primary:hover {
      transform: translateY(-2px);
      opacity: 0.9;
    }
    .btn-secondary:hover {
      background-color: rgba(255, 255, 255, 0.05);
      border-color: var(--color-ink);
    }
    @media (max-width: 768px) {
      h1[style*="heading"] {
        font-size: 38px !important;
      }
      p[style*="description"] {
        font-size: 15px !important;
        line-height: 22px !important;
      }
    }
  `;
  const styleSheet = document.createElement("style");
  styleSheet.innerText = css;
  document.head.appendChild(styleSheet);
}
