import React, { useState, useEffect } from 'react';
import { Shield, ArrowLeft, CheckCircle, Smartphone, Mail, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { addAuthTransaction } from '../../services/storageService';

interface ACSAuthenticationProps {
  paymentData: any;
  cartItems: any[];
  total: number;
  onComplete: () => void;
  onBack: () => void;
}

const ACSAuthentication: React.FC<ACSAuthenticationProps> = ({
  paymentData,
  cartItems,
  total,
  onComplete,
  onBack,
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpMethod, setOtpMethod] = useState<'SMS' | 'Email' | 'InApp'>('SMS');
  const [countdown, setCountdown] = useState(120);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [generatedOTP] = useState(Math.floor(100000 + Math.random() * 900000).toString());

  useEffect(() => {
    if (countdown > 0 && verificationStatus === 'pending') {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, verificationStatus]);

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredOTP = otp.join('');
    
    if (enteredOTP.length !== 6) {
      alert('Please enter complete OTP');
      return;
    }

    setIsVerifying(true);

    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // For demo: accept either the generated OTP or "123456"
    if (enteredOTP === generatedOTP || enteredOTP === '123456') {
      setVerificationStatus('success');
      
      // Write transaction to localStorage
      try {
        const transactionData = {
          dateTime: new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          }),
          acsTransactionId: paymentData.transactionId,
          merchantName: paymentData.merchantName,
          cardHolder: paymentData.cardHolder,
          cardNumber: paymentData.cardNumber.slice(0, 4) + ' **** **** ' + paymentData.cardNumber.slice(-4),
          amount: `$${total.toFixed(2)}`,
          status: 'Successful' as const,
          transactionType: 'Purchase',
          scheme: paymentData.cardScheme,
        };

        await addAuthTransaction(transactionData);
        console.log('✅ Transaction saved to localStorage:', transactionData);

        // Wait a moment to show success animation
        setTimeout(() => {
          onComplete();
        }, 2000);
      } catch (error) {
        console.error('Error saving transaction:', error);
        alert('Transaction successful but failed to save to database');
      }
    } else {
      setVerificationStatus('failed');
      setTimeout(() => {
        setVerificationStatus('pending');
        setOtp(['', '', '', '', '', '']);
        setIsVerifying(false);
      }, 2000);
    }
  };

  const resendOTP = () => {
    setCountdown(120);
    setOtp(['', '', '', '', '', '']);
    alert(`New OTP sent via ${otpMethod}: ${generatedOTP}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {verificationStatus === 'success' ? (
          // Success Screen
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Payment Successful!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Transaction ID: {paymentData.transactionId}
            </p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${total.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Transaction saved to database
            </p>
          </motion.div>
        ) : (
          // OTP Verification Screen
          <>
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Payment
            </button>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Shield className="w-16 h-16 text-white mx-auto mb-4" />
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  3D Secure Authentication
                </h2>
                <p className="text-blue-100">
                  Enter the OTP sent to verify your identity
                </p>
              </div>

              <div className="p-8">
                {/* Phone Mockup with OTP Display */}
                <div className="mb-8">
                  <div className="max-w-xs mx-auto">
                    <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-[3rem] p-4 shadow-2xl">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-[2.5rem] p-6 relative">
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl" />
                        
                        <div className="mt-4 text-center">
                          <p className="text-white/80 text-sm mb-2">Demo OTP Code</p>
                          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4">
                            <p className="text-3xl font-mono font-bold text-white tracking-widest">
                              {generatedOTP}
                            </p>
                          </div>
                          <p className="text-white/60 text-xs">
                            Use this code or "123456" for demo
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* OTP Method Selection */}
                <div className="flex justify-center gap-4 mb-6">
                  {[
                    { method: 'SMS' as const, icon: Smartphone, label: 'SMS' },
                    { method: 'Email' as const, icon: Mail, label: 'Email' },
                    { method: 'InApp' as const, icon: MessageSquare, label: 'In-App' },
                  ].map(({ method, icon: Icon, label }) => (
                    <button
                      key={method}
                      onClick={() => setOtpMethod(method)}
                      className={`flex-1 py-3 px-4 rounded-lg flex flex-col items-center gap-2 transition-all ${
                        otpMethod === method
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-semibold">{label}</span>
                    </button>
                  ))}
                </div>

                {/* Transaction Details */}
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Merchant</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {paymentData.merchantName}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Amount</span>
                    <span className="font-bold text-xl text-blue-600 dark:text-blue-400">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Card</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {paymentData.cardNumber}
                    </span>
                  </div>
                </div>

                {/* OTP Input */}
                <div className="mb-6">
                  <label className="block text-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    Enter 6-digit OTP
                  </label>
                  <div className="flex justify-center gap-2 mb-4">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOTPChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-14 text-center text-2xl font-bold bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 text-gray-900 dark:text-white"
                        disabled={verificationStatus !== 'pending'}
                      />
                    ))}
                  </div>

                  {/* Countdown Timer */}
                  <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Time remaining: <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Verify Button */}
                <button
                  onClick={handleVerify}
                  disabled={isVerifying || otp.join('').length !== 6}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-lg font-semibold transition-all shadow-lg mb-4"
                >
                  {isVerifying ? 'Verifying...' : 'Verify & Complete Payment'}
                </button>

                {/* Resend OTP */}
                {countdown > 0 ? (
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Didn't receive code?{' '}
                    <button onClick={resendOTP} className="text-blue-600 dark:text-blue-400 hover:underline">
                      Resend OTP
                    </button>
                  </p>
                ) : (
                  <button
                    onClick={resendOTP}
                    className="w-full text-blue-600 dark:text-blue-400 hover:underline text-sm font-semibold"
                  >
                    Resend OTP
                  </button>
                )}

                {/* Error Message */}
                {verificationStatus === 'failed' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-center"
                  >
                    <p className="text-red-600 dark:text-red-400 font-semibold">
                      Invalid OTP. Please try again.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ACSAuthentication;
