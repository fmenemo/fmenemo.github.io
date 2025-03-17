import { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Projects from './pages/Projects';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for dark mode preference on initial load
    const darkModeEnabled =
      localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (darkModeEnabled) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }

    // Listen for changes to the dark mode
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className='min-h-screen relative'
      style={{
        backgroundColor: isDarkMode ? '#000000' : '#fbfbfd',
        color: isDarkMode ? '#ffffff' : '#000000',
      }}
    >
      <Navbar />
      <main style={{ backgroundColor: isDarkMode ? '#000000' : '#fbfbfd' }}>
        <section id='home'>
          <Home />
        </section>
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
