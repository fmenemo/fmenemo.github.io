import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

const Contact: React.FC = () => {
  const { isDarkMode } = useDarkMode();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: (
        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
          />
        </svg>
      ),
      title: 'Email',
      description: 'Reach out for project inquiries or collaborations',
      contact: 'francisco@fmenemo.dev',
      action: 'mailto:francisco@fmenemo.dev',
    },
    {
      icon: (
        <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
        </svg>
      ),
      title: 'LinkedIn',
      description: "Let's connect professionally",
      contact: 'francisco-menendez',
      action: 'https://linkedin.com/in/francisco-menendez',
    },
    {
      icon: (
        <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
        </svg>
      ),
      title: 'GitHub',
      description: 'Check out my latest projects and contributions',
      contact: 'fmenemo',
      action: 'https://github.com/fmenemo',
    },
    {
      icon: (
        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
          />
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
        </svg>
      ),
      title: 'Location',
      description: 'Available for remote work worldwide',
      contact: 'Spain • Remote',
      action: null,
    },
  ];

  const projectTypes = [
    'Web Application Development',
    'Mobile App Development',
    'API Development & Integration',
    'E-commerce Solutions',
    'Data Analytics Dashboards',
    'Technical Consulting',
    'Code Review & Optimization',
    'Other',
  ];

  return (
    <section
      id='contact'
      className='py-24 relative overflow-hidden'
      style={{
        backgroundColor: isDarkMode ? '#000000' : '#f5f5f7',
        color: isDarkMode ? '#ffffff' : '#000000',
      }}
    >
      <div className='container mx-auto px-4'>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className='section-title'>Let's Work Together</h2>
          <p className='text-xl text-center mb-16 max-w-3xl mx-auto font-light' style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}>
            Ready to bring your ideas to life? I'm currently available for freelance projects and exciting opportunities. Let's discuss how
            we can create something amazing together.
          </p>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-start'>
            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='space-y-8'
            >
              <div>
                <h3 className='text-2xl font-semibold mb-8' style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
                  Get in Touch
                </h3>
                <p className='text-lg mb-8' style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}>
                  Whether you have a project in mind, need technical consultation, or just want to say hello, I'd love to hear from you.
                  Here are the best ways to reach me:
                </p>
              </div>

              <div className='space-y-6'>
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className='apple-card p-6 group cursor-pointer'
                    style={{
                      backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                    }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => method.action && window.open(method.action, '_blank')}
                  >
                    <div className='flex items-start gap-4'>
                      <div
                        className='p-3 rounded-lg transition-colors'
                        style={{
                          backgroundColor: '#0066cc',
                          color: '#ffffff',
                        }}
                      >
                        {method.icon}
                      </div>
                      <div className='flex-1'>
                        <h4 className='text-lg font-semibold mb-2' style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
                          {method.title}
                        </h4>
                        <p className='text-sm mb-2' style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}>
                          {method.description}
                        </p>
                        <p className='font-medium' style={{ color: '#0066cc' }}>
                          {method.contact}
                        </p>
                      </div>
                      {method.action && (
                        <svg
                          className='w-5 h-5 transition-transform group-hover:translate-x-1'
                          style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                        </svg>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Availability Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className='apple-card p-6'
                style={{
                  backgroundColor: isDarkMode ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.05)',
                  border: `1px solid rgba(16, 185, 129, 0.2)`,
                }}
              >
                <div className='flex items-center gap-3'>
                  <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse'></div>
                  <div>
                    <h4 className='font-semibold' style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
                      Currently Available
                    </h4>
                    <p className='text-sm' style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}>
                      Ready to start new projects • Typical response time: 24 hours
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='apple-card p-8'
              style={{
                backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <h3 className='text-2xl font-semibold mb-6' style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
                Send me a message
              </h3>

              {submitSuccess ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className='text-center py-8'>
                  <div
                    className='w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center'
                    style={{ backgroundColor: '#10b981' }}
                  >
                    <svg
                      className='w-8 h-8 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                    </svg>
                  </div>
                  <h4 className='text-xl font-semibold mb-2' style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
                    Message Sent!
                  </h4>
                  <p style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}>Thank you for reaching out. I'll get back to you soon!</p>
                  <button onClick={() => setSubmitSuccess(false)} className='mt-4 text-blue-600 hover:text-blue-800 font-medium'>
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className='space-y-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <label className='block text-sm font-medium mb-2' style={{ color: isDarkMode ? '#e5e7eb' : '#374151' }}>
                        Name *
                      </label>
                      <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className='form-input'
                        placeholder='Your full name'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium mb-2' style={{ color: isDarkMode ? '#e5e7eb' : '#374151' }}>
                        Email *
                      </label>
                      <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className='form-input'
                        placeholder='your.email@example.com'
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium mb-2' style={{ color: isDarkMode ? '#e5e7eb' : '#374151' }}>
                      Project Type
                    </label>
                    <select name='subject' value={formData.subject} onChange={handleChange} className='form-input'>
                      <option value=''>Select a project type</option>
                      {projectTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-medium mb-2' style={{ color: isDarkMode ? '#e5e7eb' : '#374151' }}>
                      Message *
                    </label>
                    <textarea
                      name='message'
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className='form-input resize-none'
                      placeholder='Tell me about your project, timeline, budget, and any specific requirements...'
                    />
                  </div>

                  {submitError && <p className='text-red-500 text-sm'>{submitError}</p>}

                  <motion.button
                    type='submit'
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='w-full btn btn-primary text-lg py-4 flex items-center justify-center gap-2'
                    style={{
                      background: 'linear-gradient(135deg, #0066cc, #004499)',
                      opacity: isSubmitting ? 0.7 : 1,
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className='animate-spin w-5 h-5' fill='none' viewBox='0 0 24 24'>
                          <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                          <path
                            className='opacity-75'
                            fill='currentColor'
                            d='m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8' />
                        </svg>
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Additional CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className='text-center mt-16 apple-card p-8 max-w-2xl mx-auto'
            style={{
              backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.3)' : 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <h3 className='text-xl font-semibold mb-4' style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
              Prefer a quick chat?
            </h3>
            <p className='mb-6' style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}>
              Sometimes a conversation is the best way to explore ideas. Feel free to reach out directly.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <motion.a
                href='mailto:francisco@fmenemo.dev'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='btn btn-primary'
              >
                Email Me Directly
              </motion.a>
              <motion.a
                href='https://linkedin.com/in/francisco-menendez'
                target='_blank'
                rel='noopener noreferrer'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='btn btn-secondary border'
                style={{
                  borderColor: isDarkMode ? '#374151' : '#d1d5db',
                  color: isDarkMode ? '#e5e7eb' : '#374151',
                }}
              >
                Connect on LinkedIn
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
