import React from 'react';
import Section from '../components/Section';
import { metaVoice, primaryAction } from '../styles';

const skillGroups = [
  {
    title: 'Leadership & Management',
    items: [
      'Engineering Leadership',
      'Technical Strategy & Vision',
      'Cross-functional Collaboration',
      'Mentoring & Development',
      'Organizational Scaling',
      'Technical Decision Making',
      'Engineering Culture',
      'Stakeholder Management',
      'Team Empowerment',
      'Innovation & Research',
    ],
  },
  {
    title: 'Technical Expertise',
    items: [
      'Distributed Systems',
      'System Architecture',
      'Performance Engineering',
      'Scalability Design',
      'Event-Driven Architecture',
      'Microservices',
      'API Design & Strategy',
      'Database Architecture',
      'Security Architecture',
      'Platform Engineering',
    ],
  },
  {
    title: 'Tools & Platforms',
    items: [
      'Cloud Architecture (AWS/GCP/Azure)',
      'Kubernetes & Orchestration',
      'Infrastructure as Code',
      'Observability & Monitoring',
      'CI/CD Pipelines',
      'Service Mesh',
      'Message Queues',
      'Load Balancing',
      'CDN & Edge Computing',
      'DevSecOps',
    ],
  },
];

const About: React.FC = () => (
  <Section id='about' index='01' title='About Me'>
    <div className='max-w-2xl space-y-6 text-lg leading-relaxed font-light text-muted dark:text-muted-dark'>
      <p>
        I'm Francisco Menendez, a Software Engineer with a passion for building exceptional teams and scalable technology solutions. My
        journey in software engineering has evolved from hands-on development to leading complex technical initiatives and fostering
        engineering excellence.
      </p>
      <p>
        What drives me most is the intersection of technology and people - creating systems that not only perform flawlessly but also
        empowering teams to do their best work. I believe that great software is built by great teams, and great teams are built through
        mentorship, clear communication, and shared technical vision.
      </p>
      <p>
        When I'm not architecting solutions or mentoring developers, you'll find me exploring emerging technologies, contributing to open
        source projects, or enjoying the outdoors with my family. I'm always curious about the next challenge and how technology can make a
        meaningful impact.
      </p>
    </div>

    <a
      href='/Fran_Menendez_CV.pdf'
      download='Fran_Menendez_CV.pdf'
      className={`mt-10 ${primaryAction}`}
    >
      Download CV
    </a>

    <dl className='mt-16 border-t border-rule dark:border-rule-dark'>
      {skillGroups.map((group) => (
        <div key={group.title} className='grid gap-2 border-b border-rule py-6 sm:grid-cols-4 sm:gap-8 dark:border-rule-dark'>
          <dt className={`${metaVoice} text-muted dark:text-muted-dark`}>{group.title}</dt>
          <dd className='text-sm leading-relaxed sm:col-span-3'>{group.items.join(', ')}</dd>
        </div>
      ))}
    </dl>
  </Section>
);

export default About;
