import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const About: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();
    // Listen for changes to the dark mode
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkDarkMode();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const skills = [
    'React',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Express',
    'MongoDB',
    'PostgreSQL',
    'HTML5',
    'CSS3',
    'Tailwind CSS',
    'Git',
    'Docker',
    'AWS',
    'RESTful APIs',
    'GraphQL',
  ];

  return (
    <section
      id='about'
      className='py-24 relative overflow-hidden'
      style={{
        backgroundColor: isDarkMode ? '#000000' : '#f5f5f7',
        color: isDarkMode ? '#ffffff' : '#000000',
      }}
    >
      {/* Subtle background pattern */}
      <div className='absolute inset-0 z-0' style={{ opacity: isDarkMode ? 0.07 : 0.03 }}>
        <div
          className='absolute top-0 left-0 w-full h-full'
          style={{
            backgroundImage: `radial-gradient(#0066cc 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        ></div>
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className='section-title'>About Me</h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-16 items-center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className='apple-card'
            >
              <h3 className='text-2xl font-medium mb-6' style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
                Who I Am
              </h3>
              <p className='text-lg mb-6 font-light leading-relaxed' style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}>
                I'm a passionate Full Stack Developer with a strong focus on creating intuitive and performant web applications. With
                several years of experience in the industry, I've developed a keen eye for detail and a commitment to writing clean,
                maintainable code.
              </p>
              <p className='text-lg mb-6 font-light leading-relaxed' style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}>
                My journey in tech began with a curiosity about how websites work, which led me to dive deep into web development. Since
                then, I've worked on various projects ranging from small business websites to complex enterprise applications.
              </p>
              <p className='text-lg font-light leading-relaxed' style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}>
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying outdoor
                activities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className='apple-card'
            >
              <h3 className='text-2xl font-medium mb-6' style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
                My Skills
              </h3>
              <div className='flex flex-wrap gap-3'>
                {skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    className='px-4 py-2 rounded-full text-sm font-medium'
                    style={{
                      backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.8)' : 'rgba(243, 244, 246, 0.8)',
                      color: isDarkMode ? '#e5e7eb' : '#4b5563',
                    }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: '#0066cc',
                      color: '#ffffff',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
