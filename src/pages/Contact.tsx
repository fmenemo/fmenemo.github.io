import React from 'react';
import Section from '../components/Section';
import { useContent } from '../hooks/useContent';
import { hand, link } from '../styles';

// Two routes and a location. No form, no availability statement, and no
// "currently open to opportunities": the site is a credibility anchor, and
// signalling availability dates the page the moment it stops being true.
const Contact: React.FC = () => {
  const { identity, contact, chrome } = useContent();

  const routes = [
    { label: chrome.contact.email, value: contact.email, href: `mailto:${contact.email}` },
    { label: chrome.contact.linkedin, value: contact.linkedinLabel, href: contact.linkedin },
    { label: chrome.contact.location, value: `${identity.location} / ${identity.mode}`, href: null },
  ];

  return (
    <Section id='contact' index='05' title={chrome.sections.contact}>
      <dl className='border-t border-hairline dark:border-hairline-dark'>
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
    </Section>
  );
};

export default Contact;
