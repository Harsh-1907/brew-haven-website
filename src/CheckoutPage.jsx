import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { AnimatedSection, AnimatedButton, SuccessModal } from './commonComponents.jsx';
import { CartContext } from './App.jsx';

const CheckoutPage = ({ onPageChange }) => {
  const { cart, checkout } = useContext(CartContext);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.085;
  const total = subtotal + tax;
  const [formData, setFormData] = useState({});
  const [orderType, setOrderType] = useState('pickup');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    let message;
    if (orderType === 'pickup') {
      message = "Thank you for your order! It will be ready for pickup in 10-15 minutes.";
    } else { // orderType is 'delivery'
      message = "Thank you for your order! Your delivery is on its way and will arrive in 30-45 minutes.";
    }
    
    setModalMessage(message);
    setIsModalOpen(true);
    checkout();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    onPageChange('home');
  };

  return (
    <main className="container mx-auto py-24 px-4">
      <AnimatedSection className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
          <span className="text-orange-600">Checkout</span>
        </h2>
        <p className="text-lg text-gray-600">Complete your order and enjoy fresh coffee</p>
      </AnimatedSection>
      <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="bg-white p-8 rounded-3xl shadow-xl space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Order Type</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setOrderType('pickup')}
                className={`p-6 rounded-2xl border-2 transition-colors ${
                  orderType === 'pickup'
                    ? 'border-orange-600 bg-orange-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                } text-center`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`mx-auto mb-2 ${orderType === 'pickup' ? 'text-orange-600' : 'text-gray-400'}`}
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <path d="M14 2V8H6"></path>
                  <path d="M12 18V12H9L12 15L15 12H12Z"></path>
                </svg>
                <p className={`font-semibold text-lg ${orderType === 'pickup' ? 'text-orange-600' : 'text-gray-600'}`}>
                  Pickup
                </p>
                <p className="text-sm text-gray-500">Ready in 10-15 min</p>
              </button>
              <button
                onClick={() => setOrderType('delivery')}
                className={`p-6 rounded-2xl border-2 transition-colors ${
                  orderType === 'delivery'
                    ? 'border-orange-600 bg-orange-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                } text-center`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`mx-auto mb-2 ${orderType === 'delivery' ? 'text-orange-600' : 'text-gray-400'}`}
                >
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <path d="M12 2v20"></path>
                  <path d="M6 16h12"></path>
                  <path d="M6 12h12"></path>
                  <path d="M6 8h12"></path>
                </svg>
                <p className={`font-semibold text-lg ${orderType === 'delivery' ? 'text-orange-600' : 'text-gray-600'}`}>
                  Delivery
                </p>
                <p className="text-sm text-gray-500">30-45 min | $3.99</p>
              </button>
            </div>
          </div>
          <form className="space-y-8" onSubmit={handleCheckout}>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input type="text" name="firstName" placeholder="First Name" className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500" onChange={handleInputChange} value={formData.firstName || ''} />
                <input type="text" name="lastName" placeholder="Last Name" className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500" onChange={handleInputChange} value={formData.lastName || ''} />
              </div>
              <div className="space-y-4">
                <input type="email" name="email" placeholder="Email" className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500" onChange={handleInputChange} value={formData.email || ''} />
                <input type="tel" name="phone" placeholder="Phone" className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500" onChange={handleInputChange} value={formData.phone || ''} />
              </div>
            </div>
            {orderType === 'delivery' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 mt-6"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Delivery Address</h3>
                <input type="text" name="address" placeholder="Address" className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500" onChange={handleInputChange} value={formData.address || ''} />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="city" placeholder="City" className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500" onChange={handleInputChange} value={formData.city || ''} />
                  <input type="text" name="zip" placeholder="Zip Code" className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500" onChange={handleInputChange} value={formData.zip || ''} />
                </div>
              </motion.div>
            )}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Payment Method</h3>
              <div className="bg-gray-50 p-6 rounded-2xl border-2 border-gray-200">
                <div className="flex items-center space-x-2">
                  <input type="radio" id="cash" name="paymentMethod" value="cash" className="text-green-500" defaultChecked/>
                  <label htmlFor="cash" className="font-semibold text-gray-900">Cash on Delivery</label>
                </div>
                <p className="text-sm text-gray-500 mt-2 ml-6">Pay with cash when you receive your order</p>
                <div className="flex items-center text-sm text-orange-600 bg-orange-100 p-3 rounded-xl mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                  <span>Please have exact change ready for your order</span>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-xl h-fit">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h3>
          <ul className="space-y-4 border-b pb-6 mb-6">
            {cart.map(item => (
              <li key={item.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover"/>
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (8.5%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-3xl font-extrabold text-gray-900 border-t pt-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <AnimatedButton onClick={handleCheckout} className="w-full bg-orange-600 text-white hover:bg-orange-700 mt-6">
            Place Order - ${total.toFixed(2)}
          </AnimatedButton>
          <div className="mt-4 text-center text-sm text-gray-500">
            <Check className="inline-block w-4 h-4 mr-1 text-green-500" />
            <span>Secure ordering system</span>
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

export default CheckoutPage;