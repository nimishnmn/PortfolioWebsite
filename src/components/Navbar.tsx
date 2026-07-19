import React, { useState } from 'react';
import { Menu, X, Copy, Check, Star } from 'lucide-react';

export default function Navbar() {
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('nimish@example.com'); // Replace with actual email
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.navContainer} className="container">
        {/* Brand Logo */}
        <a href="#" style={styles.logo} className="glitch-text" data-text="NIMISH">
          <Star size={18} style={styles.logoIcon} />
          NIMISH
        </a>

        {/* Desktop Links */}
        <div style={styles.navLinks}>
          <a href="#work" style={styles.link}>Work</a>
          <a href="#about" style={styles.link}>About</a>
          <a href="#contact" style={styles.link}>Contact</a>
        </div>

        {/* Desktop Action (Bimodal: Nav button is 6px square) */}
        <div style={styles.navActions}>
          <button onClick={copyEmail} style={styles.navButton} className="copy-btn">
            {copied ? (
              <>
                <Check size={14} style={styles.buttonIcon} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={14} style={styles.buttonIcon} />
                Copy Email
              </>
            )}
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          style={styles.mobileTrigger}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div style={styles.mobileDrawer}>
          <a 
            href="#work" 
            style={styles.mobileLink} 
            onClick={() => setMobileMenuOpen(false)}
          >
            Work
          </a>
          <a 
            href="#about" 
            style={styles.mobileLink} 
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </a>
          <a 
            href="#contact" 
            style={styles.mobileLink} 
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </a>
          <button 
            onClick={() => { copyEmail(); setMobileMenuOpen(false); }} 
            style={styles.mobileButton}
          >
            {copied ? 'Copied Email' : 'Copy Email'}
          </button>
        </div>
      )}
    </nav>
  );
}

const styles: Record<string, React.CSSProperties> = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '64px',
    backgroundColor: 'rgba(5, 5, 5, 0.8)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid var(--color-hairline)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
  },
  navContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: 'var(--font-sans)',
    fontSize: '16px',
    fontWeight: 700,
    letterSpacing: '-0.03em',
    color: 'var(--color-ink)',
    textDecoration: 'none',
  },
  logoIcon: {
    color: 'var(--color-brand-orange)',
  },
  navLinks: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
    // Responsive behavior handled by standard CSS media queries or display hiding
  },
  link: {
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    fontWeight: 400,
    color: 'var(--color-body)',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    padding: '6px 12px',
    borderRadius: 'var(--radius-pill)',
  },
  navActions: {
    display: 'flex',
    alignItems: 'center',
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: 'var(--color-canvas-elevated)',
    color: 'var(--color-ink)',
    border: '1px solid var(--color-hairline)',
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    fontWeight: 500,
    padding: '8px 14px',
    borderRadius: 'var(--radius-sm)', // 6px tight square button matching Nav Spec
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  buttonIcon: {
    color: 'var(--color-body)',
  },
  mobileTrigger: {
    display: 'none', // Shown in media queries
    background: 'none',
    border: 'none',
    color: 'var(--color-ink)',
    cursor: 'pointer',
  },
  mobileDrawer: {
    position: 'absolute',
    top: '64px',
    left: 0,
    right: 0,
    backgroundColor: 'var(--color-canvas)',
    borderBottom: '1px solid var(--color-hairline)',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    zIndex: 999,
  },
  mobileLink: {
    fontSize: '16px',
    fontWeight: 500,
    color: 'var(--color-ink)',
    textDecoration: 'none',
    padding: '8px 0',
    borderBottom: '1px solid var(--color-faint)',
  },
  mobileButton: {
    backgroundColor: 'var(--color-brand-orange)',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: 'var(--radius-sm)',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
};

// Add raw CSS to support hover effects and media queries
if (typeof document !== 'undefined') {
  const css = `
    @media (max-width: 768px) {
      .copy-btn, a[href="#work"], a[href="#about"], a[href="#contact"] {
        display: none !important;
      }
      button[style*="mobileTrigger"] {
        display: block !important;
      }
    }
    
    .glitch-text:hover {
      color: var(--color-brand-orange) !important;
    }
    
    .copy-btn:hover {
      background-color: var(--color-hairline) !important;
      border-color: var(--color-hairline-bright) !important;
    }
    
    a[href^="#"]:hover {
      color: var(--color-ink) !important;
    }
  `;
  const styleSheet = document.createElement("style");
  styleSheet.innerText = css;
  document.head.appendChild(styleSheet);
}
