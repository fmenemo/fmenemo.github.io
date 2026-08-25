import Footer from './components/Footer';
import Navbar from './components/Navbar';
import type { SiteContent } from './content';
import { ContentContext } from './hooks/useContent';
import { useFragmentLanding } from './hooks/useFragment';
import Contact from './pages/Contact';
import Experience from './pages/Experience';
import Home from './pages/Home';
import IndependentWork from './pages/IndependentWork';
import Recognitions from './pages/Recognitions';

// The root takes its edition as input rather than reaching for one: each entry
// document boots this with its own content, and the tree below reads that
// through `useContent` (ADR 0004).
function App({ content }: { content: SiteContent }) {
  // The sections do not exist when the browser resolves the fragment, so
  // landing on one is the application's job here rather than the browser's.
  // It sits at the root because that is where every section is below.
  useFragmentLanding();

  return (
    <ContentContext value={content}>
      <div className='min-h-screen bg-paper text-ink dark:bg-canvas dark:text-chalk'>
        <Navbar />
        <main>
          <Home />
          <Experience />
          <IndependentWork />
          <Recognitions />
          <Contact />
        </main>
        <Footer />
      </div>
    </ContentContext>
  );
}

export default App;
