import React from 'react';
import { Star, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={styles.footer}>
      <div className="container">
        <div style={styles.footerTop}>
          {/* Brand Info */}
          <div style={styles.brandCol}>
            <a href="#" style={styles.logo} onClick={scrollToTop}>
              <Star size={16} style={{ color: 'var(--color-brand-orange)' }} />
              NIMISH
            </a>
            <p style={styles.brandDesc}>
              Creative Director & Motion Designer. Crafting premium motion art and developer experiences.
            </p>
            <div style={styles.statusIndicator}>
              <span style={styles.statusDot} />
              <span style={styles.statusText}>All Systems Operational</span>
            </div>
          </div>

          {/* Links Grid */}
          <div style={styles.linksGrid}>
            <div style={styles.linksCol}>
              <span style={styles.colTitle}>Sitemap</span>
              <a href="#" style={styles.footerLink}>Home</a>
              <a href="#work" style={styles.footerLink}>Work</a>
              <a href="#about" style={styles.footerLink}>About</a>
              <a href="#contact" style={styles.footerLink}>Contact</a>
            </div>

            <div style={styles.linksCol}>
              <span style={styles.colTitle}>Socials</span>
              <a href="https://instagram.com/n1mish_" target="_blank" rel="noopener noreferrer" style={styles.footerLink}>Instagram</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={styles.footerLink}>Twitter / X</a>
              <a href="https://payhip.com/b/AKY5O" target="_blank" rel="noopener noreferrer" style={styles.footerLink}>Payhip Store</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={styles.footerLink}>GitHub</a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div style={styles.footerBottom}>
          <span style={styles.copyright}>
            © {new Date().getFullYear()} Nimish. Built with Geist Design Language.
          </span>
          <button onClick={scrollToTop} style={styles.topBtn} className="top-btn-hover">
            Back to Top
            <ArrowUp size={14} style={{ marginLeft: '4px' }} />
          </button>
        </div>
      </div>
    </footer>
  );
}

const styles: Record<string, React.CSSProperties> = {
  footer: {
    backgroundColor: 'var(--color-canvas)',
    borderTop: '1px solid var(--color-hairline)',
    padding: '80px 0 40px 0',
  },
  footerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '40px',
    marginBottom: '60px',
  },
  brandCol: {
    maxWidth: '320px',
  },
  logo: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: 700,
    fontSize: '15px',
    color: 'var(--color-ink)',
    textDecoration: 'none',
    marginBottom: '16px',
  },
  brandDesc: {
    fontSize: '13px',
    color: 'var(--color-body)',
    lineHeight: '19px',
    marginBottom: '20px',
  },
  statusIndicator: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(39, 201, 63, 0.08)',
    border: '1px solid rgba(39, 201, 63, 0.2)',
    padding: '6px 12px',
    borderRadius: 'var(--radius-sm)',
  },
  statusDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#27c93f',
    boxShadow: '0 0 8px #27c93f',
  },
  statusText: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: '#27c93f',
    fontWeight: 500,
  },
  linksGrid: {
    display: 'flex',
    gap: '80px',
    flexWrap: 'wrap',
  },
  linksCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  colTitle: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--color-mute)',
    marginBottom: '8px',
  },
  footerLink: {
    fontSize: '13px',
    color: 'var(--color-body)',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  footerBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid var(--color-hairline)',
    paddingTop: '32px',
    flexWrap: 'wrap',
    gap: '16px',
  },
  copyright: {
    fontSize: '12px',
    color: 'var(--color-mute)',
  },
  topBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    color: 'var(--color-body)',
    fontFamily: 'var(--font-sans)',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'color 0.2s',
  },
};

if (typeof document !== 'undefined') {
  const css = `
    a[style*="footerLink"]:hover {
      color: var(--color-ink) !important;
    }
    .top-btn-hover:hover {
      color: var(--color-brand-orange) !important;
    }
    @media (max-width: 640px) {
      div[style*="footerTop"] {
        flex-direction: column !important;
      }
      div[style*="linksGrid"] {
        gap: 40px !important;
      }
    }
  `;
  const styleSheet = document.createElement("style");
  styleSheet.innerText = css;
  document.head.appendChild(styleSheet);
}
