import { motion } from 'framer-motion';
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      // In a real application, you would send the form data to a server
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setSubmitError('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id='contact' className='py-24 bg-light dark:bg-dark text-dark dark:text-light'>
      <div className='container mx-auto px-4'>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className='max-w-2xl mx-auto'>
          <h2 className='section-title'>Get In Touch</h2>
          <p className='text-xl text-center mb-12 text-gray-600 dark:text-gray-300 font-light max-w-xl mx-auto'>
            Have a question or want to work together? Feel free to reach out!
          </p>

          {submitSuccess ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='apple-card text-center py-8'>
              <svg
                className='w-16 h-16 text-green-500 mx-auto mb-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
              <h3 className='text-2xl font-medium mb-4'>Thank You!</h3>
              <p className='text-gray-600 dark:text-gray-300'>
                Your message has been sent successfully. I'll get back to you as soon as possible.
              </p>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className='apple-card'>
              <form onSubmit={handleSubmit} className='space-y-8'>
                {submitError && (
                  <div className='bg-red-50 border-l-4 border-red-500 p-4 rounded-md'>
                    <p className='text-red-700'>{submitError}</p>
                  </div>
                )}

                <div>
                  <label htmlFor='name' className='block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300'>
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-3 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                  />
                </div>

                <div>
                  <label htmlFor='email' className='block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300'>
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-3 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                  />
                </div>

                <div>
                  <label htmlFor='message' className='block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300'>
                    Message
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className='w-full px-4 py-3 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type='submit'
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 bg-primary text-white rounded-full font-medium transition-all ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary/90'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>
          )}

          <div className='mt-20 text-center'>
            <h3 className='text-xl font-medium mb-6'>Connect With Me</h3>
            <div className='flex justify-center space-x-8'>
              <motion.a
                whileHover={{ scale: 1.1, y: -5 }}
                href='https://github.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors'
              >
                <svg className='w-7 h-7' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                  <path
                    fillRule='evenodd'
                    d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
                    clipRule='evenodd'
                  />
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -5 }}
                href='https://linkedin.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors'
              >
                <svg className='w-7 h-7' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                  <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -5 }}
                href='https://twitter.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors'
              >
                <svg className='w-7 h-7' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                  <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
                </svg>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
