import React from 'react';
import Section from '../components/Section';
import { useContent } from '../hooks/useContent';
import { inlineLink, labelVoice, valueVoice } from '../styles';

// Two routes and a location. No form, no availability statement, and no
// "currently open to opportunities": the site is a credibility anchor, and
// signalling availability dates the page the moment it stops being true.
const Contact: React.FC = () => {
  const { identity, contact, chrome } = useContent();

  // An address and a handle are values, and wear the voice for one. The
  // location is a place written in prose, so it stays in the body face.
  const routes = [
    { label: chrome.contact.email, value: contact.email, href: `mailto:${contact.email}`, voice: valueVoice },
    { label: chrome.contact.linkedin, value: contact.linkedinLabel, href: contact.linkedin, voice: valueVoice },
    { label: chrome.contact.location, value: `${identity.location} / ${identity.mode}`, href: null, voice: '' },
  ];

  return (
    <Section id='contact' index='05' title={chrome.sections.contact}>
      <dl className='border-t border-rule dark:border-rule-dark'>
        {routes.map((route) => (
          <div key={route.label} className='grid gap-1 border-b border-rule py-6 sm:grid-cols-4 sm:gap-8 dark:border-rule-dark'>
            <dt className={`${labelVoice} text-muted dark:text-muted-dark`}>{route.label}</dt>
            <dd className='sm:col-span-3'>
              {route.href ? (
                <a
                  href={route.href}
                  {...(route.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`${inlineLink} ${route.voice}`}
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
