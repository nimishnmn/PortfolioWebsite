import React from 'react';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="container">
        <div style={styles.footerBottom}>
          {/* Copyright on the Left */}
          <span style={styles.copyright}>
            © {new Date().getFullYear()} Nimish. Built with Geist.
          </span>

          {/* Social Links on the Right */}
          <div style={styles.socialGroup}>
            <a href="https://x.com/nifee_x" target="_blank" rel="noopener noreferrer" style={styles.footerLink} className="footer-social-link">X</a>
            <span style={styles.divider}>/</span>
            <a href="https://instagram.com/n1mish_" target="_blank" rel="noopener noreferrer" style={styles.footerLink} className="footer-social-link">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles: Record<string, React.CSSProperties> = {
  footer: {
    backgroundColor: 'transparent', // Fits inside the translucent glass slab
    padding: '48px 0',
  },
  footerBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '24px',
    width: '100%',
    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
    paddingTop: '32px',
  },
  socialGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  divider: {
    color: 'rgba(255, 255, 255, 0.15)',
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
};
