import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
}

const Projects: React.FC = () => {
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

  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with product management, cart functionality, and payment processing.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
      imageUrl: 'https://via.placeholder.com/600x400?text=E-Commerce+Project',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/ecommerce',
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates and team functionality.',
      technologies: ['React', 'Firebase', 'Tailwind CSS', 'TypeScript'],
      imageUrl: 'https://via.placeholder.com/600x400?text=Task+Management+App',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/taskmanager',
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A weather dashboard that displays current and forecasted weather data for multiple locations.',
      technologies: ['React', 'OpenWeather API', 'Chart.js', 'Styled Components'],
      imageUrl: 'https://via.placeholder.com/600x400?text=Weather+Dashboard',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/weather',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id='projects'
      className='py-24 relative overflow-hidden'
      style={{
        backgroundColor: isDarkMode ? '#000000' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#000000',
      }}
    >
      {/* Subtle gradient background */}
      <div
        className='absolute inset-0 z-0'
        style={{
          backgroundImage: isDarkMode ? 'linear-gradient(to bottom, #000000, #111111)' : 'linear-gradient(to bottom, #ffffff, #f5f5f7)',
        }}
      ></div>

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
        <h2 className='section-title'>My Projects</h2>

        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className='overflow-hidden transition-all duration-300 group'
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(16px)',
                borderRadius: '1rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                border: '1px solid rgba(229, 231, 235, 0.2)',
                ...(isDarkMode && {
                  backgroundColor: 'rgba(31, 41, 55, 0.8)',
                  borderColor: 'rgba(75, 85, 99, 0.2)',
                }),
              }}
              variants={itemVariants}
              whileHover={{
                y: -8,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              }}
            >
              <div className='relative overflow-hidden rounded-t-lg'>
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className='w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105'
                />
                <div
                  className='absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100'
                  style={{
                    backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)',
                  }}
                ></div>
              </div>

              <div className='p-6'>
                <h3 className='text-xl font-medium mb-3' style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
                  {project.title}
                </h3>
                <p className='mb-5 font-light' style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}>
                  {project.description}
                </p>

                <div className='flex flex-wrap gap-2 mb-5'>
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className='px-3 py-1 text-xs rounded-full'
                      style={{
                        backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(243, 244, 246, 0.8)',
                        color: isDarkMode ? '#e5e7eb' : '#4b5563',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className='flex justify-between'>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='font-medium transition-colors'
                      style={{ color: '#0066cc' }}
                      onMouseOver={(e) => (e.currentTarget.style.opacity = '0.8')}
                      onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='font-medium transition-colors'
                      style={{ color: '#0066cc' }}
                      onMouseOver={(e) => (e.currentTarget.style.opacity = '0.8')}
                      onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
