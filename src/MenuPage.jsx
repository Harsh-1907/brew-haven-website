import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection, AnimatedButton, CoffeeCard } from './commonComponents.jsx';
import { CartContext } from './App.jsx';
import { menuItems } from './App.jsx';

const MenuPage = ({ onPageChange }) => {
  const { addToCart } = useContext(CartContext);
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Hot Coffee', 'Cold Brew', 'Espresso', 'Tea', 'Pastries'];
  const filteredItems = menuItems.filter(item => filter === 'All' || item.category === filter);
  return (
    <main>
        <AnimatedSection className="container mx-auto py-24 px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">Our Menu</h2>
            <p className="text-lg text-gray-600">Discover our carefully crafted selection of premium coffee, teas, and fresh pastries</p>
        </AnimatedSection>
        <AnimatedSection className="container mx-auto px-4 mb-12">
            <div className="flex flex-wrap justify-center gap-4">
                {categories.map(category => (
                    <motion.button
                        key={category}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilter(category)}
                        className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-200 text-sm ${
                            filter === category 
                                ? 'bg-black text-white border-2 border-white' // Active/Clicked state
                                : 'bg-white text-black border-2 border-black hover:bg-black hover:text-white' // Default and hover state
                        }`}
                    >
                        {category}
                    </motion.button>
                ))}
            </div>
        </AnimatedSection>
        <AnimatedSection className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                    {filteredItems.map(item => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <CoffeeCard item={item} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </AnimatedSection>
        <section className="bg-[#222] text-white py-16 px-4 text-center mt-12">
            <h2 className="text-4xl font-extrabold mb-2">Can't Find What You're Looking For?</h2>
            <p className="text-lg text-white mb-8">Our skilled baristas can create custom drinks tailored to your taste preferences</p>
            <AnimatedButton onClick={() => onPageChange('contact')} className="bg-white text-black hover:bg-gray-200 rounded-lg">
                Ask Our Baristas
            </AnimatedButton>
        </section>
    </main>
  );
};
export default MenuPage;
