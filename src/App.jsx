import { useState, createContext, useContext, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Search, Coffee, Home, Newspaper, User, Phone, MapPin, Award, Leaf, Heart, Clock, Check, Star, Lightbulb, Users } from 'lucide-react';
import { createPortal } from 'react-dom';
import './index.css';
//import logo from './assets/brew-haven-logo.png';
import { AnimatedButton, AnimatedSection, SuccessModal, FeaturedCoffeeCard, CoffeeCard, BlogCard } from './commonComponents.jsx';

// Import all local menu images with the .png extension
import ethiopianYirgacheffe from './assets/menu-images/ethiopian-yirgacheffe.png';
import classicAmericano from './assets/menu-images/classic-americano.png';
import doubleEspresso from './assets/menu-images/double-espresso.png';
import caramelMacchiato from './assets/menu-images/caramel-macchiato.png';
import cappuccino from './assets/menu-images/cappuccino.png';
import coldBrewOriginal from './assets/menu-images/cold-brew-original.png';
import nitroColdBrew from './assets/menu-images/nitro-cold-brew.png';
import vanillaBeanFrappe from './assets/menu-images/vanilla-bean-frappe.png';
import earlGreyLatte from './assets/menu-images/earl-grey-latte.png';
import greenTeaMatchaLatte from './assets/menu-images/green-tea-matcha-latte.png';
import chocolateCroissant from './assets/menu-images/chocolate-croissant.png';
import cinnamonRoll from './assets/menu-images/cinnamon-roll.png';
import blueberryMuffin from './assets/menu-images/blueberry-muffin.png';
import colombianHuila from './assets/menu-images/colombian-huila.png';

// Import all local blog post images
import pourOverImage from './assets/blog-images/pour-over-coffee.png';
import coldBrewImage from './assets/blog-images/cold-brew.png';
import ethiopianCoffeeImage from './assets/blog-images/ethiopian-coffee.png';
import latteArtImage from './assets/blog-images/latte-art.png';
import sustainableCoffeeImage from './assets/blog-images/sustainable-coffee.png';
import homeEspressoImage from './assets/blog-images/home-espresso.png';

export const CartContext = createContext();

