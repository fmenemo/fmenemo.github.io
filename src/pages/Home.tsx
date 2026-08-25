import React, { Fragment } from 'react';
import Container from '../components/Container';
import { useContent } from '../hooks/useContent';
import { accentAction, primaryAction, valueVoice } from '../styles';

// The hero states who Fran is and puts the CV one click away. It carries no
// availability signalling and no greeting: a reader who arrived already knowing
// the name wants the identity line, not an introduction.
//
// It sits on the same twelve columns as the sections below it, so the page
// reads as one composition from the first paint: the name spans the measure,
// the identity line and the CV occupy the content columns, and the location
// sits out in the label columns, where the section labels sit further down. The
// placement is desktop-only, so the four stack in source order on a phone.
const Home: React.FC = () => {
  const { identity, contact } = useContent();

  return (
    <section id='home'>
      <Container className='grid gap-10 pt-28 pb-20 md:grid-cols-12 md:pt-40 md:pb-28'>
        <h1 className='text-5xl leading-[0.95] font-semibold tracking-tight sm:text-6xl md:col-span-12 md:text-7xl'>
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

        <div className='md:col-span-9 md:col-start-4 md:row-start-2'>
          <p className='max-w-2xl text-lg leading-relaxed text-muted dark:text-muted-dark'>{identity.line}</p>

          {/* The hero's only actions are the edition's CVs. Email and LinkedIn
              live in Contact, which is the one place on the page a route to
              Fran is read as text. The first CV is the edition's own and wears
              the bordered block; any beside it are a service to a reader who
              needs a second document, and sit in the accent treatment. The name
              the browser saves a file under is the file's own name: they
              drifted apart once before, so it is derived rather than written. */}
          <div className='mt-12 flex flex-wrap items-center gap-x-8 gap-y-4'>
            {contact.cvs.map((cv, index) => (
              <a
                key={cv.href}
                href={cv.href}
                download={cv.href.replace(/^.*\//, '')}
                className={index === 0 ? primaryAction : accentAction}
              >
                {cv.label}
              </a>
            ))}
          </div>
        </div>

        {/* A place and a way of working are what the labels beside them name,
            so the line wears the value voice rather than the label's caps. */}
        <p className={`md:col-span-3 md:col-start-1 md:row-start-2 ${valueVoice} text-muted dark:text-muted-dark`}>
          {identity.location}
          <span className='mx-3 text-rule dark:text-rule-dark'>/</span>
          {identity.mode}
        </p>
      </Container>
    </section>
  );
};

export default Home;
