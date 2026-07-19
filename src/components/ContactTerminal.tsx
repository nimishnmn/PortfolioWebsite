import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { Terminal, Send, CheckCircle2, AlertTriangle, Play } from 'lucide-react';

export default function ContactTerminal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    'Initializing contact terminal...',
    'System: Ready for user input.'
  ]);
  const [success, setSuccess] = useState(false);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      addLog('ERR: Missing required fields (name, email, message)');
      return;
    }

    setLoading(true);
    addLog(`POST /api/inquiry - sender: ${email}`);

    try {
      const payload = { name, email, message };
      
      // Attempt insert
      const { error } = await supabase.from('messages').insert(payload);

      if (error) throw error;

      addLog(`STATUS: 201 Created`);
      if (isSupabaseConfigured) {
        addLog('SUCCESS: Sync with database cluster complete.');
      } else {
        addLog('WARN: Supabase credentials not found. Message buffered in localStorage.');
      }
      
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      console.error(err);
      addLog(`ERR: ${err.message || 'Unknown network error'}`);
    } finally {
      setLoading(false);
    }
  };

  const resetTerminal = () => {
    setSuccess(false);
    setLogs([
      'Initializing contact terminal...',
      'System: Ready for user input.'
    ]);
  };

  return (
    <section id="contact" style={styles.section}>
      <div className="container">
        <span className="eyebrow" style={{ fontFamily: 'var(--font-mono)' }}>CONNECT.EXE</span>
        <h2 style={styles.sectionTitle}>Get In Touch</h2>

        {/* Supabase status warning if not set */}
        {!isSupabaseConfigured && (
          <div style={styles.warningBanner}>
            <AlertTriangle size={16} style={{ color: 'var(--color-brand-orange)' }} />
            <p style={styles.warningText}>
              Supabase backend is currently operating in <strong>Demo Mode</strong>. Message submissions will be saved to your local storage cache. Add environment variables to connect a live database.
            </p>
          </div>
        )}

        <div style={styles.terminalContainer}>
          {/* Terminal Title Bar */}
          <div style={styles.terminalHeader}>
            <div style={styles.terminalDots}>
              <span style={{ ...styles.dot, backgroundColor: '#ff5f56' }} />
              <span style={{ ...styles.dot, backgroundColor: '#ffbd2e' }} />
              <span style={{ ...styles.dot, backgroundColor: '#27c93f' }} />
            </div>
            <span style={styles.terminalTitle}>
              <Terminal size={14} style={{ marginRight: '6px' }} />
              nimish_inquiry_daemon.sh
            </span>
            <div style={{ width: '40px' }} />
          </div>

          {/* Terminal Body */}
          <div style={styles.terminalBody}>
            {/* System logs output */}
            <div style={styles.consoleLogs}>
              {logs.map((log, index) => (
                <div key={index} style={styles.logLine}>
                  <span style={styles.logPrompt}>$</span> {log}
                </div>
              ))}
            </div>

            {success ? (
              <div style={styles.successWrapper}>
                <CheckCircle2 size={40} style={styles.successIcon} />
                <h4 style={styles.successTitle}>Inquiry Sent Successfully</h4>
                <p style={styles.successText}>
                  Your message has been captured. Nimish will get back to you shortly.
                </p>
                <button onClick={resetTerminal} style={styles.resetButton}>
                  <Play size={12} fill="currentColor" style={{ marginRight: '6px' }} />
                  Run inquiry_daemon.sh again
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={styles.form}>
                {/* Code syntax declaration form styling */}
                <div style={styles.codeLine}>
                  <span style={styles.keyword}>const</span> <span style={styles.variable}>visitorName</span> = <span style={styles.string}>"</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    style={styles.terminalInput}
                    required
                  />
                  <span style={styles.string}>"</span>;
                </div>

                <div style={styles.codeLine}>
                  <span style={styles.keyword}>const</span> <span style={styles.variable}>contactEmail</span> = <span style={styles.string}>"</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    style={styles.terminalInput}
                    required
                  />
                  <span style={styles.string}>"</span>;
                </div>

                <div style={styles.codeLine} className="msg-line">
                  <span style={styles.keyword}>const</span> <span style={styles.variable}>messageBody</span> = <span style={styles.string}>`</span>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your creative project brief..."
                    style={styles.terminalTextarea}
                    rows={4}
                    required
                  />
                  <span style={styles.string}>`</span>;
                </div>

                {/* Submitting button (Bimodal: App interface buttons are tight 6px squares) */}
                <button type="submit" disabled={loading} style={styles.submitButton}>
                  <Send size={14} style={{ marginRight: '8px' }} />
                  {loading ? 'Executing...' : 'Execute Submission'}
                </button>
              </form>
            )}
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
    marginBottom: '32px',
  },
  warningBanner: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
    backgroundColor: 'var(--color-brand-orange-soft)',
    border: '1px solid var(--color-brand-orange)',
    borderRadius: 'var(--radius-sm)',
    padding: '12px 16px',
    marginBottom: '24px',
  },
  warningText: {
    color: '#fff',
    fontSize: '13px',
    lineHeight: '19px',
  },
  terminalContainer: {
    backgroundColor: 'var(--color-canvas-elevated)',
    border: '1px solid var(--color-hairline)',
    borderRadius: 'var(--radius-md)', /* 12px radius */
    boxShadow: 'var(--shadow-floating)',
    overflow: 'hidden',
  },
  terminalHeader: {
    backgroundColor: '#0a0a0a',
    borderBottom: '1px solid var(--color-hairline)',
    padding: '12px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  terminalDots: {
    display: 'flex',
    gap: '8px',
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
  },
  terminalTitle: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-mute)',
    display: 'flex',
    alignItems: 'center',
  },
  terminalBody: {
    padding: '24px',
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
  },
  consoleLogs: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    marginBottom: '28px',
    color: 'var(--color-mute)',
  },
  logLine: {
    lineHeight: '18px',
  },
  logPrompt: {
    color: 'var(--color-brand-orange)',
    marginRight: '6px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  codeLine: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    lineHeight: '24px',
    color: 'var(--color-ink)',
  },
  keyword: {
    color: '#ff79c6', // Pink code keyword
    marginRight: '6px',
  },
  variable: {
    color: '#8be9fd', // Cyan variable
    marginRight: '6px',
  },
  string: {
    color: '#f1fa8c', // Yellow string quotes
  },
  terminalInput: {
    background: 'none',
    border: 'none',
    borderBottom: '1px dashed var(--color-faint)',
    color: '#50fa7b', // Green string content
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    padding: '2px 4px',
    outline: 'none',
    width: '220px',
  },
  terminalTextarea: {
    background: 'var(--color-canvas)',
    border: '1px solid var(--color-hairline)',
    borderRadius: 'var(--radius-sm)',
    color: '#50fa7b',
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    padding: '8px 12px',
    outline: 'none',
    width: '100%',
    maxWidth: '600px',
    marginTop: '8px',
    marginBottom: '4px',
    resize: 'vertical',
  },
  submitButton: {
    display: 'inline-flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'var(--color-ink)',
    color: 'var(--color-canvas)',
    border: 'none',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    fontWeight: 500,
    padding: '10px 18px',
    borderRadius: 'var(--radius-sm)', /* Functional app button is 6px square */
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  successWrapper: {
    textAlign: 'center',
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  successIcon: {
    color: 'var(--color-brand-orange)',
    marginBottom: '16px',
  },
  successTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--color-ink)',
    marginBottom: '8px',
  },
  successText: {
    fontSize: '14px',
    color: 'var(--color-body)',
    maxWidth: '400px',
    lineHeight: '20px',
    marginBottom: '24px',
  },
  resetButton: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: 'var(--color-canvas-elevated)',
    color: 'var(--color-ink)',
    border: '1px solid var(--color-hairline-bright)',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    padding: '8px 16px',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};

if (typeof document !== 'undefined') {
  const css = `
    input[style*="terminalInput"]:focus {
      border-bottom-color: var(--color-brand-orange) !important;
    }
    textarea[style*="terminalTextarea"]:focus {
      border-color: var(--color-brand-orange) !important;
      background-color: rgba(255, 90, 31, 0.02) !important;
    }
    button[style*="submitButton"]:hover {
      background-color: var(--color-brand-orange) !important;
      color: white !important;
    }
    button[style*="resetButton"]:hover {
      background-color: rgba(255, 255, 255, 0.05) !important;
      border-color: var(--color-ink) !important;
    }
    @media (max-width: 640px) {
      .msg-line {
        flex-direction: column !important;
        align-items: flex-start !important;
      }
      input[style*="terminalInput"] {
        width: 100% !important;
      }
    }
  `;
  const styleSheet = document.createElement("style");
  styleSheet.innerText = css;
  document.head.appendChild(styleSheet);
}
