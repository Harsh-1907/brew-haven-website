import React, { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Leaf, Heart, Check, ShoppingCart, Home } from 'lucide-react';
import { AnimatedSection, AnimatedButton, FeaturedCoffeeCard, BlogCard } from './commonComponents.jsx';
import { CartContext } from './App.jsx';
import { menuItems } from './App.jsx';
import bgImage from './assets/brew-haven-bg.jpg';
import sarahImage from './assets/reviewer-images/sarah-mitchell.png';
import michaelImage from './assets/reviewer-images/michael-chen.png';
import emmaImage from './assets/reviewer-images/emma-rodriguez.png';

const HomePage = ({ onPageChange }) => {
  const { addToCart } = useContext(CartContext);
  const [currentCarousel, setCurrentCarousel] = useState(0);

  // Filter the menu items to only include "Popular" items for the carousel
  const featuredItems = menuItems.filter(item => item.tags.includes('Popular'));

  useEffect(() => {
    if (featuredItems.length > 0) {
      const interval = setInterval(() => {
        setCurrentCarousel((prev) => (prev + 1) % featuredItems.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [featuredItems]);

  const teamMembers = [
    { name: 'Sarah Mitchell', title: 'Coffee Enthusiast', image: sarahImage },
    { name: 'Michael Chen', title: 'Local Business Owner', image: michaelImage },
    { name: 'Emma Rodriguez', title: 'Food Blogger', image: emmaImage },
  ];

  return (
    <>
      <main>
        <AnimatedSection className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}>
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="relative z-10 p-8">
            <motion.h2
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight"
            >
              Welcome to Brew Haven
            </motion.h2>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
            >
              Where every cup tells a story of passion, quality, and the perfect blend of tradition and innovation
            </motion.p>
            <div className="flex justify-center space-x-4">
                <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                >
                <AnimatedButton onClick={() => onPageChange('menu')} className="border-white bg-orange-500 text-white hover:bg-orange-700 rounded-md px-6 py-3 font-semibold">
                    Explore Our Menu
                </AnimatedButton>
                </motion.div>
                <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                >
                <AnimatedButton onClick={() => onPageChange('checkout')} className="bg-white text-black hover:bg-orange-200 rounded-md px-6 py-3 font-semibold">
                    Order Online
                </AnimatedButton>
                </motion.div>
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection className="container mx-auto py-16 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold text-center text-gray-900 mb-2"
          >
            Featured Coffee Selection
          </motion.h2>
          <p className="text-center text-gray-600 mb-12">
            Discover our carefully curated selection of premium coffee beans from around the world
          </p>
          <div className="relative">
            <AnimatePresence initial={false} mode="wait">
              {featuredItems.length > 0 && (
                <motion.div
                  key={featuredItems[currentCarousel].id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="w-full flex justify-center"
                >
                  <div className="w-full">
                    <FeaturedCoffeeCard item={featuredItems[currentCarousel]} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex justify-center space-x-2 mt-8">
            {featuredItems.map((_, index) => (
              <motion.div
                key={index}
                onClick={() => setCurrentCarousel(index)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${
                  index === currentCarousel ? 'bg-orange-600' : 'bg-gray-300'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </AnimatedSection>
        <AnimatedSection className="bg-amber-800 text-white py-16 px-4">
          <div className="container mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-extrabold text-center text-white mb-2"
            >
              Why Choose Brew Haven?
            </motion.h2>
            <p className="text-center text-gray-200 mb-12 max-w-2xl mx-auto">
              We're more than just a coffee shop. We're passionate craftspeople dedicated to bringing you the world's finest coffee experiences.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-8 rounded-3xl"
              >
                <Leaf className="text-yellow-300 w-12 h-12 mb-4"/>
                <h3 className="text-2xl font-bold text-white mb-2">Ethically Sourced</h3>
                <p className="text-gray-200">
                  Direct trade relationships with coffee farmers ensuring fair wages and sustainable practices.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="p-8 rounded-3xl"
              >
                <Award className="text-yellow-300 w-12 h-12 mb-4"/>
                <h3 className="text-2xl font-bold text-white mb-2">Expert Roasting</h3>
                <p className="text-gray-200">
                  Small-batch roasting in-house to bring out the unique characteristics of each origin.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="p-8 rounded-3xl"
              >
                <Heart className="text-yellow-300 w-12 h-12 mb-4"/>
                <h3 className="text-2xl font-bold text-white mb-2">Passionate Community</h3>
                <p className="text-gray-200">
                  A welcoming space where coffee lovers gather to share their passion and discover new flavors.
                </p>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection className="bg-white py-16 px-4">
          <div className="container mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-extrabold text-center text-gray-900 mb-2"
            >
              What Our Customers Say
            </motion.h2>
            <p className="text-center text-gray-600 mb-12">
              Don't just take our word for it. Here's what coffee lovers are saying about Brew Haven
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-gray-50 p-8 rounded-3xl shadow-lg"
                >
                    <div className="flex items-center mb-4">
                        <img src={sarahImage} alt="Sarah Mitchell" className="rounded-full mr-4"/>
                        <div>
                            <h4 className="font-bold text-lg text-gray-900">Sarah Mitchell</h4>
                            <p className="text-sm text-gray-500">Coffee Enthusiast</p>
                            <div className="flex mt-1">
                                <span className="text-yellow-400">★★★★★</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-700 italic">"Brew Haven has completely transformed my morning routine. Their Ethiopian Yirgacheffe is absolutely divine!"</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-gray-50 p-8 rounded-3xl shadow-lg"
                >
                    <div className="flex items-center mb-4">
                        <img src={michaelImage} alt="Michael Chen" className="rounded-full mr-4"/>
                        <div>
                            <h4 className="font-bold text-lg text-gray-900">Michael Chen</h4>
                            <p className="text-sm text-gray-500">Local Business Owner</p>
                            <div className="flex mt-1">
                                <span className="text-yellow-400">★★★★★</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-700 italic">"The quality and consistency of their coffee is unmatched. Perfect for our office meetings and client presentations."</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="bg-gray-50 p-8 rounded-3xl shadow-lg"
                >
                    <div className="flex items-center mb-4">
                        <img src={emmaImage} alt="Emma Rodriguez" className="rounded-full mr-4"/>
                        <div>
                            <h4 className="font-bold text-lg text-gray-900">Emma Rodriguez</h4>
                            <p className="text-sm text-gray-500">Food Blogger</p>
                            <div className="flex mt-1">
                                <span className="text-yellow-400">★★★★★</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-700 italic">"As someone who reviews coffee shops professionally, Brew Haven sets the gold standard for specialty coffee."</p>
                </motion.div>
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection className="py-16 px-4 text-center text-white" style={{ backgroundColor: '#783510' }}>
          <h2 className="text-4xl font-extrabold mb-2">Ready to Experience Exceptional Coffee?</h2>
          <p className="text-lg text-white mb-8">Join thousands of coffee enthusiasts who have made Brew Haven their daily ritual</p>
          <div className="flex justify-center space-x-4">
              <AnimatedButton onClick={() => onPageChange('checkout')} className="bg-white text-orange-600 hover:bg-orange-200 rounded-md px-6 py-3 font-semibold">
                  Order Now
              </AnimatedButton>
              <AnimatedButton onClick={() => onPageChange('menu')} className="bg-white text-orange-600 hover:bg-orange-200 rounded-md px-6 py-3 font-semibold">
                  Visit Our Shop
              </AnimatedButton>
          </div>
      </AnimatedSection>
      </main>
    </>
  );
};
export default HomePage;