import Footer from './components/Footer';
import Navbar from './components/Navbar';
import SEO from './components/SEO';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';

function App() {
  return (
    <div className='min-h-screen bg-paper text-ink dark:bg-canvas dark:text-chalk'>
      <SEO />
      <Navbar />
      <main>
        <Home />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
