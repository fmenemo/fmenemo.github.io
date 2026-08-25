import Footer from './components/Footer';
import Navbar from './components/Navbar';
import SkipLink, { MAIN_ID } from './components/SkipLink';
import type { SiteContent } from './content';
import { ContentContext } from './hooks/useContent';
import { useFragmentLanding } from './hooks/useFragment';
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
      <div className='min-h-screen bg-paper text-ink dark:bg-canvas dark:text-chalk'>
        {/* Before the masthead, because a skip link that is not the first link
            in the document is a link past the thing a visitor already had to
            tab through to reach it. */}
        <SkipLink />
        <Navbar />
        {/* `tabIndex` so that following the skip link moves focus and not only
            the viewport: a landmark is not focusable on its own, and a browser
            that only scrolls to it leaves the next Tab back in the masthead,
            which is the trip the link exists to save. -1 keeps it out of the
            tab order itself, and the focus ring is `:focus-visible`, so
            nothing is drawn around the page.

            Checked in Chrome, which does move focus here: after the link is
            activated `document.activeElement` is this element (the record is
            in `.scratch/ticket-20-rendered-checks/`). Whether any browser
            still needs the attribute was not tested — it is the standard
            technique, it costs nothing, and the check above is the reason to
            keep it rather than a measurement of what happens without it. */}
        <main id={MAIN_ID} tabIndex={-1}>
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
