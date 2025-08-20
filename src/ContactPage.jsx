import React, { useState, createContext, useContext, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, User, Clock, ShoppingCart, Check, X, Plus, Minus } from 'lucide-react';
import { createPortal } from 'react-dom';

// All necessary components and data are now included in this file to prevent import errors.
const AnimatedButton = ({ children, onClick, className, ...props }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`px-6 py-3 rounded-md font-semibold text-lg transition-colors duration-300 ${className}`}
    {...props}
  >
    {children}
  </motion.button>
);

const AnimatedSection = ({ children, className, ...props }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6 }}
    className={className}
    {...props}
  >
    {children}
  </motion.section>
);

const SuccessModal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center"
      >
        <div className="bg-green-100 text-green-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <Check size={32} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <AnimatedButton onClick={onClose} className="bg-green-600 text-white hover:bg-green-700">
          OK
        </AnimatedButton>
      </motion.div>
    </motion.div>,
    document.body
  );
};

const ContactPage = ({ onPageChange }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.subject && formData.message) {
      let message;
      if (formData.subject === 'Catering Services' || formData.subject === 'Wholesale Inquiries') {
        message = `Thank you for your inquiry about ${formData.subject}. We have received your message and will get back to you shortly.`;
      } else {
        message = "Thank you for your message! We will get back to you shortly.";
      }
      setModalMessage(message);
      setIsModalOpen(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } else {
      setModalMessage("Please fill out all the required fields.");
      setIsModalOpen(true);
    }
  };
  
  const handleQuickLinkClick = (subject) => {
    setFormData(prev => ({ ...prev, subject }));
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <main>
      <style>
        {`
          /* Custom CSS for black placeholder text */
          input::placeholder, select::placeholder, textarea::placeholder {
            color: black;
          }
        `}
      </style>
      <AnimatedSection className="container mx-auto py-24 px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
              Get in <span className="text-orange-600 font-bold text-6xl">Touch</span>
          </h2>
          <p className="text-lg text-gray-600">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </AnimatedSection>
      <AnimatedSection className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          <div className="bg-white p-8 rounded-3xl border border-black">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="sr-only">Name</label>
                  <input type="text" id="name" name="name" placeholder="Name *" className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500" onChange={handleChange} required value={formData.name} />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input type="email" id="email" name="email" placeholder="Email *" className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500" onChange={handleChange} required value={formData.email} />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">Phone</label>
                <input type="tel" id="phone" name="phone" placeholder="Phone" className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500" onChange={handleChange} value={formData.phone} />
              </div>
              <div>
                <label htmlFor="subject" className="sr-only">Subject</label>
                <select id="subject" name="subject" className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500" onChange={handleChange} required value={formData.subject}>
                  <option value="" disabled>Subject *</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Catering Services">Catering Services</option>
                  <option value="Wholesale Inquiries">Wholesale Inquiries</option>
                  <option value="Career Opportunities">Career Opportunities</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div> 
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Message *" className="w-full px-4 py-3 rounded-3xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500" onChange={handleChange} required value={formData.message}></textarea>
                <p className="text-right text-gray-500 text-sm mt-1">{formData.message.length}/500 characters</p>
              </div>
              <AnimatedButton type="submit" className="w-full bg-white text-black border-2 border-black hover:bg-black hover:text-white rounded-md px-6 py-3 font-semibold transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z"/></svg>
                  Send Message
              </AnimatedButton>
            </form>
          </div>
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-black space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Visit Our Shop</h3>
              <div className="flex items-start">
                <MapPin className="w-7 h-8 mr-3 text-orange-600" />
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-gray-600">123 Coffee Street<br/>Bean City, BC 12345</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="w-7 h-8 mr-3 text-orange-600" />
                <div>
                  <p className="font-semibold">Hours</p>
                  <p className="text-gray-600">Mon-Fri: 8:00 AM - 9:00 PM<br/>Sat-Sun: 7:00 AM - 10:00 PM</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-7 h-8 mr-3 text-orange-600" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-gray-600">(555) 123-BREW</p>
                </div>
              </div>
              <div className="flex items-start">
                <User className="w-7 h-8 mr-3 text-orange-600" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-600">hello@brewhaven.com</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-black">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" onClick={(e) => {e.preventDefault(); handleQuickLinkClick('Order Online');}} className="text-orange-600 hover:text-black transition-colors">Order Online</a></li>
                <li><a href="#" onClick={(e) => {e.preventDefault(); handleQuickLinkClick('Catering Services');}} className="text-orange-600 hover:text-black transition-colors">Catering Services</a></li>
                <li><a href="#" onClick={(e) => {e.preventDefault(); handleQuickLinkClick('Wholesale Inquiries');}} className="text-orange-600 hover:text-black transition-colors">Wholesale Inquiries</a></li>
                <li><a href="#" onClick={(e) => {e.preventDefault(); handleQuickLinkClick('Career Opportunities');}} className="text-orange-600 hover:text-black transition-colors">Career Opportunities</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Location</h3>
            <div className="w-full h-96 rounded-3xl overflow-hidden border border-black">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509172!2d144.9537363155823!3d-37.81627997975107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577f8d7b3e2a0c!2sFlinders%20Street%20Station!5e0!3m2!1sen!2sau!4v1625418181678!5m2!1sen!2sau"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
        </div>
      </AnimatedSection>
      <AnimatePresence>
        {isModalOpen && (
          <SuccessModal 
            isOpen={isModalOpen}
            onClose={handleModalClose}
            title="Order Placed"
            message={modalMessage}
          />
        )}
      </AnimatePresence>
    </main>
  );
};
export default ContactPage;
