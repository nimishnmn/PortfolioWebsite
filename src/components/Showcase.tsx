import React, { useState } from 'react';
import { Film, ExternalLink } from 'lucide-react';
import localVideosData from '../assets/videos.json';

interface VideoItem {
  id: string;
  title: string;
  url: string;
  fileName?: string;
  category?: string;
  description?: string;
}

export default function Showcase() {
  const [videoErrors, setVideoErrors] = useState<Record<string, boolean>>({});

  // Premium stock loop video fallbacks for demonstration when public/videos is empty
  const defaultVideos: VideoItem[] = [
    {
      id: 'default-1',
      title: 'Cosmic Starfield Loop',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1611-large.mp4',
      category: 'Space Motion',
      description: 'Abstract particle space simulation exploring granular noise textures and depth of field.'
    },
    {
      id: 'default-2',
      title: 'Neon Motion Laser Loop',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-31908-large.mp4',
      category: 'Motion Design',
      description: 'Chroma wave light streaks animated to simulate neon speedways and kinetic flows.'
    },
    {
      id: 'default-3',
      title: 'Cyber Netlines Loop',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-neon-light-stripes-background-31920-large.mp4',
      category: 'Visual Effects',
      description: 'Vector paths shifting coordinates in 3D space with high-speed rendering glows.'
    },
    {
      id: 'default-4',
      title: 'Chromatic Grid Loop',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-glowing-lines-loop-32986-large.mp4',
      category: 'Typography/UI',
      description: 'A 2.5D geometric projection exploring UI layout grid lines and kinetic triggers.'
    }
  ];

  const displayVideos: VideoItem[] = localVideosData.length > 0 
    ? (localVideosData as VideoItem[]).map((v) => ({
        ...v,
        category: 'Local Work',
        description: `Imported portfolio video file: ${v.fileName || 'Reel'}`
      }))
    : defaultVideos;

  const handleVideoError = (id: string) => {
    setVideoErrors((prev: Record<string, boolean>) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="work" style={styles.section}>
      <div className="container">
        <span className="eyebrow">PORTFOLIO</span>
        
        <div style={styles.headerRow}>
          <div>
            <h2 style={styles.sectionTitle}>Motion Design Showcase</h2>
            <p style={styles.subText}>
              {localVideosData.length > 0 
                ? `Active Loadout: Playing ${displayVideos.length} custom video(s) in parallel loop.` 
                : 'Showing default visual loops. Upload your own video files to /public/videos/ and run update command.'
              }
            </p>
          </div>
          {localVideosData.length > 0 && (
            <span style={styles.countBadge}>
              {displayVideos.length} REELS LOADED
            </span>
          )}
        </div>

        {/* 2-Column Grid (dynamically growing vertically) */}
        <div style={styles.grid} className="video-showcase-grid">
          {displayVideos.map((video) => {
            const hasError = videoErrors[video.id];
            
            return (
              <div key={video.id} style={styles.videoCard} className="video-hover-card">
                <div style={styles.videoWrapper}>
                  {!hasError ? (
                    <video
                      style={styles.video}
                      src={video.url}
                      autoPlay
                      loop
                      muted
                      playsInline
                      onError={() => handleVideoError(video.id)}
                    />
                  ) : (
                    /* Fallback design when video fails to load */
                    <div style={styles.fallbackPlayer}>
                      <Film size={36} style={{ color: 'var(--color-brand-orange)', marginBottom: '12px' }} />
                      <p style={{ color: 'var(--color-ink)', fontWeight: 600, fontSize: '14px' }}>Asset Unavailable</p>
                      <p style={{ color: 'var(--color-mute)', fontSize: '11px', textAlign: 'center', padding: '0 16px' }}>
                        {video.fileName || 'Check URL / local asset connection.'}
                      </p>
                    </div>
                  )}

                  {/* Top Category Badge */}
                  <span style={styles.categoryBadge}>{video.category}</span>
                </div>

                {/* Info Box */}
                <div style={styles.cardInfo}>
                  <div style={styles.infoTitleRow}>
                    <h3 style={styles.videoTitle}>{video.title}</h3>
                    <a href={video.url} target="_blank" rel="noopener noreferrer" style={styles.linkIcon} title="Direct File Link">
                      <ExternalLink size={14} />
                    </a>
                  </div>
                  {video.description && (
                    <p style={styles.videoDesc}>{video.description}</p>
                  )}
                </div>
              </div>
            );
          })}
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
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '48px',
  },
  sectionTitle: {
    fontSize: '32px',
    letterSpacing: '-0.04em',
    marginBottom: '8px',
  },
  subText: {
    color: 'var(--color-body)',
    fontSize: '14px',
    maxWidth: '500px',
  },
  countBadge: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: 'var(--color-brand-orange)',
    backgroundColor: 'var(--color-brand-orange-soft)',
    border: '1px solid var(--color-brand-orange)',
    padding: '6px 12px',
    borderRadius: 'var(--radius-sm)',
    fontWeight: 600,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)', /* Horizontally 2 videos by default */
    gap: '32px',
  },
  videoCard: {
    backgroundColor: 'var(--color-canvas-elevated)',
    border: '1px solid var(--color-hairline)',
    borderRadius: 'var(--radius-lg)', /* Rounded corners */
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  videoWrapper: {
    position: 'relative',
    width: '100%',
    aspectRatio: '16/9',
    backgroundColor: '#000000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '1px solid var(--color-hairline)',
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  fallbackPlayer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'radial-gradient(circle at center, rgba(255, 90, 31, 0.05) 0%, rgba(0,0,0,0) 70%)',
  },
  categoryBadge: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    fontFamily: 'var(--font-mono)',
    fontSize: '10px',
    textTransform: 'uppercase',
    color: '#ffffff',
    backgroundColor: 'rgba(5, 5, 5, 0.7)',
    backdropFilter: 'blur(4px)',
    border: '1px solid var(--color-hairline-bright)',
    padding: '4px 8px',
    borderRadius: 'var(--radius-sm)',
  },
  cardInfo: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  infoTitleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  videoTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--color-ink)',
    letterSpacing: '-0.02em',
  },
  linkIcon: {
    color: 'var(--color-mute)',
    transition: 'color 0.2s',
  },
  videoDesc: {
    fontSize: '13px',
    lineHeight: '19px',
    color: 'var(--color-body)',
  },
};

// CSS injection for hover micro-animations and dynamic styling
if (typeof document !== 'undefined') {
  const css = `
    .video-hover-card {
      transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s, box-shadow 0.35s;
    }
    
    .video-hover-card:hover {
      transform: scale(1.035); /* Smooth cursor hover scale effect */
      border-color: var(--color-brand-orange) !important;
      box-shadow: 0 16px 40px rgba(255, 90, 31, 0.08), 0 0 0 1.5px var(--color-brand-orange);
    }
    
    .video-hover-card:hover a[style*="linkIcon"] {
      color: var(--color-brand-orange) !important;
    }
    
    @media (max-width: 768px) {
      .video-showcase-grid {
        grid-template-columns: 1fr !important; /* Stack vertically on small screens */
        gap: 20px !important;
      }
    }
  `;
  const styleSheet = document.createElement("style");
  styleSheet.innerText = css;
  document.head.appendChild(styleSheet);
}
