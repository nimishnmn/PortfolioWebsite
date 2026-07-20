import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={styles.footer}>
      <div className="container">
        <div style={styles.footerBottom}>
          {/* Social Links on the Left */}
          <div style={styles.socialGroup}>
            <a href="https://x.com/nifee_x" target="_blank" rel="noopener noreferrer" style={styles.footerLink} className="footer-social-link">X</a>
            <span style={styles.divider}>/</span>
            <a href="https://instagram.com/n1mish_" target="_blank" rel="noopener noreferrer" style={styles.footerLink} className="footer-social-link">Instagram</a>
          </div>

          {/* Copyright in the Middle */}
          <span style={styles.copyright}>
            © {new Date().getFullYear()} Nimish. Built with Geist.
          </span>

          {/* Back to Top on the Right */}
          <button onClick={scrollToTop} style={styles.topBtn} className="top-btn-hover">
            Back to Top
            <ArrowUp size={13} style={{ marginLeft: '4px' }} />
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
    padding: '48px 0',
  },
  footerBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '24px',
    width: '100%',
  },
  socialGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  divider: {
    color: 'var(--color-hairline-bright)',
    fontSize: '13px',
    userSelect: 'none',
  },
  footerLink: {
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--color-body)',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  copyright: {
    fontSize: '13px',
    color: 'var(--color-mute)',
  },
  topBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    color: 'var(--color-body)',
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'color 0.2s',
    padding: 0,
  },
};

if (typeof document !== 'undefined') {
  const css = `
    .footer-social-link:hover {
      color: var(--color-ink) !important;
    }
    .top-btn-hover:hover {
      color: var(--color-brand-orange) !important;
    }
    @media (max-width: 640px) {
      div[style*="footerBottom"] {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 16px !important;
      }
    }
  `;
  const styleSheet = document.createElement("style");
  styleSheet.innerText = css;
  document.head.appendChild(styleSheet);
}
