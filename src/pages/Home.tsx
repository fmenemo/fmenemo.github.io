import { motion } from 'framer-motion';
import React from 'react';

const Home: React.FC = () => {
  return (
    <section className='min-h-screen flex flex-col justify-center items-center bg-light dark:bg-dark text-dark dark:text-light p-4 relative overflow-hidden'>
      {/* Background pattern */}
      <div className='absolute inset-0 z-0 opacity-10 dark:opacity-20'>
        <div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]'></div>
      </div>

      <div className='container relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-center max-w-3xl mx-auto'
        >
          <motion.h1
            className='text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hello, I'm <span className='block mt-2'>Francisco Menendez</span>
          </motion.h1>
          <motion.h2
            className='text-2xl md:text-3xl mb-8'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Full Stack Developer & Designer
          </motion.h2>
          <motion.p
            className='text-lg md:text-xl mb-10 max-w-2xl mx-auto'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            I build beautiful, responsive, and user-friendly web applications with modern technologies.
          </motion.p>
          <motion.div
            className='flex flex-wrap justify-center gap-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href='#projects'
              className='btn btn-primary rounded-full shadow-lg hover:shadow-xl'
            >
              View My Work
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href='#contact'
              className='btn btn-outline rounded-full shadow-lg hover:shadow-xl'
            >
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
