import React from 'react';
import { Cpu } from 'lucide-react';

export default function About() {
  const tools = ['After Effects', 'Blender', 'Premiere Pro', 'Figma'];

  return (
    <section id="about" style={styles.section}>
      <div className="container">
        <span className="eyebrow" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.15em' }}>TOOLS</span>
        <div style={styles.content}>
          <div style={styles.grid}>
            {tools.map((tool, i) => (
              <div key={i} style={styles.toolBadge} className="tool-badge-hover">
                <Cpu size={14} style={styles.toolIcon} />
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: '80px 0',
    borderTop: '1px solid var(--color-hairline)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: '24px',
  },
  grid: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  toolBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'var(--color-canvas-elevated)',
    border: '1px solid var(--color-hairline)',
    color: 'var(--color-ink)',
    fontSize: '13px',
    fontWeight: 500,
    fontFamily: 'var(--font-sans)',
    padding: '10px 20px',
    borderRadius: 'var(--radius-sm)', /* 6px tight square border radius */
    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
    cursor: 'default',
  },
  toolIcon: {
    color: 'var(--color-brand-orange)',
  },
};

// Add styles injection for hover micro-animations
if (typeof document !== 'undefined') {
  const css = `
    .tool-badge-hover:hover {
      border-color: var(--color-brand-orange) !important;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(255, 90, 31, 0.05);
    }
  `;
  const styleSheet = document.createElement("style");
  styleSheet.innerText = css;
  document.head.appendChild(styleSheet);
}
