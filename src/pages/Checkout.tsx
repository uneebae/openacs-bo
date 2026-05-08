import React, { useState } from 'react';
import { ShoppingCart, CreditCard, Trash2, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageHeader } from '../components/common/PageHeader';
import PaymentGateway from '../components/checkout/PaymentGateway';
import ACSAuthentication from '../components/checkout/ACSAuthentication';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  scheme: 'Visa' | 'Mastercard';
}

interface CheckoutProps {
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onBack }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Apple MacBook Pro 16"',
      price: 2499,
      quantity: 1,
      image: '💻',
      scheme: 'Visa'
    },
    {
      id: '2',
      name: 'Sony WH-1000XM5 Headphones',
      price: 399,
      quantity: 1,
      image: '🎧',
      scheme: 'Mastercard'
    },
    {
      id: '3',
      name: 'iPad Pro 12.9"',
      price: 1099,
      quantity: 1,
      image: '📱',
      scheme: 'Visa'
    }
  ]);

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'payment' | 'acs'>('cart');
  const [paymentData, setPaymentData] = useState<any>(null);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleProceedToPayment = () => {
    setCheckoutStep('payment');
  };

  const handlePaymentSubmit = (data: any) => {
    setPaymentData(data);
    setCheckoutStep('acs');
  };

  const handleACSComplete = () => {
    // Transaction completed - navigate back to dashboard
    alert('Transaction completed successfully!');
    onBack();
  };

  if (checkoutStep === 'acs') {
    return (
      <ACSAuthentication
        paymentData={paymentData}
        cartItems={cartItems}
        total={total}
        onComplete={handleACSComplete}
        onBack={() => setCheckoutStep('payment')}
      />
    );
  }

  if (checkoutStep === 'payment') {
    return (
      <PaymentGateway
        amount={total}
        cartItems={cartItems}
        onSubmit={handlePaymentSubmit}
        onBack={() => setCheckoutStep('cart')}
      />
    );
  }

  return (
    <div className="p-8">
      <PageHeader
        title="Shopping Cart"
        breadcrumbs={['Dashboard', 'Checkout']}
        icon={ShoppingCart}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Cart Items ({cartItems.length})
              </h2>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 flex items-center gap-4"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center text-3xl">
                    {item.image}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Card Scheme: {item.scheme}
                    </p>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-2">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                    <span className="w-12 text-center font-semibold text-gray-900 dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  {/* Subtotal */}
                  <div className="w-24 text-right">
                    <p className="font-bold text-gray-900 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {cartItems.length === 0 && (
              <div className="p-12 text-center">
                <ShoppingCart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax (10%)</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                <span>Total</span>
                <span className="text-blue-600 dark:text-blue-400">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleProceedToPayment}
              disabled={cartItems.length === 0}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <CreditCard className="w-5 h-5" />
              Proceed to Payment
            </button>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400">🔒</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-700 dark:text-gray-300">Secure Checkout</p>
                  <p className="text-xs">3DS 2.0 Authentication</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