export const menuItems = [
  { id: 1, name: 'Ethiopian Yirgacheffe', price: 18.99, image: ethiopianYirgacheffe, description: 'Bright, floral, and citrus notes with a clean finish. Light Roast.', origin: 'Ethiopia', category: 'Hot Coffee', tags: ['Popular'] },
  { id: 2, name: 'Classic Americano', price: 4.50, image: classicAmericano, description: 'Rich espresso shots with hot water, perfect balance of strength and smoothness.', origin: 'Various', category: 'Hot Coffee', tags: ['Popular'] },
  { id: 3, name: 'Double Espresso', price: 3.75, image: doubleEspresso, description: 'Two shots of our signature espresso blend, rich and full-bodied.', origin: 'Various', category: 'Espresso', tags: [] },
  { id: 4, name: 'Caramel Macchiato', price: 5.75, image: caramelMacchiato, description: 'Vanilla steamed milk marked with espresso and finished with caramel drizzle.', origin: 'Various', category: 'Hot Coffee', tags: [] },
  { id: 5, name: 'Cappuccino', price: 5.25, image: cappuccino, description: 'Equal parts espresso, steamed milk, and milk foam with a dusting of cocoa.', origin: 'Various', category: 'Hot Coffee', tags: [] },
  { id: 6, name: 'Cold Brew Original', price: 4.25, image: coldBrewOriginal, description: 'Smooth, low-acid coffee steeped for 12 hours, served over ice.', origin: 'Various', category: 'Cold Brew', tags: ['Popular'] },
  { id: 7, name: 'Nitro Cold Brew', price: 5.25, image: nitroColdBrew, description: 'Cold brew infused with nitrogen for a creamy, velvety texture.', origin: 'Various', category: 'Cold Brew', tags: [] },
  { id: 8, name: 'Vanilla Bean Frappé', price: 6.25, image: vanillaBeanFrappe, description: 'Blended iced coffee with vanilla bean and whipped cream.', origin: 'Various', category: 'Cold Brew', tags: [] },
  { id: 9, name: 'Earl Grey Latte', price: 4.75, image: earlGreyLatte, description: 'Premium Earl Grey tea with steamed milk and a hint of bergamot.', origin: 'Various', category: 'Tea', tags: [] },
  { id: 10, name: 'Green Tea Matcha Latte', price: 5.50, image: greenTeaMatchaLatte, description: 'Premium ceremonial grade matcha with steamed milk.', origin: 'Various', category: 'Tea', tags: [] },
  { id: 11, name: 'Chocolate Croissant', price: 3.95, image: chocolateCroissant, description: 'Buttery, flaky pastry filled with premium dark chocolate.', origin: 'Various', category: 'Pastries', tags: ['Popular'] },
  { id: 12, name: 'Cinnamon Roll', price: 4.50, image: cinnamonRoll, description: 'Warm, gooey cinnamon roll with cream cheese frosting.', origin: 'Various', category: 'Pastries', tags: [] },
  { id: 13, name: 'Blueberry Muffin', price: 3.25, image: blueberryMuffin, description: 'Fresh baked muffin bursting with juicy blueberries.', origin: 'Various', category: 'Pastries', tags: [] },
  // Adding a new coffee item to demonstrate the layout from the image
  { id: 14, name: 'Colombian Huila', price: 16.99, image: colombianHuila, description: 'Rich chocolate notes with caramel sweetness and nutty finish. Medium Roast.', origin: 'Colombia', category: 'Hot Coffee', tags: ['Popular'] },
];
export const blogPosts = [
  {
    id: 1,
    title: "The Art of Pour-Over: A Complete Guide",
    author: "Sarah Chen",
    date: "10/01/2024",
    readTime: "8 min read",
    category: "Brewing Tips",
    image: pourOverImage,
    authorImage: "https://placehold.co/60x60/D97706/ffffff?text=SC",
    tags: ['Featured'],
    content: `
      <p class="text-gray-700 leading-relaxed mb-6">
        The pour-over method is a simple yet elegant way to brew coffee that gives you maximum control over the final flavor. It's a favorite among coffee enthusiasts for a reason: it highlights the nuanced notes of single-origin beans and provides a clean, bright cup.
      </p>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">What You'll Need</h2>
      <ul class="list-disc list-inside text-gray-700 mb-6 space-y-2">
        <li>A pour-over cone (like a Hario V60 or Chemex)</li>
        <li>Pour-over filters</li>
        <li>A gooseneck kettle for precise pouring</li>
        <li>A digital scale with a timer</li>
        <li>Freshly ground coffee beans</li>
      </ul>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">The Process</h2>
      <p class="text-gray-700 leading-relaxed mb-6">
        Start by heating your water to around 200°F (93°C). Place the filter in the cone and rinse it with hot water to remove any paper taste and preheat your brewing vessel. Discard the rinse water. Add your ground coffee to the filter and gently shake to level the grounds.
      </p>
      <p class="text-gray-700 leading-relaxed">
        The key is the pour. Start with a "bloom" pour, adding just enough water to saturate the grounds (about twice the weight of your coffee). Let it sit for 30-45 seconds. This allows the coffee to release trapped gases. Then, pour in slow, circular motions, working your way from the center outwards, maintaining a consistent water level. Aim to finish your brew in about 3-4 minutes. Enjoy your perfectly brewed cup!
      </p>
    `,
  },
  {
    id: 2,
    title: "Cold Brew vs Iced Coffee: What's the Difference?",
    author: "Emma Thompson",
    date: "10/01/2024",
    readTime: "5 min read",
    category: "Coffee Guide",
    image: coldBrewImage,
    authorImage: "https://placehold.co/60x60/D97706/ffffff?text=ET",
    tags: ['Featured'],
    content: `
      <p class="text-gray-700 leading-relaxed mb-6">
        While both cold brew and iced coffee are served chilled, they are prepared using fundamentally different methods, resulting in distinct flavor profiles.
      </p>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Iced Coffee</h2>
      <p class="text-gray-700 leading-relaxed mb-6">
        Iced coffee is brewed hot, just like a regular cup of coffee, and then cooled. This method produces a brew that can be more acidic and sometimes bitter. It's quick and easy, but the rapid cooling can sometimes dull the more delicate flavors.
      </p>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Cold Brew</h2>
      <p class="text-gray-700 leading-relaxed">
        Cold brew, on the other hand, is steeped in cold water for a long period—typically 12 to 24 hours. This process extracts the flavor compounds without the heat, resulting in a coffee that is naturally sweeter, less acidic, and incredibly smooth. It's the perfect choice for a clean and refreshing drink.
      </p>
    `,
  },
  {
    id: 3,
    title: "Ethiopian Coffee: Journey to the Birthplace of Coffee",
    author: "Michael Rodriguez",
    date: "08/15/2024",
    readTime: "6 min read",
    category: "Origin Stories",
    image: ethiopianCoffeeImage,
    authorImage: "https://placehold.co/60x60/D97706/ffffff?text=MR",
    tags: [],
    content: `
      <p class="text-gray-700 leading-relaxed mb-6">
        The story of coffee begins in the lush forests of Ethiopia, where legend has it a goat herder named Kaldi discovered the energizing effects of the coffee cherry. Since then, Ethiopia has become synonymous with some of the world's most unique and celebrated coffee beans.
      </p>
      <p class="text-gray-700 leading-relaxed">
        Ethiopian coffees are known for their complex, fruity, and floral notes, often with a wine-like acidity. Regions like Yirgacheffe and Sidamo are famous for their distinct flavor profiles, each telling a story of its unique terroir.
      </p>
    `,
  },
  {
    id: 4,
    title: "Latte Art Masterclass: Creating Beautiful Coffee Art",
    author: "David Park",
    date: "08/01/2024",
    readTime: "10 min read",
    category: "Recipes",
    image: latteArtImage,
    authorImage: "https://placehold.co/60x60/D97706/ffffff?text=DP",
    tags: [],
    content: `
      <p class="text-gray-700 leading-relaxed mb-6">
        Latte art is the beautiful, artistic expression that adorns a perfectly crafted latte. It requires a delicate balance of espresso, microfoam, and a steady hand.
      </p>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">The Basics</h2>
      <p class="text-gray-700 leading-relaxed">
        Start with a perfectly pulled espresso shot. The key to good latte art is the milk. It should be steamed to create a smooth, velvety microfoam with a glossy surface. Begin by pouring the milk high above the cup to mix the espresso and milk, then lower the pitcher to create your desired pattern.
      </p>
    `,
  },
  {
    id: 5,
    title: "Sustainable Coffee: How Your Cup Impacts the World",
    author: "Lisa Garcia",
    date: "05/01/2024",
    readTime: "7 min read",
    category: "News",
    image: sustainableCoffeeImage,
    authorImage: "https://placehold.co/60x60/D97706/ffffff?text=LG",
    tags: [],
    content: `
      <p class="text-gray-700 leading-relaxed mb-6">
        The journey from coffee cherry to your cup has a significant impact on the environment and the communities that grow it. Sustainable coffee practices aim to minimize this impact and ensure a better future for everyone involved.
      </p>
      <p class="text-gray-700 leading-relaxed">
        By choosing ethically sourced and sustainably farmed coffee, you support fair wages for farmers, protect biodiversity, and contribute to a healthier planet. It's a simple choice that makes a big difference.
      </p>
    `,
  },
  {
    id: 6,
    title: "Home Espresso Setup: Building Your Dream Coffee Station",
    author: "James Wilson",
    date: "03/01/2024",
    readTime: "12 min read",
    category: "Coffee Guide",
    image: homeEspressoImage,
    authorImage: "https://placehold.co/60x60/D97706/ffffff?text=JW",
    tags: [],
    content: `
      <p class="text-gray-700 leading-relaxed mb-6">
        Creating the perfect home espresso setup can be a rewarding journey. It allows you to enjoy barista-quality coffee from the comfort of your kitchen.
      </p>
      <p class="text-gray-700 leading-relaxed">
        The key components of a great setup include a quality espresso machine, a reliable grinder, and essential accessories like a tamper and milk frothing pitcher. We'll walk you through everything you need to know to get started and build a station that suits your needs and budget.
      </p>
    `,
  },
];

