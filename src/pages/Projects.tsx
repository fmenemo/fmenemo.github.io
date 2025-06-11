import { motion } from 'framer-motion';
import React from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  category: string;
  status: 'Completed' | 'In Progress' | 'Planned';
}

const Projects: React.FC = () => {
  const { isDarkMode } = useDarkMode();

  const projects: Project[] = [
    {
      id: 1,
      title: 'TaskFlow - Project Management Platform',
      description:
        'A comprehensive project management solution with real-time collaboration, task tracking, and team analytics. Features include drag-and-drop kanban boards, time tracking, and automated reporting.',
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Socket.io', 'Tailwind CSS'],
      imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      liveUrl: 'https://taskflow-demo.vercel.app',
      githubUrl: 'https://github.com/fmenemo/taskflow',
      category: 'Web Application',
      status: 'Completed',
    },
    {
      id: 2,
      title: 'EcoTracker - Sustainability Dashboard',
      description:
        'A data visualization platform that helps organizations track their environmental impact. Includes carbon footprint calculations, sustainability metrics, and actionable insights for eco-friendly business practices.',
      technologies: ['Next.js', 'Python', 'FastAPI', 'Chart.js', 'MongoDB', 'AWS'],
      imageUrl: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      liveUrl: 'https://ecotracker-app.netlify.app',
      githubUrl: 'https://github.com/fmenemo/ecotracker',
      category: 'Data Analytics',
      status: 'Completed',
    },
    {
      id: 3,
      title: 'FinanceWise - Personal Finance App',
      description:
        'A mobile-first personal finance application with budget tracking, expense categorization, and financial goal setting. Includes bank account integration and AI-powered spending insights.',
      technologies: ['React Native', 'TypeScript', 'Node.js', 'Express', 'Redis', 'Plaid API'],
      imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      githubUrl: 'https://github.com/fmenemo/financewise',
      category: 'Mobile App',
      status: 'In Progress',
    },
    {
      id: 4,
      title: 'DevPortal - API Documentation Hub',
      description:
        'An interactive API documentation platform with live testing capabilities, code examples, and developer onboarding workflows. Built for enterprise-level API management.',
      technologies: ['Vue.js', 'TypeScript', 'Django', 'OpenAPI', 'Docker', 'Kubernetes'],
      imageUrl: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      liveUrl: 'https://devportal-docs.com',
      githubUrl: 'https://github.com/fmenemo/devportal',
      category: 'Developer Tools',
      status: 'Completed',
    },
    {
      id: 5,
      title: 'ShopSmart - E-commerce Platform',
      description:
        'A modern e-commerce solution with advanced search capabilities, recommendation engine, and multi-vendor support. Features include real-time inventory management and payment processing.',
      technologies: ['Next.js', 'GraphQL', 'Node.js', 'PostgreSQL', 'Stripe', 'Elasticsearch'],
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      githubUrl: 'https://github.com/fmenemo/shopsmart',
      category: 'E-commerce',
      status: 'In Progress',
    },
    {
      id: 6,
      title: 'MindfulSpace - Wellness App',
      description:
        'A mental wellness application with guided meditation, mood tracking, and personalized wellness plans. Includes community features and progress analytics.',
      technologies: ['React', 'Node.js', 'MongoDB', 'WebRTC', 'Firebase', 'Material-UI'],
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      liveUrl: 'https://mindfulspace-app.com',
      githubUrl: 'https://github.com/fmenemo/mindfulspace',
      category: 'Health & Wellness',
      status: 'Completed',
    },
  ];

  const categories = ['All', ...new Set(projects.map((project) => project.category))];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredProjects = selectedCategory === 'All' ? projects : projects.filter((project) => project.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return '#10b981';
      case 'In Progress':
        return '#f59e0b';
      case 'Planned':
        return '#6b7280';
      default:
        return '#6b7280';
    }
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className='section-title'>Featured Projects</h2>
          <p className='text-xl text-center mb-12 max-w-3xl mx-auto font-light' style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}>
            A showcase of my recent work, spanning web applications, mobile apps, and innovative digital solutions. Each project represents
            a unique challenge and demonstrates different aspects of modern development.
          </p>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='flex flex-wrap justify-center gap-3 mb-16'
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category ? 'shadow-lg' : 'hover:shadow-md'
                }`}
                style={{
                  backgroundColor:
                    selectedCategory === category ? '#0066cc' : isDarkMode ? 'rgba(31, 41, 55, 0.8)' : 'rgba(243, 244, 246, 0.8)',
                  color: selectedCategory === category ? '#ffffff' : isDarkMode ? '#e5e7eb' : '#4b5563',
                  border:
                    selectedCategory === category
                      ? 'none'
                      : `1px solid ${isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(209, 213, 219, 0.8)'}`,
                }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className='apple-card group cursor-pointer overflow-hidden'
                style={{
                  backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Project Image */}
                <div className='relative overflow-hidden rounded-lg mb-6 aspect-video'>
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>

                  {/* Status Badge */}
                  <div
                    className='absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium'
                    style={{
                      backgroundColor: getStatusColor(project.status),
                      color: '#ffffff',
                    }}
                  >
                    {project.status}
                  </div>

                  {/* Category Badge */}
                  <div
                    className='absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium'
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      color: '#ffffff',
                    }}
                  >
                    {project.category}
                  </div>
                </div>

                {/* Project Content */}
                <div className='p-1'>
                  <h3 className='text-xl font-semibold mb-3' style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
                    {project.title}
                  </h3>
                  <p className='text-sm mb-4 leading-relaxed' style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}>
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className='flex flex-wrap gap-2 mb-6'>
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className='px-2 py-1 rounded text-xs font-medium'
                        style={{
                          backgroundColor: isDarkMode ? 'rgba(17, 24, 39, 0.8)' : 'rgba(243, 244, 246, 0.8)',
                          color: isDarkMode ? '#d1d5db' : '#374151',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className='flex gap-3'>
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors'
                        style={{
                          backgroundColor: '#0066cc',
                          color: '#ffffff',
                        }}
                      >
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                          />
                        </svg>
                        Live Demo
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors'
                        style={{
                          borderColor: isDarkMode ? '#374151' : '#d1d5db',
                          color: isDarkMode ? '#e5e7eb' : '#374151',
                        }}
                      >
                        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                          <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                        </svg>
                        Code
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className='text-center mt-16'
          >
            <p className='text-lg mb-6' style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}>
              Interested in working together or learning more about these projects?
            </p>
            <motion.a
              href='#contact'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='btn btn-primary shadow-lg hover:shadow-xl'
            >
              Let's Connect
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
