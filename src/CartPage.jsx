import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus, X, Check } from 'lucide-react';
import { AnimatedSection, AnimatedButton } from './commonComponents.jsx';
import { CartContext } from './App.jsx';

const CartPage = ({ onPageChange }) => {
  const { cart, updateQuantity, removeItem, clearCart } = useContext(CartContext);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.085;
  const total = subtotal + tax;
  return (
    <main className="container mx-auto py-24 px-4">
      <AnimatedSection className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
              Your <span className="text-orange-600">Cart</span>
          </h2>
          <p className="text-lg text-gray-600">Review your items before checkout</p>
      </AnimatedSection>
      {cart.length === 0 ? (
        <AnimatedSection className="text-center bg-white p-12 rounded-3xl shadow-xl max-w-2xl mx-auto">
          <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-gray-900 mb-2">Your Cart is Empty</h3>
          <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <AnimatedButton onClick={() => onPageChange('menu')} className="bg-orange-600 text-white hover:bg-orange-700">
            Browse Menu
          </AnimatedButton>
        </AnimatedSection>
      ) : (
        <AnimatedSection className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-xl">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h3 className="text-2xl font-bold text-gray-900">Cart Items ({totalItems})</h3>
              <AnimatedButton onClick={clearCart} className="bg-gray-100 text-gray-600 text-sm">
                Clear All
              </AnimatedButton>
            </div>
            <ul className="space-y-6">
              <AnimatePresence mode="popLayout">
                {cart.map(item => (
                  <motion.li
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center space-x-4 border-b pb-6 last:border-b-0"
                  >
                    <img src={item.image} alt={item.name} className="w-24 h-24 rounded-2xl object-cover"/>
                    <div className="flex-grow">
                      <h4 className="text-xl font-semibold text-gray-900">{item.name}</h4>
                      <p className="text-lg text-gray-600">${item.price.toFixed(2)}</p>
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
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl h-fit">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8.5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-2xl font-extrabold text-gray-900 border-t pt-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <AnimatedButton onClick={() => onPageChange('checkout')} className="w-full bg-orange-600 text-white hover:bg-orange-700 mt-6">
              Proceed to Checkout
            </AnimatedButton>
            <AnimatedButton onClick={() => onPageChange('menu')} className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200 mt-4">
              Continue Shopping
            </AnimatedButton>
            <div className="mt-6 flex items-center text-sm text-gray-500">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Free delivery on orders over $25</span>
            </div>
          </div>
        </AnimatedSection>
      )}
    </main>
  );
};
export default CartPage;