import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import SEO from './components/SEO';
import { useDarkMode } from './hooks/useDarkMode';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
// import Projects from './pages/Projects'; // Hidden for now

function App() {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className='min-h-screen relative'
      style={{
        backgroundColor: isDarkMode ? '#000000' : '#fbfbfd',
        color: isDarkMode ? '#ffffff' : '#000000',
      }}
    >
      <SEO />
      <Navbar />
      <main style={{ backgroundColor: isDarkMode ? '#000000' : '#fbfbfd' }}>
        <section id='home'>
          <Home />
        </section>
        <About />
        {/* <Projects /> */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
