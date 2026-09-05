import React from 'react';
import Container from '../components/Container';
import Field from '../components/Field';
import SectionHead from '../components/SectionHead';
import { useContent } from '../hooks/useContent';
import { link } from '../styles';

// The bottom of the record, and the one place on the page the routes to Fran
// live: the verdict on #26 resolved user story 12 in favour of the bottom, so
// the identification block carries location, mode and the CVs only and this
// section gives a reader something the top did not.
//
// No form, no availability statement, and no "currently open to opportunities":
// the site is a credibility anchor, and signalling availability dates the page
// the moment it stops being true.
//
// The fields are the primitive the identification block introduced, so a label
// here sits on the same vertical as a label there.
const Contact: React.FC = () => {
  const { identity, contact, chrome } = useContent();

  // A route is drawn as what a reader would read out, not as its URL: the
  // address for the mailto, and the host and path without the scheme for the
  // two profiles. GitHub is a brand rather than chrome, so it is the same word
  // in both editions and stays here rather than in the content modules.
  const routes = [
    { label: chrome.fields.email, value: contact.email, href: `mailto:${contact.email}` },
    { label: chrome.fields.linkedin, value: contact.linkedinLabel, href: contact.linkedin },
    { label: 'GitHub', value: contact.github.replace(/^https:\/\//, ''), href: contact.github },
  ];

  return (
    <section id='contact'>
      <Container className='pb-16 md:pb-24'>
        <SectionHead index='05'>{chrome.sections.contact}</SectionHead>
        <div className='mt-8'>
          {routes.map((route) => (
            <Field key={route.label} label={route.label}>
              <a
                href={route.href}
                // A mailto opens the reader's own client, so only the two
                // profiles leave the site and only they are marked as doing so.
                {...(route.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={link}
              >
                {route.value}
              </a>
            </Field>
          ))}

          {/* Where he is and how he works, said once more at the bottom because
              a reader who has just read the record is the one deciding whether
              to write. It is a fact rather than a route, so it is not a link. */}
          <Field label={chrome.fields.location}>
            {identity.location} / {identity.mode}
          </Field>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
