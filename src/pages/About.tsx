import { motion } from 'framer-motion';
import React from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

const About: React.FC = () => {
  const { isDarkMode } = useDarkMode();

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
                I'm Francisco Menendez, a Principal Software Engineer with a passion for building exceptional teams and scalable technology
                solutions. My journey in software engineering has evolved from hands-on development to leading complex technical initiatives
                and fostering engineering excellence.
              </p>
              <p className='text-lg mb-6 font-light leading-relaxed' style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}>
                What drives me most is the intersection of technology and people - creating systems that not only perform flawlessly but
                also empowering teams to do their best work. I believe that great software is built by great teams, and great teams are
                built through mentorship, clear communication, and shared technical vision.
              </p>
              <p className='text-lg mb-8 font-light leading-relaxed' style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}>
                When I'm not architecting solutions or mentoring developers, you'll find me exploring emerging technologies, contributing to
                open source projects, or enjoying the outdoors with my family. I'm always curious about the next challenge and how
                technology can make a meaningful impact.
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
              {/* Leadership Skills */}
              <div className='apple-card'>
                <h3 className='text-xl font-medium mb-4' style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
                  Leadership & Management
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {leadershipSkills.map((skill, index) => (
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

              {/* Technical Skills */}
              <div className='apple-card'>
                <h3 className='text-xl font-medium mb-4' style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
                  Technical Expertise
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {technicalSkills.map((skill, index) => (
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

              {/* Tools & Platforms */}
              <div className='apple-card'>
                <h3 className='text-xl font-medium mb-4' style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
                  Tools & Platforms
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
              Leadership Impact
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='text-center'>
                <div className='text-4xl font-bold mb-2' style={{ color: '#0066cc' }}>
                  10+
                </div>
                <p className='text-lg font-medium mb-2' style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
                  Years Experience
                </p>
                <p className='text-sm' style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}>
                  Leading engineering teams and technical initiatives
                </p>
              </div>
              <div className='text-center'>
                <div className='text-4xl font-bold mb-2' style={{ color: '#0066cc' }}>
                  50+
                </div>
                <p className='text-lg font-medium mb-2' style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
                  Engineers Mentored
                </p>
                <p className='text-sm' style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}>
                  From junior developers to senior engineers
                </p>
              </div>
              <div className='text-center'>
                <div className='text-4xl font-bold mb-2' style={{ color: '#0066cc' }}>
                  ∞
                </div>
                <p className='text-lg font-medium mb-2' style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
                  Systems Scaled
                </p>
                <p className='text-sm' style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}>
                  From startup MVPs to enterprise platforms
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
