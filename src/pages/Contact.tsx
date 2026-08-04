import React from 'react';

const Contact: React.FC = () => {
  const contactMethods = [
    {
      icon: (
        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
          />
        </svg>
      ),
      title: 'Email',
      description: 'Reach out for leadership opportunities or technical consulting',
      contact: 'fmenendezmoya@gmail.com',
      action: 'mailto:fmenendezmoya@gmail.com',
    },
    {
      icon: (
        <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
        </svg>
      ),
      title: 'LinkedIn',
      description: "Let's connect professionally and discuss opportunities",
      contact: 'Francisco Menendez',
      action: 'https://www.linkedin.com/in/fmenemo/',
    },
    {
      icon: (
        <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
        </svg>
      ),
      title: 'GitHub',
      description: 'GitHub profile',
      contact: 'fmenemo',
      action: 'https://github.com/fmenemo',
    },
    {
      icon: (
        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
          />
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
        </svg>
      ),
      title: 'Location',
      description: 'Available for remote leadership roles globally',
      contact: 'Spain • Remote',
      action: null,
    },
  ];

  return (
    <section id='contact' className='py-24 relative overflow-hidden bg-surface text-black dark:bg-black dark:text-white'>
      <div className='container mx-auto px-4'>
        <h2 className='section-title'>Let's Connect</h2>
        <p className='text-xl text-center mb-16 max-w-3xl mx-auto font-light text-gray-600 dark:text-gray-400'>
          I'm always interested in discussing new opportunities, technical challenges, and leadership roles. Whether you're hiring or
          exploring potential collaborations, I'd love to hear from you.
        </p>

        <div className='max-w-4xl mx-auto'>
          {/* Contact Methods */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-16'>
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className='apple-card p-6 group cursor-pointer backdrop-blur-[10px] bg-white/80 dark:bg-gray-800/50'
                onClick={() => method.action && window.open(method.action, '_blank')}
              >
                <div className='flex items-start gap-4'>
                  <div className='p-3 rounded-lg transition-colors bg-accent text-white'>{method.icon}</div>
                  <div className='flex-1'>
                    <h4 className='text-lg font-semibold mb-2 text-black dark:text-white'>{method.title}</h4>
                    <p className='text-sm mb-2 text-gray-600 dark:text-gray-400'>{method.description}</p>
                    <p className='font-medium text-accent'>{method.contact}</p>
                  </div>
                  {method.action && (
                    <svg
                      className='w-5 h-5 transition-transform group-hover:translate-x-1 text-gray-500 dark:text-gray-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Availability Status */}
          <div className='apple-card p-8 text-center border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-500/10'>
            <div className='flex items-center justify-center gap-3 mb-4'>
              <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse'></div>
              <h3 className='text-xl font-semibold text-black dark:text-white'>Currently Open to New Opportunities</h3>
            </div>
            <p className='text-lg mb-6 text-gray-600 dark:text-gray-400'>
              I'm actively exploring engineering and leadership roles. Particularly interested in positions involving team leadership,
              technical architecture, and scaling engineering organizations.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <a href='mailto:fmenendezmoya@gmail.com' className='btn btn-primary'>
                Email Me Directly
              </a>
              <a
                href='https://www.linkedin.com/in/fmenemo/'
                target='_blank'
                rel='noopener noreferrer'
                className='btn btn-secondary border border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-200'
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>

          {/* Professional Focus */}
          <div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='text-2xl mb-3'>🚀</div>
              <h4 className='text-lg font-semibold mb-2 text-black dark:text-white'>Engineering Leadership</h4>
              <p className='text-sm text-gray-600 dark:text-gray-400'>Building and scaling high-performing engineering teams</p>
            </div>
            <div className='text-center'>
              <div className='text-2xl mb-3'>🏗️</div>
              <h4 className='text-lg font-semibold mb-2 text-black dark:text-white'>System Architecture</h4>
              <p className='text-sm text-gray-600 dark:text-gray-400'>Designing scalable, maintainable software architectures</p>
            </div>
            <div className='text-center'>
              <div className='text-2xl mb-3'>📈</div>
              <h4 className='text-lg font-semibold mb-2 text-black dark:text-white'>Technical Strategy</h4>
              <p className='text-sm text-gray-600 dark:text-gray-400'>Aligning technology roadmaps with business objectives</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
