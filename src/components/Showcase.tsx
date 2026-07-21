import { useState, useEffect, useRef, useCallback } from 'react';
import localVideosData from '../assets/videos.json';
import { useReveal } from '../lib/useReveal';

interface VideoItem {
  id: string;
  title: string;
  url: string;
  fileName?: string;
  category?: string;
  description?: string;
}

function LazyVideo({ src, onError, onAspectRatio }: { src: string; onError: () => void; onAspectRatio: (r: number) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { rootMargin: '0px 0px 100px 0px', threshold: 0.01 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isIntersecting) video.play().catch(() => {});
    else video.pause();
  }, [isIntersecting]);

  const extractRatio = useCallback(() => {
    const video = videoRef.current;
    if (video && video.videoWidth && video.videoHeight) {
      onAspectRatio(video.videoWidth / video.videoHeight);
    }
  }, [onAspectRatio]);

  // Robust check for cached videos that already have metadata on mount
  useEffect(() => {
    const video = videoRef.current;
    if (video && video.readyState >= 1) { // HAVE_METADATA or higher
      extractRatio();
    }
  }, [extractRatio]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  return (
    <video
      ref={videoRef}
      style={{ ...styles.video, cursor: 'pointer' }}
      src={src}
      preload="metadata"
      loop
      muted
      playsInline
      onClick={togglePlay}
      onError={onError}
      onLoadedMetadata={extractRatio}
    />
  );
}

function VideoRow({ row, rowIdx, onError }: { row: VideoItem[]; rowIdx: number; onError: (id: string) => void }) {
  const rowRef = useReveal(0.05);
  const [ratios, setRatios] = useState<(number | null)[]>([null, null]);
  const video1 = row[0];
  const video2 = row[1];

  const defaultRatio = 16 / 9;
  const r1 = ratios[0] ?? defaultRatio;
  const r2 = ratios[1] ?? defaultRatio;

  return (
    <div
      ref={rowRef as React.RefObject<HTMLDivElement>}
      style={{ ...styles.row, transitionDelay: `${rowIdx * 60}ms` }}
      className="justified-video-row reveal"
    >
      <VideoCard video={video1} onError={onError} flex={r1} onAspectRatio={r => setRatios(prev => [r, prev[1]])} />
      {video2
        ? <VideoCard video={video2} onError={onError} flex={r2} onAspectRatio={r => setRatios(prev => [prev[0], r])} />
        : <div style={styles.spacerCard} />
      }
    </div>
  );
}

function VideoCard({ video, onError, flex, onAspectRatio }: { video: VideoItem; onError: (id: string) => void; flex: number; onAspectRatio: (r: number) => void }) {
  return (
    <div style={{ ...styles.videoCard, flexGrow: flex, flexShrink: 1, flexBasis: 0 }} className="video-hover-card">
      <div style={styles.videoWrapper}>
        <LazyVideo src={video.url} onError={() => onError(video.id)} onAspectRatio={onAspectRatio} />
      </div>
    </div>
  );
}

