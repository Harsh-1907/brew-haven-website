import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Users, Star, Lightbulb, Award, Heart } from 'lucide-react';
import { AnimatedSection, AnimatedButton } from './commonComponents.jsx';

// Import local images
import aboutBg from './assets/about-images/about-bg.jpg';
import coffeeRoastingImage from './assets/about-images/coffee-roasting.jpg';
import elenaImage from './assets/about-images/elena-rodriguez.png';
import marcusImage from './assets/about-images/marcus-chen.png';
import sofiaImage from './assets/about-images/sofia-martinez.png';
import davidImage from './assets/about-images/david-thompson.png';

const AboutPage = ({ onPageChange }) => {
  const teamMembers = [
    { name: 'Elena Rodriguez', title: 'Founder & Head Roaster', image: elenaImage },
    { name: 'Marcus Chen', title: 'Head Barista', image: marcusImage },
    { name: 'Sofia Martinez', title: 'Coffee Sourcing Manager', image: sofiaImage },
    { name: 'David Thompson', title: 'Quality Control Specialist', image: davidImage },
  ];

  return (
    <main>
      <AnimatedSection className="relative h-[60vh] flex flex-col items-center justify-center text-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${aboutBg})` }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 p-8">
          <motion.h2
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight"
          >
            About Brew Haven
          </motion.h2>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
          >
            Where passion meets precision in every cup we serve
          </motion.p>
        </div>
      </AnimatedSection>
      <AnimatedSection className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="prose lg:prose-xl max-w-none">
            <h3 className="text-4xl font-extrabold text-gray-900 mb-4">Our Story</h3>
            <p>Founded in 2010 by Elena Rodriguez, Brew Haven began as a dream to create more than just another coffee shop. Elena envisioned a place where the art of coffee roasting would meet genuine community connection.</p>
            <p>Starting with a small roaster in the back of our original location, we've grown into a beloved local institution while maintaining our commitment to quality, sustainability, and the craft of exceptional coffee.</p>
            <p>Today, we continue to honor that original vision by sourcing the finest beans from around the world, roasting them with care and precision, and serving them in an atmosphere that welcomes everyone.</p>
          </div>
          <div>
            <img src={coffeeRoastingImage} alt="Coffee roasting process" className="rounded-3xl shadow-xl"/>
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection className="bg-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-extrabold text-gray-900 mb-2">Our Values</h3>
          <p className="text-lg text-gray-600 mb-12">The principles that guide everything we do at Brew Haven</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-8 rounded-3xl shadow-md flex flex-col items-center text-center">
              <Leaf className="w-12 h-12 text-orange-600 mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">Sustainability</h4>
              <p className="text-gray-600 text-sm">We prioritize environmental responsibility and ethical sourcing in every aspect of our business.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-3xl shadow-md flex flex-col items-center text-center">
              <Users className="w-12 h-12 text-orange-600 mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">Community</h4>
              <p className="text-gray-600 text-sm">Building connections through coffee, supporting local initiatives and creating gathering spaces.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-3xl shadow-md flex flex-col items-center text-center">
              <Star className="w-12 h-12 text-orange-600 mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">Excellence</h4>
              <p className="text-gray-600 text-sm">Committed to the highest quality in everything we do, from bean selection to customer service.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-3xl shadow-md flex flex-col items-center text-center">
              <Lightbulb className="w-12 h-12 text-orange-600 mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">Innovation</h4>
              <p className="text-gray-600 text-sm">Continuously exploring new techniques and technologies to enhance the coffee experience.</p>
            </div>
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-extrabold text-gray-900 mb-2">Meet Our Team</h3>
          <p className="text-lg text-gray-600 mb-12">The passionate people behind every perfect cup</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-white p-6 rounded-3xl shadow-md flex flex-col items-center text-center"
              >
                <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mb-4 object-cover"/>
                <h4 className="text-xl font-bold text-gray-900">{member.name}</h4>
                <p className="text-sm text-gray-500">{member.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection className="bg-orange-600 text-white py-16 px-4 text-center">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Our Impact</h3>
            <p className="text-white">Beyond great coffee, we're committed to making a positive difference in our community and the world.</p>
          </div>
          <div className="text-center">
            <h3 className="text-5xl font-extrabold mb-2">50+</h3>
            <p className="text-white">Partner Farms Worldwide</p>
          </div>
          <div className="text-center">
            <h3 className="text-5xl font-extrabold mb-2">$50K+</h3>
            <p className="text-white">Donated to Community Projects</p>
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection className="bg-[#783510] text-white py-16 px-4 text-center mt-12">
          <div className="container mx-auto">
              <h2 className="text-4xl font-extrabold mb-2">Join Our Coffee Journey</h2>
              <p className="text-lg text-white mb-8">Experience the difference that passion, quality, and community can make</p>
              <div className="flex justify-center space-x-4">
                  <AnimatedButton onClick={() => onPageChange('menu')} className="bg-white text-amber-800 hover:bg-gray-200">
                      Visit Our Shop
                  </AnimatedButton>
                  <AnimatedButton onClick={() => onPageChange('contact')} className="bg-orange-600 text-white hover:bg-orange-700">
                      Contact Us
                  </AnimatedButton>
              </div>
          </div>
      </AnimatedSection>
    </main>
  );
};
export default AboutPage;