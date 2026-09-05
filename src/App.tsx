import Footer from './components/Footer';
import RunningHead from './components/RunningHead';
import type { SiteContent } from './content';
import { ContentContext } from './hooks/useContent';
import { useFragmentLanding } from './hooks/useFragment';
import { hand } from './styles';
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
  // The sections do not exist when the browser resolves the fragment, so
  // landing on one is the application's job here rather than the browser's.
  // It sits at the root because that is where every section is below.
  useFragmentLanding();

  return (
    <ContentContext value={content}>
      <div className='min-h-screen bg-stock text-ink dark:bg-stock-dark dark:text-ink-dark'>
        {/* The first link in the document, and the whole of what a keyboard
            visitor needs to get past the running head. It is out of sight
            until it is focused, and then it is drawn as the page's one object
            over the top-left corner, so it does not push the running head
            down when it appears. It sits a layer above the running head: the
            head is sticky and opaque and comes after this in the document, so
            at the same layer it paints over the link a visitor has just
            focused. */}
        <a
          href='#main'
          className={`sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:border-2 focus:border-accent focus:bg-stock focus:px-4 focus:py-2.5 focus:text-accent dark:focus:border-accent-dark dark:focus:bg-stock-dark dark:focus:text-accent-dark ${hand}`}
        >
          {content.chrome.skipLink}
        </a>

        <RunningHead />
        {/* The landmark the skip link lands on: `main` already, and now named,
            because a fragment needs an id to resolve against. It is made
            programmatically focusable so that following the link moves the
            keyboard as well as the viewport — a landmark that cannot take
            focus leaves the next Tab back at the top of the running head,
            which is the thing the visitor just asked to skip. */}
        <main id='main' tabIndex={-1}>
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
