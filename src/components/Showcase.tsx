import React, { useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, ExternalLink, Film } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  duration: string;
  previewUrl: string;
}

export default function Showcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);

  // High-quality, fast-loading abstract space/starfield motion design loop video
  const videoSourceUrl = 'https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1611-large.mp4';

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(e => console.log("Play failed: ", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const projects: Project[] = [
    {
      id: '1',
      title: 'Cosmic Drift — Motion Identity',
      category: 'Motion Design',
      description: 'A dark, textured typographic logo animation exploring cosmic space physics and 3D kinetic lettering.',
      tags: ['Cinema 4D', 'After Effects', 'Octane'],
      duration: '0:15 Loop',
      previewUrl: '#'
    },
    {
      id: '2',
      title: 'ZORO Anime Glitch Reel',
      category: 'Creative Direction',
      description: 'High-contrast, stylized manga compilation leveraging chromatic aberration, grain overlay, and custom transitions.',
      tags: ['Premiere Pro', 'Motion Design', 'Sound Design'],
      duration: '0:30 Reel',
      previewUrl: '#'
    },
    {
      id: '3',
      title: 'Vercel Geist Interactive UI Reel',
      category: 'UI Motion',
      description: 'Dynamic 3D mockups showcasing interface transitions and pixel-perfect developer component assemblies.',
      tags: ['Figma', 'Rive', 'WebGl'],
      duration: '0:45 Case Study',
      previewUrl: '#'
    }
  ];

  return (
    <section id="work" style={styles.section}>
      <div className="container">
        <span className="eyebrow">SHOWCASE</span>
        <h2 style={styles.sectionTitle}>Featured Video Reel</h2>
        
        {/* Main Video Showcase Box (Design principle: rounded corners, hairline border, shadow) */}
        <div style={styles.videoCard}>
          <div style={styles.videoWrapper}>
            {!videoError ? (
              <video
                ref={videoRef}
                style={styles.video}
                src={videoSourceUrl}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                onError={() => setVideoError(true)}
              />
            ) : (
              /* Fallback beautiful motion design look if video is blocked/offline */
              <div style={styles.fallbackPlayer}>
                <div style={styles.fallbackBackground}></div>
                <div style={styles.fallbackContent}>
                  <Film size={48} style={{ color: 'var(--color-brand-orange)', marginBottom: '16px' }} />
                  <p style={{ color: 'var(--color-ink)', fontWeight: 600, fontSize: '18px' }}>Cosmic Motion Loop</p>
                  <p style={{ color: 'var(--color-mute)', fontSize: '14px', marginTop: '4px' }}>Active Loop Fallback Enabled</p>
                </div>
              </div>
            )}

            {/* Video Controls Overlay */}
            <div style={styles.controlsOverlay}>
              <div style={styles.controlsLeft}>
                <button onClick={togglePlay} style={styles.circularButton} title={isPlaying ? "Pause" : "Play"}>
                  {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
                </button>
                <button onClick={toggleMute} style={styles.circularButton} title={isMuted ? "Unmute" : "Mute"}>
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>
              <span style={styles.videoBadge}>REEL_LOOP_NIMISH.MP4</span>
            </div>
          </div>
        </div>

        {/* Project Grid - Styled as Geist hairline Cards */}
        <h3 style={styles.subHeading}>Selected Projects</h3>
        <div style={styles.grid}>
          {projects.map((proj) => (
            <div key={proj.id} style={styles.projectCard} className="proj-card">
              <div style={styles.cardHeader}>
                <span style={styles.cardCategory}>{proj.category}</span>
                <span style={styles.cardDuration}>{proj.duration}</span>
              </div>
              
              <h4 style={styles.cardTitle}>{proj.title}</h4>
              <p style={styles.cardDescription}>{proj.description}</p>
              
              <div style={styles.cardFooter}>
                <div style={styles.tagsContainer}>
                  {proj.tags.map((tag, i) => (
                    <span key={i} style={styles.tag}>{tag}</span>
                  ))}
                </div>
                <a href={proj.previewUrl} style={styles.cardLink}>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: '100px 0',
    borderTop: '1px solid var(--color-hairline)',
    position: 'relative',
  },
  sectionTitle: {
    fontSize: '32px',
    letterSpacing: '-0.04em',
    marginBottom: '40px',
  },
  videoCard: {
    backgroundColor: 'var(--color-canvas-elevated)',
    border: '1px solid var(--color-hairline-bright)',
    borderRadius: 'var(--radius-lg)', /* Large rounded corners */
    overflow: 'hidden',
    boxShadow: 'var(--shadow-floating)',
    marginBottom: '80px',
  },
  videoWrapper: {
    position: 'relative',
    width: '100%',
    aspectRatio: '16/9',
    backgroundColor: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  controlsOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '20px',
    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 100%)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  controlsLeft: {
    display: 'flex',
    gap: '12px',
  },
  circularButton: {
    width: '40px',
    height: '40px',
    borderRadius: 'var(--radius-full)', /* Circular button */
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s, border-color 0.2s',
  },
  videoBadge: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: 'rgba(255, 255, 255, 0.6)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '4px 10px',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  subHeading: {
    fontSize: '20px',
    letterSpacing: '-0.02em',
    marginBottom: '24px',
    color: 'var(--color-ink)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px',
  },
  projectCard: {
    backgroundColor: 'var(--color-canvas-elevated)',
    border: '1px solid var(--color-hairline)',
    borderRadius: 'var(--radius-md)', /* 12px card border radius matching spec */
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '220px',
    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  cardCategory: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: 'var(--color-brand-orange)',
    fontWeight: 500,
    textTransform: 'uppercase',
  },
  cardDuration: {
    fontSize: '12px',
    color: 'var(--color-mute)',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--color-ink)',
    marginBottom: '8px',
  },
  cardDescription: {
    fontSize: '13px',
    lineHeight: '19px',
    color: 'var(--color-body)',
    marginBottom: '20px',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  tagsContainer: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
  },
  tag: {
    fontFamily: 'var(--font-sans)',
    fontSize: '11px',
    color: 'var(--color-mute)',
    backgroundColor: 'var(--color-canvas)',
    border: '1px solid var(--color-hairline)',
    padding: '2px 8px',
    borderRadius: 'var(--radius-sm)',
  },
  cardLink: {
    color: 'var(--color-body)',
    transition: 'color 0.2s',
    display: 'inline-flex',
    alignItems: 'center',
  },
  fallbackPlayer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  fallbackBackground: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at center, rgba(255, 90, 31, 0.08) 0%, rgba(121, 40, 202, 0.08) 40%, rgba(0,0,0,0) 80%)',
    animation: 'pulseBackground 8s ease-in-out infinite alternate',
  },
  fallbackContent: {
    zIndex: 1,
    textAlign: 'center',
  },
};
