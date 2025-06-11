import { motion } from 'framer-motion';
import React from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

const About: React.FC = () => {
  const { isDarkMode } = useDarkMode();

  const frontendSkills = [
    'React',
    'TypeScript',
    'JavaScript',
    'Next.js',
    'Vue.js',
    'HTML5',
    'CSS3',
    'Tailwind CSS',
    'Sass/SCSS',
    'Responsive Design',
  ];

  const backendSkills = [
    'Node.js',
    'Express.js',
    'Python',
    'Django',
    'FastAPI',
    'PostgreSQL',
    'MongoDB',
    'RESTful APIs',
    'GraphQL',
    'Microservices',
  ];

  const toolsSkills = ['Git & GitHub', 'Docker', 'AWS', 'Vercel', 'Netlify', 'Figma', 'VS Code', 'Postman', 'Linux', 'CI/CD'];

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/CV_20250611.pdf';
    link.download = 'Francisco_Menendez_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16'>
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
                I'm Francisco Menendez, a passionate Full Stack Developer with over 5 years of experience creating scalable web applications
                and innovative digital solutions. I specialize in modern JavaScript frameworks and have a strong background in both frontend
                and backend development.
              </p>
              <p className='text-lg mb-6 font-light leading-relaxed' style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}>
                My expertise spans across the entire development lifecycle, from initial concept and design to deployment and maintenance.
                I'm particularly passionate about creating user-centered applications that solve real-world problems through clean,
                efficient code.
              </p>
              <p className='text-lg mb-8 font-light leading-relaxed' style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}>
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, reading tech blogs, or
                enjoying outdoor activities. I believe in continuous learning and staying updated with the latest industry trends.
              </p>

              {/* CV Download Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadCV}
                className='btn btn-primary shadow-md hover:shadow-lg flex items-center gap-2'
              >
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                  />
                </svg>
                Download CV
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className='space-y-8'
            >
              {/* Frontend Skills */}
              <div className='apple-card'>
                <h3 className='text-xl font-medium mb-4' style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
                  Frontend Development
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {frontendSkills.map((skill, index) => (
                    <motion.span
                      key={index}
                      className='px-3 py-1 rounded-full text-sm font-medium'
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
              </div>

              {/* Backend Skills */}
              <div className='apple-card'>
                <h3 className='text-xl font-medium mb-4' style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
                  Backend Development
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {backendSkills.map((skill, index) => (
                    <motion.span
                      key={index}
                      className='px-3 py-1 rounded-full text-sm font-medium'
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
              </div>

              {/* Tools & DevOps */}
              <div className='apple-card'>
                <h3 className='text-xl font-medium mb-4' style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
                  Tools & DevOps
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {toolsSkills.map((skill, index) => (
                    <motion.span
                      key={index}
                      className='px-3 py-1 rounded-full text-sm font-medium'
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
              </div>
            </motion.div>
          </div>

          {/* Experience Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className='apple-card max-w-4xl mx-auto'
          >
            <h3 className='text-2xl font-medium mb-6 text-center' style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
              Experience Highlights
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='text-center'>
                <div className='text-4xl font-bold mb-2' style={{ color: '#0066cc' }}>
                  5+
                </div>
                <p className='text-lg font-medium mb-2' style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
                  Years Experience
                </p>
                <p className='text-sm' style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}>
                  Professional development across various industries
                </p>
              </div>
              <div className='text-center'>
                <div className='text-4xl font-bold mb-2' style={{ color: '#0066cc' }}>
                  20+
                </div>
                <p className='text-lg font-medium mb-2' style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
                  Projects Completed
                </p>
                <p className='text-sm' style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}>
                  From startups to enterprise-level applications
                </p>
              </div>
              <div className='text-center'>
                <div className='text-4xl font-bold mb-2' style={{ color: '#0066cc' }}>
                  ∞
                </div>
                <p className='text-lg font-medium mb-2' style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
                  Lines of Code
                </p>
                <p className='text-sm' style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}>
                  Clean, efficient, and maintainable solutions
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
