import Footer from './components/Footer';
import Navbar from './components/Navbar';
import SEO from './components/SEO';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';

function App() {
  return (
    <div className='min-h-screen relative bg-paper text-black dark:bg-black dark:text-white'>
      <SEO />
      <Navbar />
      <main className='bg-paper dark:bg-black'>
        <section id='home'>
          <Home />
        </section>
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