const Header = ({ onPageChange, cartCount, page }) => {
  const { clearCart } = useContext(CartContext);
  const handleCheckout = () => {
    onPageChange('checkout');
    clearCart();
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-md shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <a href="#" onClick={() => onPageChange('home')} className="flex items-center">
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-6xl font-extrabold text-black cursor-pointer font-the-coastal-free"
            >
              Brew Haven
            </motion.h1>
          </a>
        </div>
        <nav className="flex space-x-8 flex-grow justify-center">
          <motion.a
            whileHover={{ scale: 1.1 }}
            className={`nav-link font-semibold text-gray-700 cursor-pointer ${page === 'home' ? 'active' : ''}`}
            onClick={() => onPageChange('home')}
          >
            Home
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            className={`nav-link font-semibold text-gray-700 cursor-pointer ${page === 'menu' ? 'active' : ''}`}
            onClick={() => onPageChange('menu')}
          >
            Menu
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            className={`nav-link font-semibold text-gray-700 cursor-pointer ${page === 'blog' ? 'active' : ''}`}
            onClick={() => onPageChange('blog')}
          >
            Blog
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            className={`nav-link font-semibold text-gray-700 cursor-pointer ${page === 'about' ? 'active' : ''}`}
            onClick={() => onPageChange('about')}
          >
            About
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            className={`nav-link font-semibold text-gray-700 cursor-pointer ${page === 'contact' ? 'active' : ''}`}
            onClick={() => onPageChange('contact')}
          >
            Contact
          </motion.a>
        </nav>
        <div className="flex items-center space-x-4">
          <AnimatedButton onClick={() => onPageChange('cart')} className="border-black 0 bg-gray-200 text-gray-800 relative">
            <ShoppingCart />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key="cart-count"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </AnimatedButton>
          <AnimatedButton onClick={() => handleCheckout()} className="border-white bg-orange-500 text-white hover:bg-orange-700 rounded-md px-6 py-3 font-semibold">
              Order now
          </AnimatedButton>
        </div>
      </div>
    </header>
  );
};

