import React from 'react';
import Section from '../components/Section';
import { contact, identity } from '../content';
import { inlineLink, metaVoice } from '../styles';

// Two routes and a location. No form, no availability statement, and no
// "currently open to opportunities": the site is a credibility anchor, and
// signalling availability dates the page the moment it stops being true.
const routes = [
  { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
  { label: 'LinkedIn', value: contact.linkedinLabel, href: contact.linkedin },
  { label: 'Location', value: `${identity.location} / ${identity.mode}`, href: null },
];

const Contact: React.FC = () => (
  <Section id='contact' index='05' title='Contact'>
    <dl className='border-t border-rule dark:border-rule-dark'>
      {routes.map((route) => (
        <div key={route.label} className='grid gap-1 border-b border-rule py-6 sm:grid-cols-4 sm:gap-8 dark:border-rule-dark'>
          <dt className={`${metaVoice} text-muted dark:text-muted-dark`}>{route.label}</dt>
          <dd className='sm:col-span-3'>
            {route.href ? (
              <a
                href={route.href}
                {...(route.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={inlineLink}
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

export default Contact;
