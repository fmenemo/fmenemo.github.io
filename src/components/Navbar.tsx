import React, { useEffect, useState } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

const SunIcon = () => (
  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
    />
  </svg>
);

const MoonIcon = () => (
  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
    />
  </svg>
);

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

  const themeToggleLabel = isDarkMode ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-paper/90 dark:bg-black/90 backdrop-blur-lg border-b border-gray-200/30 dark:border-gray-600/30'
          : 'bg-transparent'
      }`}
    >
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='text-xl font-semibold cursor-pointer text-black dark:text-white'>FM.</div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className='text-sm font-medium transition-colors duration-300 hover:opacity-80 text-gray-700 dark:text-gray-200'
              >
                {link.name}
              </a>
            ))}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label={themeToggleLabel}
              className='p-2 rounded-full transition-colors duration-300 bg-gray-100/50 text-black dark:bg-gray-700/50 dark:text-white'
            >
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden flex items-center space-x-4'>
            {/* Mobile Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label={themeToggleLabel}
              className='p-2 rounded-full transition-colors duration-300 bg-gray-100/50 text-black dark:bg-gray-700/50 dark:text-white'
            >
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              className='p-2 rounded-md transition-colors duration-300 text-black dark:text-white'
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
        <div className='md:hidden border-t backdrop-blur-lg bg-paper/95 border-gray-200/30 dark:bg-black/95 dark:border-gray-600/30'>
          <div className='container mx-auto px-4 py-4 space-y-2'>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className='block py-2 text-base font-medium transition-colors duration-300 text-gray-700 dark:text-gray-200'
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
