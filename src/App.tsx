import Footer from './components/Footer';
import Navbar from './components/Navbar';
import type { SiteContent } from './content';
import { ContentContext } from './hooks/useContent';
import Contact from './pages/Contact';
import Experience from './pages/Experience';
import Home from './pages/Home';
import IndependentWork from './pages/IndependentWork';
import Recognitions from './pages/Recognitions';
import Technologies from './pages/Technologies';

// The root takes its edition as input rather than reaching for one: each entry
// document boots this with its own content, and the tree below reads that
// through `useContent` (ADR 0004).
function App({ content }: { content: SiteContent }) {
  return (
    <ContentContext value={content}>
      <div className='min-h-screen bg-paper text-ink dark:bg-canvas dark:text-chalk'>
        <Navbar />
        <main>
          <Home />
          <Experience />
          <IndependentWork />
          <Recognitions />
          <Technologies />
          <Contact />
        </main>
        <Footer />
      </div>
    </ContentContext>
  );
}

export default App;
