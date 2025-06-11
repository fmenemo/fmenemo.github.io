import { motion } from 'framer-motion';
import React from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

const Home: React.FC = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <section
      className='min-h-screen flex flex-col justify-center items-center p-4 relative overflow-hidden'
      style={{
        backgroundColor: isDarkMode ? '#000000' : '#fbfbfd',
        color: isDarkMode ? '#ffffff' : '#000000',
      }}
    >
      {/* Subtle gradient background */}
      <div
        className='absolute inset-0 bg-gradient-to-b z-0'
        style={{
          backgroundImage: isDarkMode ? 'linear-gradient(to bottom, #000000, #1d1d1f)' : 'linear-gradient(to bottom, #fbfbfd, #f5f5f7)',
        }}
      ></div>

      <div className='container relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='text-center'
        >
          {/* Professional greeting */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className='text-lg mb-4 font-medium tracking-wide'
            style={{ color: '#0066cc' }}
          >
            Hello, I'm
          </motion.p>

          <h1 className='text-6xl md:text-8xl font-bold mb-6 leading-none'>
            <span className='block'>Francisco</span>
            <span className='block mt-2'>Menendez</span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className='mb-8'
          >
            <p className='text-2xl md:text-3xl font-light mb-4' style={{ color: isDarkMode ? '#d1d5db' : '#6b7280' }}>
              Principal Software Engineer
            </p>
            <p className='text-lg md:text-xl max-w-3xl mx-auto leading-relaxed' style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}>
              Leading engineering teams and architecting scalable solutions. Passionate about building robust systems, mentoring talent, and
              driving technical excellence across complex software initiatives.
            </p>
          </motion.div>

          {/* Key specialties */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className='flex flex-wrap justify-center gap-4 mb-12'
          >
            {['Engineering Leadership', 'System Architecture', 'Team Management', 'Technical Strategy'].map((specialty, index) => (
              <motion.span
                key={index}
                className='px-6 py-3 rounded-full text-sm font-medium border'
                style={{
                  backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(255, 255, 255, 0.8)',
                  borderColor: isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(209, 213, 219, 0.8)',
                  color: isDarkMode ? '#e5e7eb' : '#374151',
                  backdropFilter: 'blur(10px)',
                }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: '#0066cc',
                  borderColor: '#0066cc',
                  color: '#ffffff',
                }}
                transition={{ duration: 0.2 }}
              >
                {specialty}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className='flex flex-col sm:flex-row gap-4 justify-center items-center'
          >
            <motion.a
              href='#about'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='btn btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl'
              style={{
                background: 'linear-gradient(135deg, #0066cc, #004499)',
                border: 'none',
              }}
            >
              Learn More
            </motion.a>

            <motion.a
              href='#contact'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='btn btn-secondary text-lg px-8 py-4 border-2 hover:shadow-lg'
              style={{
                backgroundColor: 'transparent',
                borderColor: isDarkMode ? '#374151' : '#d1d5db',
                color: isDarkMode ? '#e5e7eb' : '#374151',
              }}
            >
              Get In Touch
            </motion.a>
          </motion.div>

          {/* Social proof or achievements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className='mt-16 flex flex-col sm:flex-row justify-center items-center gap-8 text-center'
          >
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse'></div>
              <span className='text-sm' style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>
                Available for leadership opportunities
              </span>
            </div>
            <div className='text-sm' style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>
              📍 Based in Spain • 🌍 Leading remote teams globally
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating elements for visual interest */}
      <motion.div
        className='absolute top-20 left-10 w-20 h-20 rounded-full opacity-20'
        style={{ backgroundColor: '#0066cc' }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      ></motion.div>

      <motion.div
        className='absolute bottom-20 right-10 w-16 h-16 rounded-full opacity-20'
        style={{ backgroundColor: '#0066cc' }}
        animate={{
          y: [0, 20, 0],
          rotate: [360, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      ></motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className='absolute bottom-8 left-1/2 transform -translate-x-1/2'
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className='flex flex-col items-center gap-2'
        >
          <span className='text-xs tracking-widest' style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>
            SCROLL
          </span>
          <div className='w-px h-8' style={{ backgroundColor: isDarkMode ? '#374151' : '#d1d5db' }}></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;
