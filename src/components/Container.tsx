import React from 'react';

// The measure, defined once: a fixed max width with the page's gutters. Every
// band of the page sits inside one of these so the left edge lines up from the
// masthead to the footer.
const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`mx-auto w-full max-w-5xl px-6 md:px-10 ${className}`}>{children}</div>
);

export default Container;
