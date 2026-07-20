import React, { useState } from 'react';
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


  const displayVideos: VideoItem[] = localVideosData as VideoItem[];

  const failedCount = Object.keys(videoErrors).filter(key => videoErrors[key]).length;
  if (displayVideos.length === 0 || failedCount === displayVideos.length) {
    return null;
  }

  const handleVideoError = (id: string) => {
    setVideoErrors((prev: Record<string, boolean>) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="work" style={styles.section}>
      <div className="container">
        
        <div style={styles.headerRow}>
          <div>
            <h2 style={styles.sectionTitle}>Showcase</h2>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div style={styles.grid} className="video-showcase-grid">
          {displayVideos.map((video) => {
            const hasError = videoErrors[video.id];
            const cleanName = video.title || video.fileName?.split('.').slice(0, -1).join('.') || 'Showcase';
            if (hasError) return null;

            return (
              <div key={video.id} style={styles.videoCard} className="video-hover-card">
                <div style={styles.videoWrapper}>
                  <video
                    style={styles.video}
                    src={video.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onError={() => handleVideoError(video.id)}
                  />

                  {/* Top Left File Name Badge */}
                  <span style={styles.categoryBadge}>{cleanName}</span>
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
    padding: '120px 0 60px 0',
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
    height: '400px', /* Fixed uniform height for grid alignment */
  },
  videoWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
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