export default function Showcase() {
  const [videoErrors, setVideoErrors] = useState<Record<string, boolean>>({});
  const titleRef = useReveal(0.2);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Window-level wheel capture
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const slab = sectionRef.current?.closest('.glass-slab') as HTMLElement | null;
      if (!slab) return;

      const slabRect = slab.getBoundingClientRect();
      const isSticky = slabRect.top >= -1 && slabRect.top <= 4;

      if (!isSticky) return;

      const atTop = container.scrollTop <= 0;
      const atBottom =
        container.scrollTop + container.clientHeight >= container.scrollHeight - 1;

      // At boundary: let the event reach the page → seamless page scroll
      if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) return;

      e.preventDefault();
      container.scrollBy({ top: e.deltaY });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  const displayVideos: VideoItem[] = (localVideosData as VideoItem[]).filter(
    v => !videoErrors[v.id]
  );

  const handleVideoError = (id: string) =>
    setVideoErrors(prev => ({ ...prev, [id]: true }));

  if (displayVideos.length === 0) return null;

  const rows: VideoItem[][] = [];
  for (let i = 0; i < displayVideos.length; i += 2) {
    rows.push(displayVideos.slice(i, i + 2));
  }

  return (
    <section id="work" ref={sectionRef} style={styles.section}>
      <div className="showcase-layout-container" style={styles.flexLayout}>

        <div style={styles.leftCol} className="showcase-left-col">
          <h2
            ref={titleRef as React.RefObject<HTMLHeadingElement>}
            style={styles.sectionTitle}
            className="reveal showcase-title"
          >
            Showcase
          </h2>

          <div className="showcase-socials" style={styles.socials}>
            <a
              href="https://www.instagram.com/n1mish_/"
              target="_blank"
              rel="noreferrer"
              style={styles.socialLink}
              className="footer-social-link"
            >
              Instagram
            </a>
            <a
              href="https://x.com/nifee_x"
              target="_blank"
              rel="noreferrer"
              style={styles.socialLink}
              className="footer-social-link"
            >
              X
            </a>
          </div>
        </div>

        <div style={styles.rightCol} className="showcase-right-col">
          <div
            ref={scrollRef}
            className="showcase-scroll-container"
            style={styles.scrollContainer}
          >
            {rows.map((row, rowIdx) => (
              <VideoRow
                key={rowIdx}
                row={row}
                rowIdx={rowIdx}
                onError={handleVideoError}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    position: 'relative',
    height: '100%',
    boxSizing: 'border-box',
    background: 'linear-gradient(160deg, rgba(40,12,5,0.0) 0%, rgba(60,18,8,0.15) 40%, rgba(30,10,5,0.0) 100%)',
    borderTop: '1px solid rgba(255,90,31,0.14)',
  },
  flexLayout: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '48px',
    alignItems: 'stretch',
    padding: '0 5%',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
  },
  leftCol: {
    paddingTop: '56px',
    width: '28%',
    flexShrink: 0,
  },
  rightCol: {
    width: '72%',
    flexGrow: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  scrollContainer: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px', // Absolute constant margin between rows
    paddingTop: '56px',
    paddingBottom: '56px',
    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 120px)',
    maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 120px)',
  },
  sectionTitle: {
    fontSize: 'clamp(32px, 6vw, 64px)',
    fontWeight: 700,
    letterSpacing: '-0.05em',
    color: '#ffffff',
    lineHeight: '1.05',
    margin: 0,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: '24px', // Absolute constant margin horizontally
    alignItems: 'flex-start',
    contentVisibility: 'auto',
    containIntrinsicSize: 'auto 340px',
  },
  videoCard: {
    background: 'linear-gradient(135deg, rgba(30,12,5,0.55) 0%, rgba(15,6,3,0.8) 100%)',
    border: '1px solid rgba(255,90,31,0.12)',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column' as const,
    minWidth: 0,
    boxShadow: 'inset 0 1px 0 rgba(255,120,60,0.06), 0 4px 24px rgba(0,0,0,0.4)',
    position: 'relative',
  },
  spacerCard: {
    flexGrow: 1.777, // Provide a generic weight if it's an odd video out
    flexShrink: 1,
    flexBasis: 0,
    visibility: 'hidden' as const,
  },
  videoWrapper: {
    position: 'relative',
    width: '100%',
    borderRadius: 'inherit',
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: 'auto',
    display: 'block',
    borderRadius: 'inherit',
  },
  categoryBadge: {
    position: 'absolute',
    top: '16px',
    left: '16px',
    fontFamily: 'var(--font-mono)',
    fontSize: '10px',
    textTransform: 'uppercase' as const,
    color: '#ffffff',
    backgroundColor: 'rgba(5,5,5,0.8)',
    border: '1px solid rgba(255,255,255,0.08)',
    padding: '4px 8px',
    borderRadius: 'var(--radius-sm)',
  },
  socials: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  socialLink: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    fontWeight: 400,
    letterSpacing: '0.01em',
    color: 'var(--color-mute)',
    textDecoration: 'none',
    width: 'fit-content',
    transition: 'color 0.2s ease',
  },
};
