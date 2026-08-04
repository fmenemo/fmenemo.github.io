import React from 'react';
import Section from '../components/Section';
import { accentAction, inlineLink, metaVoice, primaryAction } from '../styles';

const contactMethods = [
  {
    title: 'Email',
    description: 'Reach out for leadership opportunities or technical consulting',
    contact: 'fmenendezmoya@gmail.com',
    action: 'mailto:fmenendezmoya@gmail.com',
  },
  {
    title: 'LinkedIn',
    description: "Let's connect professionally and discuss opportunities",
    contact: 'Francisco Menendez',
    action: 'https://www.linkedin.com/in/fmenemo/',
  },
  {
    title: 'GitHub',
    description: 'GitHub profile',
    contact: 'fmenemo',
    action: 'https://github.com/fmenemo',
  },
  {
    title: 'Location',
    description: 'Available for remote leadership roles globally',
    contact: 'Spain • Remote',
    action: null,
  },
];

const focusAreas = [
  { title: 'Engineering Leadership', description: 'Building and scaling high-performing engineering teams' },
  { title: 'System Architecture', description: 'Designing scalable, maintainable software architectures' },
  { title: 'Technical Strategy', description: 'Aligning technology roadmaps with business objectives' },
];

const Contact: React.FC = () => (
  <Section id='contact' index='02' title="Let's Connect">
    <p className='max-w-2xl text-lg leading-relaxed font-light text-muted dark:text-muted-dark'>
      I'm always interested in discussing new opportunities, technical challenges, and leadership roles. Whether you're hiring or exploring
      potential collaborations, I'd love to hear from you.
    </p>

    <dl className='mt-12 border-t border-rule dark:border-rule-dark'>
      {contactMethods.map((method) => (
        <div key={method.title} className='grid gap-1 border-b border-rule py-6 sm:grid-cols-4 sm:gap-8 dark:border-rule-dark'>
          <dt className={`${metaVoice} text-muted dark:text-muted-dark`}>{method.title}</dt>
          <dd className='sm:col-span-3'>
            {method.action ? (
              <a
                href={method.action}
                aria-label={`${method.title}: ${method.contact}`}
                {...(method.action.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={inlineLink}
              >
                {method.contact}
              </a>
            ) : (
              <span>{method.contact}</span>
            )}
            <span className='mt-1 block text-sm text-muted dark:text-muted-dark'>{method.description}</span>
          </dd>
        </div>
      ))}
    </dl>

    <div className='mt-16 border-t-2 border-ink pt-8 dark:border-chalk'>
      <h3 className='text-xl font-semibold tracking-tight'>Currently Open to New Opportunities</h3>
      <p className='mt-4 max-w-2xl leading-relaxed font-light text-muted dark:text-muted-dark'>
        I'm actively exploring engineering and leadership roles. Particularly interested in positions involving team leadership, technical
        architecture, and scaling engineering organizations.
      </p>
      <div className='mt-8 flex flex-wrap items-center gap-x-8 gap-y-4'>
        <a
          href='mailto:fmenendezmoya@gmail.com'
          className={primaryAction}
        >
          Email Me Directly
        </a>
        <a
          href='https://www.linkedin.com/in/fmenemo/'
          target='_blank'
          rel='noopener noreferrer'
          className={accentAction}
        >
          Connect on LinkedIn
        </a>
      </div>
    </div>

    <ul className='mt-16 grid gap-8 sm:grid-cols-3'>
      {focusAreas.map((area) => (
        <li key={area.title} className='border-t border-rule pt-4 dark:border-rule-dark'>
          <h4 className={metaVoice}>{area.title}</h4>
          <p className='mt-2 text-sm leading-relaxed text-muted dark:text-muted-dark'>{area.description}</p>
        </li>
      ))}
    </ul>
  </Section>
);

export default Contact;
