import React from 'react';

const Home: React.FC = () => {
  return (
    <section className='min-h-screen flex flex-col justify-center items-center p-4 relative overflow-hidden bg-paper text-black dark:bg-black dark:text-white'>
      {/* Subtle gradient background */}
      <div className='absolute inset-0 z-0 bg-linear-to-b from-paper to-surface dark:from-black dark:to-surface-dark'></div>

      <div className='container relative z-10'>
        <div className='text-center'>
          {/* Professional greeting */}
          <p className='text-lg mb-4 font-medium tracking-wide text-accent'>Hello, I'm</p>

          <h1 className='text-6xl md:text-8xl font-bold mb-6 leading-none'>
            <span className='block'>Francisco</span>
            <span className='block mt-2'>Menendez</span>
          </h1>

          <div className='mb-8'>
            <p className='text-2xl md:text-3xl font-light mb-4 text-gray-500 dark:text-gray-300'>Software Engineer</p>
            <p className='text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-600 dark:text-gray-400'>
              Leading engineering teams and architecting scalable solutions. Passionate about building robust systems, mentoring talent, and
              driving technical excellence across complex software initiatives.
            </p>
          </div>

          {/* Key specialties */}
          <div className='flex flex-wrap justify-center gap-4 mb-12'>
            {['System Architecture', 'Cloud Infrastructure', 'Technical Leadership', 'Platform Engineering'].map((specialty, index) => (
              <span
                key={index}
                className='px-6 py-3 rounded-full text-sm font-medium border backdrop-blur-[10px] bg-white/80 border-gray-300/80 text-gray-700 dark:bg-gray-800/50 dark:border-gray-600/30 dark:text-gray-200'
              >
                {specialty}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <a
              href='#about'
              className='btn btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl border-none bg-linear-135 from-accent to-accent-strong'
            >
              Learn More
            </a>

            <a
              href='#contact'
              className='btn btn-secondary text-lg px-8 py-4 border-2 hover:shadow-lg bg-transparent border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-200'
            >
              Get In Touch
            </a>
          </div>

          <div className='mt-16 flex flex-col sm:flex-row justify-center items-center gap-8 text-center'>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse'></div>
              <span className='text-sm text-gray-500 dark:text-gray-400'>Available for leadership opportunities</span>
            </div>
            <div className='text-sm text-gray-500 dark:text-gray-400'>📍 Based in Spain • 🌍 Leading remote teams globally</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
