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
    <section id='about' className='py-20 bg-light dark:bg-dark text-dark dark:text-light'>
      <div className='container mx-auto px-4'>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className='text-4xl font-bold mb-12 text-center'>About Me</h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
              <h3 className='text-2xl font-semibold mb-4'>Who I Am</h3>
              <p className='text-lg mb-6'>
                I'm a passionate Full Stack Developer with a strong focus on creating intuitive and performant web applications. With
                several years of experience in the industry, I've developed a keen eye for detail and a commitment to writing clean,
                maintainable code.
              </p>
              <p className='text-lg mb-6'>
                My journey in tech began with a curiosity about how websites work, which led me to dive deep into web development. Since
                then, I've worked on various projects ranging from small business websites to complex enterprise applications.
              </p>
              <p className='text-lg'>
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying outdoor
                activities.
              </p>
            </motion.div>

            <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}>
              <h3 className='text-2xl font-semibold mb-4'>My Skills</h3>
              <div className='flex flex-wrap gap-3'>
                {skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    className='px-4 py-2 bg-white/30 dark:bg-dark-700/50 rounded-full shadow-sm backdrop-blur-sm text-dark dark:text-light border border-gray-200 dark:border-gray-700'
                    whileHover={{
                      scale: 1.05,
                      background: 'linear-gradient(135deg, #3b82f6 0%, #ec4899 100%)',
                      color: '#ffffff',
                      borderColor: 'transparent',
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
