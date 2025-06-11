import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3 bg-opacity-80 backdrop-blur-xl shadow-sm' : 'py-5 bg-transparent'
      }`}
      style={{
        backgroundColor: scrolled ? (isDarkMode ? 'rgba(0, 0, 0, 0.9)' : 'rgba(251, 251, 253, 0.8)') : 'transparent',
      }}
    >
      <div className='container mx-auto px-4'>
        <nav className='flex justify-between items-center'>
          <a href='#home' className='text-2xl font-medium' style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
            Francisco<span style={{ color: '#0066cc' }}>.</span>
          </a>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            <div className='flex space-x-8'>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className='text-sm font-medium transition-colors'
                  style={{
                    color: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#0066cc')}
                  onMouseOut={(e) => (e.currentTarget.style.color = isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)')}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <button
              onClick={toggleDarkMode}
              className='p-2 rounded-full transition-colors'
              style={{
                backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
                color: isDarkMode ? '#ffffff' : '#000000',
              }}
              aria-label='Toggle dark mode'
            >
              {isDarkMode ? (
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
                  />
                </svg>
              ) : (
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden flex items-center space-x-4'>
            <button
              onClick={toggleDarkMode}
              className='p-2 rounded-full'
              style={{
                backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
                color: isDarkMode ? '#ffffff' : '#000000',
              }}
              aria-label='Toggle dark mode'
            >
              {isDarkMode ? (
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
                  />
                </svg>
              ) : (
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                  />
                </svg>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='focus:outline-none'
              style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
              aria-label='Toggle mobile menu'
            >
              {isMobileMenuOpen ? (
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              ) : (
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='md:hidden w-full overflow-hidden'
            style={{
              backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.95)' : 'rgba(251, 251, 253, 0.95)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
          >
            <div className='container mx-auto px-4 py-6'>
              <div className='flex flex-col space-y-6'>
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className='text-lg font-medium transition-colors'
                    style={{
                      color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#0066cc')}
                    onMouseOut={(e) => (e.currentTarget.style.color = isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)')}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
