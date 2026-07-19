import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Showcase from './components/Showcase';
import About from './components/About';
import ContactTerminal from './components/ContactTerminal';
import Footer from './components/Footer';

export default function App() {
  return (
    <div style={styles.app}>
      <Navbar />
      <main>
        <Hero />
        <Showcase />
        <About />
        <ContactTerminal />
      </main>
      <Footer />
    </div>
  );
}

const styles = {
  app: {
    backgroundColor: 'var(--color-canvas)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
  },
};
