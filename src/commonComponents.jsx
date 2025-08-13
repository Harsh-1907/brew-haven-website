import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ShoppingCart, Plus, Minus, Search, Coffee, Home, Newspaper, User, Phone, MapPin, Award, Leaf, Heart, Clock, Star, Lightbulb, Users } from 'lucide-react';
import { CartContext } from './App.jsx';
import { createPortal } from 'react-dom';

export const AnimatedButton = ({ children, onClick, className, ...props }) => (
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

export const AnimatedSection = ({ children, className, ...props }) => (
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

export const CoffeeCard = ({ item }) => {
  const { cart, addToCart, updateQuantity } = useContext(CartContext);
  const cartItem = cart.find(cartItem => cartItem.id === item.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl shadow-xl overflow-hidden p-6 flex flex-col items-start text-left"
    >
      <div className="relative w-full mb-4">
        <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-2xl"/>
        {item.tags.includes('Popular') && (
          <span className="absolute top-2 left-2 bg-yellow-300 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
            Popular
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{item.name}</h3>
      <p className="text-gray-600 mb-2 flex-grow">{item.description}</p>
      <div className="flex justify-between items-center w-full mt-auto">
        <span className="text-3xl font-extrabold text-orange-600">${item.price.toFixed(2)}</span>
        <AnimatePresence mode="wait">
          {cartItem ? (
            <motion.div
              key="quantity-control"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex items-center space-x-2"
            >
              <AnimatedButton onClick={() => updateQuantity(item.id, cartItem.quantity - 1)} className="bg-gray-100 p-1 text-gray-600 rounded-full">
                <Minus className="w-4 h-4"/>
              </AnimatedButton>
              <span className="font-bold text-gray-800 w-6 text-center">{cartItem.quantity}</span>
              <AnimatedButton onClick={() => updateQuantity(item.id, cartItem.quantity + 1)} className="bg-gray-100 p-1 text-gray-600 rounded-full">
                <Plus className="w-4 h-4"/>
              </AnimatedButton>
            </motion.div>
          ) : (
            <AnimatedButton
              key="add-button"
              onClick={() => addToCart(item)}
              className="bg-orange-600 text-white hover:bg-orange-700 text-base"
            >
              + Add
            </AnimatedButton>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const BlogCard = ({ post, onReadMore, isFeatured }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`bg-white rounded-3xl shadow-xl overflow-hidden p-6 flex flex-col items-start text-left ${isFeatured ? 'h-full' : ''}`}
  >
    <div className="relative w-full mb-4">
      <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-2xl"/>
      {isFeatured && (
        <span className="absolute top-2 left-2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded-full">
          Featured
        </span>
      )}
    </div>
    <div className="flex items-center text-xs text-gray-500 mb-2 space-x-2">
      <span className="font-semibold">{post.category}</span>
      <span className="text-gray-300">•</span>
      <Clock className="w-4 h-4" />
      <span>{post.readTime}</span>
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
    <p className="text-gray-600 flex-grow text-sm mb-4">{post.content.slice(0, 100).replace(/<[^>]+>/g, '')}...</p>
    <div className="flex items-center justify-between w-full mt-auto">
      <div className="flex items-center space-x-2">
        <img src={post.authorImage} alt={post.author} className="w-8 h-8 rounded-full"/>
        <div className="text-sm">
          <p className="font-semibold text-gray-800">{post.author}</p>
          <p className="text-gray-500">{post.date}</p>
        </div>
      </div>
      <AnimatedButton onClick={onReadMore} className="bg-orange-600 text-white hover:bg-orange-700 text-sm">
        Read More
      </AnimatedButton>
    </div>
  </motion.div>
);

export const FeaturedCoffeeCard = ({ item }) => {
  const { cart, addToCart, updateQuantity } = useContext(CartContext);
  const cartItem = cart.find(cartItem => cartItem.id === item.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl shadow-xl overflow-hidden p-6 flex flex-col md:flex-row items-stretch text-left space-y-6 md:space-y-0 md:space-x-6"
    >
      <div className="flex flex-col items-start p-4 flex-grow">
        <div>
          {item.description.includes('Dark Roast') && (
            <span className="mb-2 bg-gray-900 bg-opacity-70 text-white text-xs font-bold px-2 py-1 rounded-full">
              Dark Roast
            </span>
          )}
          {item.description.includes('Medium Roast') && (
            <span className="mb-2 bg-amber-600 bg-opacity-70 text-white text-xs font-bold px-2 py-1 rounded-full">
              Medium Roast
            </span>
          )}
          {item.description.includes('Light Roast') && (
            <span className="mb-2 bg-yellow-300 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
              Light Roast
            </span>
          )}
          <h3 className="text-3xl font-bold text-gray-900 mt-2">{item.name}</h3>
          <p className="text-gray-600 mb-4">{item.description.split('.')[0]}</p>
          <p className="text-3xl font-extrabold text-orange-600">${item.price.toFixed(2)}</p>
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
            <span>Origin: {item.origin}</span>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {cartItem ? (
            <motion.div
              key="quantity-control"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="mt-6 w-full flex justify-center items-center space-x-2 bg-white-100 hover:bg-black-200  p-2 rounded-md"
            >
              <AnimatedButton onClick={() => updateQuantity(item.id, cartItem.quantity - 1)} className="bg-orange-300 hover:bg-black-400 text-white p-1 rounded-md">
                <Minus className="w-4 h-4"/>
              </AnimatedButton>
              <span className="font-bold text-xl text-gray-800 w-6 text-center">{cartItem.quantity}</span>
              <AnimatedButton onClick={() => updateQuantity(item.id, cartItem.quantity + 1)} className="bg-orange-300 hover:bg-black-400 text-white p-1 rounded-md">
                <Plus className="w-4 h-4"/>
              </AnimatedButton>
            </motion.div>
          ) : (
            <AnimatedButton
              key="add-button"
              onClick={() => addToCart(item)}
              className="mt-6 w-full border-black bg-orange-300 text-white-900 hover:bg-orange-700 flex items-center justify-center rounded-md"
            >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
            </AnimatedButton>
          )}
        </AnimatePresence>
      </div>
      <div className="w-full md:w-1/2 flex-shrink-0">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-2xl"/>
      </div>
    </motion.div>
  );
};

export const SuccessModal = ({ isOpen, onClose, title, message }) => {
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