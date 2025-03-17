import { motion } from 'framer-motion';
import React from 'react';

const Home: React.FC = () => {
  const isDarkMode = document.documentElement.classList.contains('dark');

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className='text-center max-w-4xl mx-auto'
        >
          <motion.h1
            className='text-6xl md:text-8xl font-semibold mb-6 tracking-tight'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span style={{ color: '#0066cc' }}>Hello,</span> I'm <span className='block mt-2'>Francisco Menendez</span>
          </motion.h1>
          <motion.h2
            className='text-2xl md:text-3xl mb-8 font-normal'
            style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Full Stack Developer & Designer
          </motion.h2>
          <motion.p
            className='text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-light'
            style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            I build beautiful, responsive, and user-friendly web applications with modern technologies.
          </motion.p>
          <motion.div
            className='flex flex-wrap justify-center gap-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href='#projects'
              className='btn btn-primary shadow-md hover:shadow-lg'
            >
              View My Work
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href='#contact'
              className='btn btn-outline shadow-md hover:shadow-lg'
            >
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Apple-style decorative element */}
      <div
        className='absolute bottom-0 left-0 right-0 h-32 z-0'
        style={{
          backgroundImage: isDarkMode ? 'linear-gradient(to top, #000000, transparent)' : 'linear-gradient(to top, #fbfbfd, transparent)',
        }}
      ></div>
    </section>
  );
};

export default Home;
