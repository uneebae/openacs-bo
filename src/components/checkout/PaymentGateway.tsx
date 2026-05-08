import React, { useState } from 'react';
import { CreditCard, Lock, ArrowLeft, Calendar, User, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface PaymentGatewayProps {
  amount: number;
  cartItems: any[];
  onSubmit: (data: any) => void;
  onBack: () => void;
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({ amount, cartItems, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    country: 'United States',
  });

  const [cardScheme, setCardScheme] = useState<'Visa' | 'Mastercard' | ''>('');

  const detectCardScheme = (cardNumber: string) => {
    const num = cardNumber.replace(/\s/g, '');
    if (num.startsWith('4')) return 'Visa';
    if (num.startsWith('5')) return 'Mastercard';
    return '';
  };

  const formatCardNumber = (value: string) => {
    const num = value.replace(/\s/g, '');
    const matches = num.match(/.{1,4}/g);
    return matches ? matches.join(' ') : num;
  };

  const formatExpiryDate = (value: string) => {
    const num = value.replace(/\D/g, '');
    if (num.length >= 2) {
      return num.slice(0, 2) + '/' + num.slice(2, 4);
    }
    return num;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = formatCardNumber(value);
    setFormData({ ...formData, cardNumber: formatted });
    setCardScheme(detectCardScheme(value));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    const formatted = formatExpiryDate(value);
    setFormData({ ...formData, expiryDate: formatted });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate transaction ID
    const transactionId = `ACS-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    
    const paymentData = {
      ...formData,
      transactionId,
      amount,
      cardScheme,
      merchantName: 'OpenACS Demo Store',
      timestamp: new Date().toISOString(),
    };
    
    onSubmit(paymentData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Cart
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payment Gateway</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Enter your card details securely
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
              {/* Card Number */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    required
                    className="w-full px-4 py-3 pl-12 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  {cardScheme && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        {cardScheme}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Holder */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Card Holder Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.cardHolder}
                    onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value })}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 pl-12 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Expiry Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.expiryDate}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      required
                      className="w-full px-4 py-3 pl-12 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    />
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    CVV
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                      placeholder="123"
                      required
                      className="w-full px-4 py-3 pl-12 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Billing Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.billingAddress}
                    onChange={(e) => setFormData({ ...formData, billingAddress: e.target.value })}
                    placeholder="123 Main St"
                    required
                    className="w-full px-4 py-3 pl-12 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* City and Country */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="New York"
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Country
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                  >
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <Lock className="w-5 h-5" />
                Pay ${amount.toFixed(2)}
              </button>

              {/* Security Badges */}
              <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <span className="text-green-600 dark:text-green-400">✓</span> PCI-DSS Compliant
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-600 dark:text-green-400">✓</span> 256-bit Encryption
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-600 dark:text-green-400">✓</span> 3DS 2.0
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span className="text-blue-600 dark:text-blue-400">${amount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentGateway;
