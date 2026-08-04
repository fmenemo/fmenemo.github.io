import React, { useEffect, useState } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
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
    <nav
      className='fixed top-0 left-0 right-0 z-50 transition-all duration-500'
      style={{
        background: scrolled ? (isDarkMode ? 'rgba(0, 0, 0, 0.9)' : 'rgba(251, 251, 253, 0.9)') : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? `1px solid ${isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.3)'}` : 'none',
      }}
    >
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='text-xl font-semibold cursor-pointer' style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
            FM.
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className='text-sm font-medium transition-colors duration-300 hover:opacity-80'
                style={{ color: isDarkMode ? '#e5e7eb' : '#374151' }}
              >
                {link.name}
              </a>
            ))}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className='p-2 rounded-full transition-colors duration-300'
              style={{
                backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(243, 244, 246, 0.5)',
                color: isDarkMode ? '#ffffff' : '#000000',
              }}
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

          {/* Mobile menu button */}
          <div className='md:hidden flex items-center space-x-4'>
            {/* Mobile Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className='p-2 rounded-full transition-colors duration-300'
              style={{
                backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(243, 244, 246, 0.5)',
                color: isDarkMode ? '#ffffff' : '#000000',
              }}
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
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              className='p-2 rounded-md transition-colors duration-300'
              style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
            >
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                {isMobileMenuOpen ? (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                ) : (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div
          className='md:hidden border-t'
          style={{
            backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.95)' : 'rgba(251, 251, 253, 0.95)',
            borderColor: isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.3)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div className='container mx-auto px-4 py-4 space-y-2'>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className='block py-2 text-base font-medium transition-colors duration-300'
                style={{ color: isDarkMode ? '#e5e7eb' : '#374151' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
