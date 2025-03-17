import { motion } from 'framer-motion';
import React from 'react';

const About: React.FC = () => {
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
    <section id='about' className='py-24 bg-light dark:bg-dark text-dark dark:text-light relative overflow-hidden'>
      <div className='container mx-auto px-4'>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className='section-title'>About Me</h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-16 items-center'>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }} className='apple-card'>
              <h3 className='text-2xl font-medium mb-6 text-dark dark:text-light'>Who I Am</h3>
              <p className='text-lg mb-6 text-gray-600 dark:text-gray-300 font-light leading-relaxed'>
                I'm a passionate Full Stack Developer with a strong focus on creating intuitive and performant web applications. With
                several years of experience in the industry, I've developed a keen eye for detail and a commitment to writing clean,
                maintainable code.
              </p>
              <p className='text-lg mb-6 text-gray-600 dark:text-gray-300 font-light leading-relaxed'>
                My journey in tech began with a curiosity about how websites work, which led me to dive deep into web development. Since
                then, I've worked on various projects ranging from small business websites to complex enterprise applications.
              </p>
              <p className='text-lg text-gray-600 dark:text-gray-300 font-light leading-relaxed'>
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying outdoor
                activities.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }} className='apple-card'>
              <h3 className='text-2xl font-medium mb-6 text-dark dark:text-light'>My Skills</h3>
              <div className='flex flex-wrap gap-3'>
                {skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    className='px-4 py-2 bg-gray-100/80 dark:bg-dark-700/80 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200'
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
