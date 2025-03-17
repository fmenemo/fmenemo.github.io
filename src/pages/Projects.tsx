import { motion } from 'framer-motion';
import React from 'react';

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
    <section id='projects' className='py-24 bg-gray-50 dark:bg-dark-700 text-dark dark:text-light'>
      <div className='container mx-auto px-4'>
        <h2 className='section-title'>My Projects</h2>

        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className='apple-card overflow-hidden transition-all duration-300 group'
              variants={itemVariants}
              whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            >
              <div className='relative overflow-hidden rounded-lg mb-6'>
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className='w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              </div>

              <h3 className='text-xl font-medium mb-3'>{project.title}</h3>
              <p className='text-gray-600 dark:text-gray-300 mb-5 font-light'>{project.description}</p>

              <div className='flex flex-wrap gap-2 mb-5'>
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className='px-3 py-1 bg-gray-100 dark:bg-dark-800 text-xs rounded-full text-gray-600 dark:text-gray-300'
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
                    className='text-primary hover:text-primary hover:text-opacity-80 transition-colors font-medium'
                  >
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-primary hover:text-primary hover:text-opacity-80 transition-colors font-medium'
                  >
                    GitHub
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