const Footer = ({ onPageChange }) => (
  <footer className="bg-[#783510] text-white p-8">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h4 className="text-2xl font-extrabold text-white mb-4">Brew Haven</h4>
        <p className="text-gray-200 max-w-sm mb-4">
          Crafting exceptional coffee experiences since 2010. From farm to cup, we ensure every sip tells a story of quality, sustainability, and passion.
        </p>
        <div className="flex space-x-4 mt-4">
          <a href="#" aria-label="Facebook" className="hover:text-orange-500 transition-colors text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.909c0-.818.062-1.29.988-1.29h2.022v-3.418l-3.535.013c-2.483 0-4.015 1.439-4.015 3.978v2.626z"/></svg>
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-orange-500 transition-colors text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.162 4.045-2.815 7.425-6.17 7.425-1.196 0-2.316-.341-3.266-.945.166.02.336.023.509.023 1.006 0 1.93-.333 2.678-.916-1.002-.02-1.848-.67-2.132-1.571.145.037.295.056.452.056.216 0 .428-.029.626-.086-1.045-.221-1.845-1.144-1.845-2.282v-.026c.307.171.664.275 1.037.289-.628-.419-1.036-1.139-1.036-1.942 0-.429.114-.829.314-1.173 1.127 1.393 2.802 2.308 4.704 2.404-.031-.17-.046-.351-.046-.532 0-1.283 1.036-2.329 2.328-2.329.673 0 1.282.284 1.706.737.533-.105 1.036-.302 1.487-.562-.178.55-.552 1.01-1.049 1.298.473-.053.931-.183 1.353-.377-.321.498-.72.933-1.172 1.282z"/></svg>
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-orange-500 transition-colors text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-3.23 0-3.63.016-4.9.07C5.83.18 5.1.41 4.4.74A4.75 4.75 0 00.74 4.4C.41 5.1.18 5.83.07 7.1.016 8.37 0 8.77 0 12s.016 3.63.07 4.9c.11 1.27.34 2 .67 2.7.7.33 1.21.83 1.54 1.54.33.7.56 1.43.67 2.7.054 1.27.07 1.67.07 4.9s-.016 3.63-.07 4.9c-.11 1.27-.34 2-.67 2.7-.33.7-.83 1.21-1.54 1.54-.7.33-1.43.56-2.7.67C15.63.016 15.23 0 12 0zm0 2.1c3.19 0 3.58.01 4.83.06 1.1.05 1.76.24 2.27.47.51.23.86.58 1.1.86.27.27.5.58.7.9.2.33.37.7.47 1.1.23.51.42 1.17.47 2.27.05 1.25.06 1.64.06 4.83s-.01 3.58-.06 4.83c-.05 1.1-.24 1.76-.47 2.27-.23.51-.58.86-.86 1.1-.27.27-.58.5-.9.7-.33.2-.7.37-1.1.47-.51.23-1.17.42-2.27.47-1.25.05-1.64.06-4.83.06s-3.58-.01-4.83-.06c-1.1-.05-1.76-.24-2.27-.47-.51-.23-.86-.58-1.1-.86-.27-.27-.5-.58-.7-.9-.2-.33-.37-.7-.47-1.1-.23-.51-.42-1.17-.47-2.27-.05-1.25-.06-1.64-.06-4.83s.01-3.58.06-4.83c.05-1.1.24-1.76.47-2.27.23-.51.58-.86.86-1.1.27-.27.58-.5.9-.7.33-.2.7-.37 1.1-.47.51-.23 1.17-.42 2.27-.47C8.42 2.11 8.81 2.1 12 2.1zm0 2.2a7.7 7.7 0 100 15.4 7.7 7.7 0 000-15.4zm0 2.41a5.29 5.29 0 110 10.58 5.29 5.29 0 010-10.58zm0 2.21a3.08 3.08 0 100 6.16 3.08 3.08 0 000-6.16zM18.8 3.8a1.23 1.23 0 100 2.46 1.23 1.23 0 000-2.46z"/></svg>
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-orange-500 transition-colors text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.615 0-1.1.424-1.1.954 0 .53.486.954 1.1.954.617 0 1.1-.424 1.1-.954s-.485-.954-1.1-.954zm7 6.891h-2v-3.493c0-.817-.014-1.844-1.124-1.844-1.125 0-1.294.877-1.294 1.787v3.55h-2v-6h1.929v.891h.028c.27-.518.934-1.066 1.895-1.066 2.023 0 2.395 1.332 2.395 3.062v3.113z"/></svg>
          </a>
        </div>
      </div>
      <div className="flex-1 text-center">
        <h4 className="text-2xl font-extrabold text-white mb-4">Quick Links</h4>
        <ul className="space-y-2">
          <li><a href="#" onClick={() => onPageChange('home')} className="hover:text-orange-500 transition-colors text-gray-200">Home</a></li>
          <li><a href="#" onClick={() => onPageChange('menu')} className="hover:text-orange-500 transition-colors text-gray-200">Menu</a></li>
          <li><a href="#" onClick={() => onPageChange('blog')} className="hover:text-orange-500 transition-colors text-gray-200">Blog</a></li>
          <li><a href="#" onClick={() => onPageChange('about')} className="hover:text-orange-500 transition-colors text-gray-200">About Us</a></li>
        </ul>
      </div>
      <div className="flex-1 text-right">
        <h4 className="text-2xl font-extrabold text-white mb-4">Contact Us</h4>
        <div className="text-gray-200">
          <p className="flex items-center justify-end mb-2">
            <MapPin className="mr-2 h-5 w-5" />
            <span>123 Coffee Lane, Brew City, BC 12345</span>
          </p>
          <p className="flex items-center justify-end mb-2">
            <Phone className="mr-2 h-5 w-5" />
            <span>(555) 123-4567</span>
          </p>
          <p className="flex items-center justify-end mb-2">
            <User className="mr-2 h-5 w-5" />
            <span>hello@brewhaven.com</span>
          </p>
          <p className="flex items-center justify-end">
            <Clock className="mr-2 h-5 w-5" />
            <span>Mon - Fri: 8am - 6pm</span>
          </p>
        </div>
      </div>
    </div>
    <div className="border-t border-white-100 mt-8 pt-6 text-center text-sm flex flex-col md:flex-row justify-between items-center text-gray-200">
      <span>© 2024 Brew Haven. All rights reserved.</span>
      <div className="mt-2 md:mt-0 space-x-4">
        <a href="#" className="hover:text-orange-500 transition-colors text-gray-200">Privacy Policy</a>
        <a href="#" className="hover:text-orange-500 transition-colors text-gray-200">Terms of Service</a>
      </div>
    </div>
  </footer>
);

