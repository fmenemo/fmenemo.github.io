import React from 'react';
import Container from '../components/Container';
import SectionHead from '../components/SectionHead';
import { useContent } from '../hooks/useContent';
import { hand, link } from '../styles';

// Two routes and a location. No form, no availability statement, and no
// "currently open to opportunities": the site is a credibility anchor, and
// signalling availability dates the page the moment it stops being true.
const Contact: React.FC = () => {
  const { identity, contact, chrome } = useContent();

  const routes = [
    { label: chrome.fields.email, value: contact.email, href: `mailto:${contact.email}` },
    { label: chrome.fields.linkedin, value: contact.linkedinLabel, href: contact.linkedin },
    { label: chrome.fields.location, value: `${identity.location} / ${identity.mode}`, href: null },
  ];

  return (
    <section id='contact'>
      <Container className='pb-16 md:pb-24'>
        <SectionHead index='05'>{chrome.sections.contact}</SectionHead>
        <dl className='mt-8 border-t border-hairline dark:border-hairline-dark'>
          {routes.map((route) => (
            <div key={route.label} className='grid gap-1 border-b border-hairline py-6 sm:grid-cols-4 sm:gap-8 dark:border-hairline-dark'>
              <dt className={`${hand} text-muted dark:text-muted-dark`}>{route.label}</dt>
              <dd className='sm:col-span-3'>
                {route.href ? (
                  <a
                    href={route.href}
                    {...(route.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={link}
                  >
                    {route.value}
                  </a>
                ) : (
                  <span>{route.value}</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
};

export default Contact;
