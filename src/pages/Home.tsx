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
        <div className='text-center'>
          {/* Professional greeting */}
          <p className='text-lg mb-4 font-medium tracking-wide' style={{ color: '#0066cc' }}>
            Hello, I'm
          </p>

          <h1 className='text-6xl md:text-8xl font-bold mb-6 leading-none'>
            <span className='block'>Francisco</span>
            <span className='block mt-2'>Menendez</span>
          </h1>

          <div className='mb-8'>
            <p className='text-2xl md:text-3xl font-light mb-4' style={{ color: isDarkMode ? '#d1d5db' : '#6b7280' }}>
              Software Engineer
            </p>
            <p className='text-lg md:text-xl max-w-3xl mx-auto leading-relaxed' style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}>
              Leading engineering teams and architecting scalable solutions. Passionate about building robust systems, mentoring talent, and
              driving technical excellence across complex software initiatives.
            </p>
          </div>

          {/* Key specialties */}
          <div className='flex flex-wrap justify-center gap-4 mb-12'>
            {['System Architecture', 'Cloud Infrastructure', 'Technical Leadership', 'Platform Engineering'].map((specialty, index) => (
              <span
                key={index}
                className='px-6 py-3 rounded-full text-sm font-medium border'
                style={{
                  backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(255, 255, 255, 0.8)',
                  borderColor: isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(209, 213, 219, 0.8)',
                  color: isDarkMode ? '#e5e7eb' : '#374151',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {specialty}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <a
              href='#about'
              className='btn btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl'
              style={{
                background: 'linear-gradient(135deg, #0066cc, #004499)',
                border: 'none',
              }}
            >
              Learn More
            </a>

            <a
              href='#contact'
              className='btn btn-secondary text-lg px-8 py-4 border-2 hover:shadow-lg'
              style={{
                backgroundColor: 'transparent',
                borderColor: isDarkMode ? '#374151' : '#d1d5db',
                color: isDarkMode ? '#e5e7eb' : '#374151',
              }}
            >
              Get In Touch
            </a>
          </div>

          <div className='mt-16 flex flex-col sm:flex-row justify-center items-center gap-8 text-center'>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse'></div>
              <span className='text-sm' style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>
                Available for leadership opportunities
              </span>
            </div>
            <div className='text-sm' style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>
              📍 Based in Spain • 🌍 Leading remote teams globally
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
