import { Cpu, Sparkles } from 'lucide-react';

export default function About() {
  const skills = [
    { name: 'Motion Design', level: '95%' },
    { name: 'Creative Direction', level: '90%' },
    { name: '3D Modeling & VFX', level: '85%' },
    { name: 'Cinematic Sequencing', level: '92%' },
    { name: 'Layout Design', level: '88%' }
  ];

  return (
    <section id="about" style={styles.section}>
      <div className="container">
        <span className="eyebrow">PROFILE</span>
        <h2 style={styles.sectionTitle}>About Nimish</h2>

        <div style={styles.grid}>
          {/* Main profile layout card */}
          <div style={styles.profileCard}>
            <div style={styles.headerInfo}>
              <div style={styles.avatarWrapper}>
                {/* Custom animated orange N logo inspired by Instagram profile */}
                <div style={styles.avatarN}>N</div>
                <div style={styles.avatarSparkles}>
                  <Sparkles size={16} style={{ color: 'var(--color-brand-orange)' }} />
                </div>
              </div>
              <div>
                <h3 style={styles.profileName}>Nimish</h3>
                <p style={{ color: 'var(--color-brand-orange)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                  @n1mish_ · 18 y/o Artist
                </p>
              </div>
            </div>

            <p style={styles.profileBio}>
              I operate at the intersection of motion graphics, visual engineering, and raw direction. Drawing inspiration from cyberpunk themes, textured space art, and anime action sequences, I translate messages into frames that demand attention.
            </p>

            <div style={styles.specs}>
              <div style={styles.specItem}>
                <span style={styles.specLabel}>Role</span>
                <span style={styles.specValue}>Creative Director</span>
              </div>
              <div style={styles.specItem}>
                <span style={styles.specLabel}>Focus</span>
                <span style={styles.specValue}>Motion Graphics</span>
              </div>
              <div style={styles.specItem}>
                <span style={styles.specLabel}>Availability</span>
                <span style={styles.specValue}>Freelance / Contract</span>
              </div>
            </div>
          </div>

          {/* Tooling / Tech stack card */}
          <div style={styles.skillsCard}>
            <h3 style={styles.cardTitle}>
              <Cpu size={16} style={{ marginRight: '8px', color: 'var(--color-brand-orange)' }} />
              Capabilities & Workflow
            </h3>
            
            <div style={styles.skillsList}>
              {skills.map((skill, index) => (
                <div key={index} style={styles.skillItem}>
                  <div style={styles.skillHeader}>
                    <span style={styles.skillName}>{skill.name}</span>
                    <span style={styles.skillLevel}>{skill.level}</span>
                  </div>
                  <div style={styles.progressBarBg}>
                    <div style={{ ...styles.progressBarFill, width: skill.level }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.toolsTagbox}>
              <span style={styles.toolTag}>After Effects</span>
              <span style={styles.toolTag}>Cinema 4D</span>
              <span style={styles.toolTag}>Octane Render</span>
              <span style={styles.toolTag}>Premiere Pro</span>
              <span style={styles.toolTag}>Photoshop</span>
              <span style={styles.toolTag}>Figma</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: '100px 0',
    borderTop: '1px solid var(--color-hairline)',
  },
  sectionTitle: {
    fontSize: '32px',
    letterSpacing: '-0.04em',
    marginBottom: '40px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '32px',
  },
  profileCard: {
    backgroundColor: 'var(--color-canvas-elevated)',
    border: '1px solid var(--color-hairline)',
    borderRadius: 'var(--radius-md)',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: 'var(--shadow-whisper)',
  },
  headerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '24px',
  },
  avatarWrapper: {
    position: 'relative',
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-canvas)',
    border: '1px solid var(--color-hairline-bright)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarN: {
    fontFamily: 'var(--font-sans)',
    fontSize: '32px',
    fontWeight: 800,
    color: 'var(--color-brand-orange)',
    transform: 'skewX(-6deg)',
    lineHeight: 1,
  },
  avatarSparkles: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    backgroundColor: 'var(--color-canvas-elevated)',
    border: '1px solid var(--color-hairline)',
    borderRadius: '50%',
    padding: '2px',
  },
  profileName: {
    fontSize: '22px',
    fontWeight: 600,
    color: 'var(--color-ink)',
    marginBottom: '4px',
  },
  profileBio: {
    fontSize: '14px',
    lineHeight: '22px',
    color: 'var(--color-body)',
    marginBottom: '28px',
  },
  specs: {
    borderTop: '1px solid var(--color-hairline)',
    paddingTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
    flexWrap: 'wrap',
  },
  specItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  specLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: '10px',
    textTransform: 'uppercase',
    color: 'var(--color-mute)',
  },
  specValue: {
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--color-ink)',
  },
  skillsCard: {
    backgroundColor: 'var(--color-canvas-elevated)',
    border: '1px solid var(--color-hairline)',
    borderRadius: 'var(--radius-md)',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: 'var(--shadow-whisper)',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--color-ink)',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
  },
  skillsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    marginBottom: '28px',
  },
  skillItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  skillHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
  },
  skillName: {
    color: 'var(--color-ink)',
    fontWeight: 500,
  },
  skillLevel: {
    fontFamily: 'var(--font-mono)',
    color: 'var(--color-mute)',
  },
  progressBarBg: {
    height: '4px',
    backgroundColor: 'var(--color-canvas)',
    borderRadius: 'var(--radius-full)',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: 'var(--color-brand-orange)',
    borderRadius: 'var(--radius-full)',
  },
  toolsTagbox: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  toolTag: {
    fontSize: '12px',
    color: 'var(--color-body)',
    backgroundColor: 'var(--color-canvas)',
    border: '1px solid var(--color-hairline)',
    padding: '4px 10px',
    borderRadius: 'var(--radius-sm)',
  },
};

if (typeof document !== 'undefined') {
  const css = `
    @media (max-width: 768px) {
      div[style*="grid"] {
        grid-template-columns: 1fr !important;
      }
    }
  `;
  const styleSheet = document.createElement("style");
  styleSheet.innerText = css;
  document.head.appendChild(styleSheet);
}
