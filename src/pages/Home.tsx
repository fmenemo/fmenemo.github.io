import React, { Fragment } from 'react';
import Container from '../components/Container';
import Field from '../components/Field';
import { useContent } from '../hooks/useContent';
import { action, hand, link } from '../styles';

// The identification block: the top of the record, and the one part of the page
// that says what the record is before it says anything in it. The nameplate,
// the identity line under a heavy rule, the two fields that place him, the CVs,
// and the contents index.
//
// It carries no email, no LinkedIn and no GitHub. The verdict on #26 resolved
// user story 12 in favour of the bottom: the routes live once, in the Contact
// section, so the bottom of the page gives a reader something the top did not.
const Home: React.FC = () => {
  const { identity, contact, chrome } = useContent();

  // The contents of the record, in the order the sections stand in and under
  // the numbers those sections open on. The anchors are English in every
  // edition, so a fragment carries across the language selector unchanged
  // (ADR 0004); the labels are the section headings themselves, so there is no
  // second vocabulary for an edition to keep in step with the first.
  const contents = [
    { href: '#experience', label: chrome.sections.experience },
    { href: '#independent-work', label: chrome.sections.independentWork },
    { href: '#recognitions', label: chrome.sections.recognitions },
    { href: '#technologies', label: chrome.sections.technologies },
    { href: '#contact', label: chrome.sections.contact },
  ];

  return (
    <section id='home'>
      <Container className='pt-12 pb-16 md:pt-16 md:pb-24'>
        {/* The nameplate is the one thing on the page set at the wide end of the
            width axis, and it is sized by the viewport rather than by
            breakpoints: uppercase at the wide setting, "MENÉNDEZ" overruns a
            320px column at any fixed size large enough to be a nameplate at
            1280px. */}
        <h1 className='wide text-[clamp(2.25rem,9.5vw,4.5rem)] leading-[0.92] font-semibold tracking-[-0.02em] uppercase'>
          {/* One block per word, with the spaces kept between them: without them
              the accessible name of the heading is "FranMenéndez". They collapse
              visually because each span is a block. */}
          {identity.name.split(' ').map((word, index) => (
            <Fragment key={index}>
              {index > 0 && ' '}
              <span className='block'>{word}</span>
            </Fragment>
          ))}
        </h1>

        {/* The identity line is the record's summary. One column at the page's
            full width, so the rule above it runs the measure and lines up with
            the grid beneath rather than stopping short of it: that is the
            verdict's one correction to the variant as it was prototyped. */}
        <p className='mt-8 border-t-2 border-rule pt-6 text-lg leading-relaxed dark:border-rule-dark'>{identity.line}</p>

        <div className='mt-10 grid gap-x-14 lg:grid-cols-2'>
          <div>
            <Field label={chrome.fields.location}>{identity.location}</Field>
            <Field label={chrome.fields.mode}>{identity.mode}</Field>

            {/* The one thing on the page a reader is asked to take away, and
                the one thing drawn as an object rather than as a line. It sits
                under the fields, where a reader who has just landed is already
                looking, which is user story 11: the CV one click from where
                they arrive. The name the browser saves a file under is the
                file's own name — they drifted apart once — so it is derived
                rather than written. */}
            <div className='mt-8 flex flex-wrap gap-3 border-t border-hairline pt-8 dark:border-hairline-dark'>
              {contact.cvs.map((cv) => (
                <a key={cv.href} href={cv.href} download={cv.href.replace(/^.*\//, '')} className={action}>
                  {cv.label}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label={chrome.nav.label} className='mt-12 lg:mt-0'>
            {contents.map((entry, position) => (
              <a
                key={entry.href}
                href={entry.href}
                // The whole row is the link, rather than the label inside it:
                // the rule the link draws is drawn on the element the pointer
                // and the focus ring land on, and a row whose label alone was
                // the link would answer a keyboard visitor with nothing.
                className={`flex items-baseline gap-4 border-t border-hairline py-3 dark:border-hairline-dark ${link}`}
              >
                <span className={`${hand} text-muted dark:text-muted-dark`}>
                  {String(position + 1).padStart(2, '0')}
                </span>
                <span className='text-sm'>{entry.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </section>
  );
};

export default Home;
