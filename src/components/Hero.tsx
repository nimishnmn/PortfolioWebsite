import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section style={styles.heroSection}>
      {/* Aurora Polar Gradient on the left */}
      <div className="aurora-left-container">
        <div className="aurora-glow"></div>
      </div>

      <div className="container" style={styles.container}>
        <span className="eyebrow" style={styles.eyebrow}>
          CREATIVE DIRECTION & MOTION DESIGN
        </span>
        
        <h1 style={styles.heading}>
          Designing the <br />
          <span style={styles.gradientText}>Future of Motion</span>.
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
    position: 'relative',
    padding: '220px 0 140px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    textAlign: 'left',
    overflow: 'hidden',
    minHeight: '85vh',
  },
  container: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
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
    letterSpacing: '-0.06em', // Sleek tightly-tracked Geist Display typography
    color: 'var(--color-ink)',
    maxWidth: '750px',
    marginBottom: '32px',
  },
  gradientText: {
    background: 'linear-gradient(135deg, #50e3c2 0%, var(--color-brand-orange) 50%, #7928ca 100%)',
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
    borderRadius: 'var(--radius-pill)', /* Small pill CTA */
    textDecoration: 'none',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    cursor: 'pointer',
  },
};

// Add styles injection for polar aurora animations
if (typeof document !== 'undefined') {
  const css = `
    .aurora-left-container {
      position: absolute;
      top: 0;
      left: -15%;
      width: 45%;
      height: 100%;
      z-index: 0;
      filter: blur(140px);
      opacity: 0.24;
      pointer-events: none;
      display: flex;
      align-items: center;
    }
    
    .aurora-glow {
      width: 100%;
      height: 80%;
      background: linear-gradient(
        180deg,
        #50e3c2 0%,    /* Aurora Green */
        #0070f3 40%,   /* Aurora Blue */
        #ff0080 70%,   /* Aurora Pink */
        #7928ca 100%   /* Aurora Purple */
      );
      border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
      animation: auroraWave 22s ease-in-out infinite alternate;
    }
    
    @keyframes auroraWave {
      0% {
        transform: rotate(0deg) scale(1) translate(0px, 0px);
      }
      50% {
        transform: rotate(90deg) scale(1.1) translate(20px, -40px);
        border-radius: 50% 40% 60% 40% / 50% 60% 40% 50%;
      }
      100% {
        transform: rotate(180deg) scale(1) translate(-10px, 10px);
      }
    }
    
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
      section[style*="heroSection"] {
        padding: 160px 0 100px 0 !important;
      }
      .aurora-left-container {
        width: 70% !important;
        left: -20% !important;
      }
    }
  `;
  const styleSheet = document.createElement("style");
  styleSheet.innerText = css;
  document.head.appendChild(styleSheet);
}
