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
    <section id='projects' className='py-20 bg-light dark:bg-dark text-dark dark:text-light'>
      <div className='container mx-auto px-4'>
        <h2 className='text-4xl font-bold mb-12 text-center'>My Projects</h2>

        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className='bg-white/30 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50'
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <img src={project.imageUrl} alt={project.title} className='w-full h-48 object-cover' />
              <div className='p-6'>
                <h3 className='text-xl font-bold mb-2'>{project.title}</h3>
                <p className='text-gray-700 dark:text-gray-300 mb-4'>{project.description}</p>

                <div className='flex flex-wrap gap-2 mb-4'>
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className='px-2 py-1 bg-white/20 dark:bg-dark-700/30 text-xs rounded-full border border-gray-200/50 dark:border-gray-700/50'
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
                      className='text-primary hover:text-secondary transition-colors'
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-primary hover:text-secondary transition-colors'
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
