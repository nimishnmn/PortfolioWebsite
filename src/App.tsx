import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Showcase from './components/Showcase';
import ContactTerminal from './components/ContactTerminal';
import Footer from './components/Footer';

export default function App() {
  return (
    <div style={styles.app}>
      <Navbar />
      <main>
        {/* Fixed Background and Hero Content */}
        <Hero />
        
        {/* Floating Translucent Slab rising from bottom containing Showcase, Contact, and Footer */}
        <div style={styles.glassSlab}>
          <Showcase />
          <ContactTerminal />
          <Footer />
        </div>
      </main>
    </div>
  );
}

const styles = {
  app: {
    backgroundColor: '#050505', // Space black base
    minHeight: '100vh',
    position: 'relative' as const,
    overflowX: 'hidden' as const,
  },
  glassSlab: {
    position: 'relative' as const,
    zIndex: 2,
    marginTop: '100vh', // Places it directly on the second fold
    backgroundColor: 'rgba(10, 10, 10, 0.45)', // Translucent slab
    backdropFilter: 'blur(28px) saturate(160%)',
    WebkitBackdropFilter: 'blur(28px) saturate(160%)',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '32px 32px 0 0',
    boxShadow: '0 -20px 40px rgba(0, 0, 0, 0.6)',
  },
};
