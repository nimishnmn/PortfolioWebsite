import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import InfiniteStroke from './InfiniteStroke';

const AnimatedText = ({ text, delayOffset = 0, gradient = false }: { text: string; delayOffset?: number; gradient?: boolean }) => (
  <>
    {text.split(' ').map((word, i) => (
      <span
        key={i}
        style={{
          display: 'inline-block',
          animation: `revealWord 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
          animationDelay: `${delayOffset + i * 0.08}s`,
          opacity: 0,
          transform: 'translateY(15px)',
          ...(gradient ? styles.gradientText : {})
        }}
      >
        {word}&nbsp;
      </span>
    ))}
  </>
);

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [heroHidden, setHeroHidden] = useState(false);

  useEffect(() => {
    const container = document.querySelector('.hero-content-container');
    if (container) setTimeout(() => container.classList.add('is-visible'), 120);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      setHeroHidden(y > window.innerHeight * 0.75);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const slideStyle = {
    transform: `translateX(${-(scrollY * 1.15)}px)`,
    opacity: Math.max(0, 1 - scrollY / 400),
  };

  return (
    <section style={{ ...styles.heroSection, visibility: heroHidden ? 'hidden' as const : 'visible' }}>
      <InfiniteStroke scrollY={scrollY} heroHidden={heroHidden} />

      <div className="container hero-content-container reveal-stagger" style={{ ...styles.container, ...slideStyle }}>
        <span className="eyebrow" style={styles.eyebrow}>
          <AnimatedText text="Motion designer & creative director." delayOffset={0} />
        </span>

        <h1 style={styles.heading}>
          <AnimatedText text="Hi, I'm Nimish" delayOffset={0.3} />
          <br />
          <AnimatedText text="I " delayOffset={0.3 + 3 * 0.08} />
          <AnimatedText text="Love" gradient delayOffset={0.3 + 4 * 0.08} />
          <AnimatedText text=" to create Videos" delayOffset={0.3 + 5 * 0.08} />
        </h1>

        <div style={styles.ctaGroup}>
          <a href="#work" style={styles.minimalButton} className="btn-minimal">
            View Work
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
    overflow: 'hidden',
    backgroundColor: '#050505',
  },
  container: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    pointerEvents: 'auto',
    willChange: 'transform, opacity',
    transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
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
    transition: 'background-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    cursor: 'pointer',
  },
};