const CartModal = ({ isOpen, onClose, cart, updateQuantity, removeItem, checkout }) => {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + tax;
  const handleCheckout = (e) => {
    e.preventDefault();
    checkout();
  };
  if (!isOpen) return null;
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="bg-white w-full max-w-md h-full rounded-l-3xl shadow-2xl overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Your Cart</h2>
            <AnimatedButton onClick={onClose} className="bg-gray-200 text-gray-600 p-2">
              <X />
            </AnimatedButton>
          </div>
          {cart.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-6">
              <ul className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {cart.map(item => (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center space-x-4 border-b pb-4 last:border-b-0"
                    >
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover"/>
                      <div className="flex-grow">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AnimatedButton onClick={() => updateQuantity(item.id, item.quantity - 1)} className="bg-gray-100 p-1 text-gray-600 rounded-full">
                          <Minus className="w-4 h-4"/>
                        </AnimatedButton>
                        <span className="font-bold text-gray-800 w-6 text-center">{item.quantity}</span>
                        <AnimatedButton onClick={() => updateQuantity(item.id, item.quantity + 1)} className="bg-gray-100 p-1 text-gray-600 rounded-full">
                          <Plus className="w-4 h-4"/>
                        </AnimatedButton>
                      </div>
                      <AnimatedButton onClick={() => removeItem(item.id)} className="bg-red-100 text-red-600 p-2 rounded-full">
                        <X className="w-4 h-4"/>
                      </AnimatedButton>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
              <div className="bg-gray-50 rounded-2xl p-6 space-y-2">
                <div className="flex justify-between font-semibold">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-2xl font-extrabold text-gray-900 border-t pt-2 mt-2">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-8 space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">Payment Information</h3>
                <form className="space-y-4" onSubmit={handleCheckout}>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Card Number</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-xl focus:ring-orange-500 focus:border-orange-500" placeholder="**** **** **** 1234"/>
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-gray-700 font-medium mb-1">Expiry Date</label>
                      <input type="text" className="w-full px-4 py-2 border rounded-xl focus:ring-orange-500 focus:border-orange-500" placeholder="MM/YY"/>
                    </div>
                    <div className="flex-1">
                      <label className="block text-gray-700 font-medium mb-1">CVC</label>
                      <input type="text" className="w-full px-4 py-2 border rounded-xl focus:ring-orange-500 focus:border-orange-500" placeholder="***"/>
                    </div>
                  </div>
                  <AnimatedButton type="submit" className="w-full bg-orange-600 text-white mt-4">
                    Place Order
                  </AnimatedButton>
                </form>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };
  const updateQuantity = (id, newQuantity) => {
    setCart((prevCart) => {
      if (newQuantity <= 0) {
        return prevCart.filter((item) => item.id !== id);
      }
      return prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
    });
  };
  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };
  const clearCart = () => {
    setCart([]);
  };
  const checkout = () => {
    setCart([]);
  };
  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeItem, checkout, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

const HomePage = lazy(() => import('./HomePage.jsx'));
const MenuPage = lazy(() => import('./MenuPage.jsx'));
const BlogPage = lazy(() => import('./BlogPage.jsx'));
const ArticlePage = lazy(() => import('./ArticlePage.jsx'));
const AboutPage = lazy(() => import('./AboutPage.jsx'));
const ContactPage = lazy(() => import('./ContactPage.jsx'));
const CartPage = lazy(() => import('./CartPage.jsx'));
const CheckoutPage = lazy(() => import('./CheckoutPage.jsx'));

const App = () => {
  const [page, setPage] = useState('home');
  const [articleId, setArticleId] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartContext = useContext(CartContext);
  const cartCount = cartContext.cart.reduce((acc, item) => acc + item.quantity, 0);
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const onToggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  const pageComponent = () => {
    switch (page) {
      case 'home':
        return <HomePage onPageChange={handlePageChange} />;
      case 'menu':
        return <MenuPage onPageChange={handlePageChange} />;
      case 'blog':
        return <BlogPage onPageChange={handlePageChange} setArticleId={setArticleId} />;
      case 'article':
        return <ArticlePage articleId={articleId} onPageChange={handlePageChange} />;
      case 'about':
        return <AboutPage onPageChange={handlePageChange} />;
      case 'contact':
        return <ContactPage onPageChange={handlePageChange} />;
      case 'cart':
        return <CartPage onPageChange={handlePageChange} />;
      case 'checkout':
        return <CheckoutPage onPageChange={handlePageChange} />;
      default:
        return <HomePage onPageChange={handlePageChange} />;
    }
  };
  return (
    <div className="bg-white min-h-screen font-sans antialiased text-gray-800">
      <Header onPageChange={handlePageChange} cartCount={cartCount} page={page} />
      <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pt-20"
          >
            {pageComponent()}
          </motion.div>
        </AnimatePresence>
      </Suspense>
      <Footer onPageChange={handlePageChange} />
      <CartModal
        isOpen={isCartOpen}
        onClose={onToggleCart}
        cart={cartContext.cart}
        updateQuantity={cartContext.updateQuantity}
        removeItem={cartContext.removeItem}
        checkout={cartContext.checkout}
      />
    </div>
  );
};
const Root = () => (
  <CartProvider>
    <App />
  </CartProvider>
);
export default Root;