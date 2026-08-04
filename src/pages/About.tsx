import React from 'react';

const About: React.FC = () => {
  const leadershipSkills = [
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
  ];

  const technicalSkills = [
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
  ];

  const toolsSkills = [
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
  ];

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/CV_Fran_Menendez_2026-07.pdf';
    link.download = 'Francisco_Menendez_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const skillChipClasses =
    'px-3 py-1 rounded-full text-sm font-medium bg-gray-100/80 text-gray-600 dark:bg-gray-800/80 dark:text-gray-200';

  return (
    <section id='about' className='py-24 relative overflow-hidden bg-surface text-black dark:bg-black dark:text-white'>
      {/* Subtle background pattern */}
      <div className='absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.07]'>
        <div
          className='absolute top-0 left-0 w-full h-full bg-size-[20px_20px] bg-[radial-gradient(var(--color-accent)_1px,transparent_1px)]'
        ></div>
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        <h2 className='section-title'>About Me</h2>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16'>
          <div className='apple-card'>
            <h3 className='text-2xl font-medium mb-6 text-black dark:text-white'>Who I Am</h3>
            <p className='text-lg mb-6 font-light leading-relaxed text-gray-600 dark:text-gray-400'>
              I'm Francisco Menendez, a Software Engineer with a passion for building exceptional teams and scalable technology solutions.
              My journey in software engineering has evolved from hands-on development to leading complex technical initiatives and
              fostering engineering excellence.
            </p>
            <p className='text-lg mb-6 font-light leading-relaxed text-gray-600 dark:text-gray-400'>
              What drives me most is the intersection of technology and people - creating systems that not only perform flawlessly but also
              empowering teams to do their best work. I believe that great software is built by great teams, and great teams are built
              through mentorship, clear communication, and shared technical vision.
            </p>
            <p className='text-lg mb-8 font-light leading-relaxed text-gray-600 dark:text-gray-400'>
              When I'm not architecting solutions or mentoring developers, you'll find me exploring emerging technologies, contributing to
              open source projects, or enjoying the outdoors with my family. I'm always curious about the next challenge and how technology
              can make a meaningful impact.
            </p>

            {/* CV Download Button */}
            <button onClick={handleDownloadCV} className='btn btn-primary shadow-md hover:shadow-lg flex items-center gap-2'>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                />
              </svg>
              Download CV
            </button>
          </div>

          <div className='space-y-8'>
            {/* Leadership Skills */}
            <div className='apple-card'>
              <h3 className='text-xl font-medium mb-4 text-black dark:text-white'>Leadership & Management</h3>
              <div className='flex flex-wrap gap-2'>
                {leadershipSkills.map((skill, index) => (
                  <span key={index} className={skillChipClasses}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Technical Skills */}
            <div className='apple-card'>
              <h3 className='text-xl font-medium mb-4 text-black dark:text-white'>Technical Expertise</h3>
              <div className='flex flex-wrap gap-2'>
                {technicalSkills.map((skill, index) => (
                  <span key={index} className={skillChipClasses}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools & Platforms */}
            <div className='apple-card'>
              <h3 className='text-xl font-medium mb-4 text-black dark:text-white'>Tools & Platforms</h3>
              <div className='flex flex-wrap gap-2'>
                {toolsSkills.map((skill, index) => (
                  <span key={index} className={skillChipClasses}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
