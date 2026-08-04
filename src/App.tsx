import Footer from './components/Footer';
import Navbar from './components/Navbar';
import SEO from './components/SEO';
import Contact from './pages/Contact';
import Experience from './pages/Experience';
import Home from './pages/Home';
import IndependentWork from './pages/IndependentWork';
import Recognitions from './pages/Recognitions';
import Skills from './pages/Skills';

function App() {
  return (
    <div className='min-h-screen bg-paper text-ink dark:bg-canvas dark:text-chalk'>
      <SEO />
      <Navbar />
      <main>
        <Home />
        <Experience />
        <IndependentWork />
        <Recognitions />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
