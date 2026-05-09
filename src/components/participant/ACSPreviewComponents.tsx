import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CreditCard, Building2, MessageCircle, Smartphone, Mail, Clock, CheckCircle, Bell } from 'lucide-react';

interface BasePreviewProps {
  formData: any;
  logoFile: File | null;
}

// SMS OTP Preview Component
export function SmsOtpPreview({ formData, logoFile }: BasePreviewProps) {
  return (
    <motion.div 
      className="w-full bg-white/95 dark:bg-gray-900/95 rounded-2xl shadow-2xl p-5 space-y-4 backdrop-blur-xl border border-white/20 dark:border-gray-700/50"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      style={{
        boxShadow: '0 10px 30px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)'
      }}
    >
      {/* Header with icon */}
      <div className="text-center space-y-1">
        <div className="flex justify-center mb-2">
          <div className="p-2.5 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-full">
            <Smartphone size={14} className="text-blue-600" />
          </div>
        </div>
        <p className="font-bold text-gray-800 dark:text-white text-sm leading-tight" style={{ fontFamily: formData.acsFontStyle }}>
          Verify Your Identity
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-[10px] leading-relaxed" style={{ fontFamily: formData.acsFontStyle }}>
          Code sent to your phone
        </p>
      </div>

      {/* OTP input boxes */}
      <div className="flex justify-center gap-2">
        {[0,1,2,3,4,5].map(i => (
          <motion.div 
            key={i}
            className="w-8 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-sm font-bold text-gray-400 dark:text-gray-500 bg-white/50 dark:bg-gray-800/50 transition-all hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md"
            whileHover={{ scale: 1.05 }}
            style={{ fontFamily: formData.acsFontStyle }}
          />
        ))}
      </div>

      {/* Card info strip */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg px-3 py-2.5 flex items-center justify-between border border-blue-200 dark:border-blue-800/50">
        <div>
          <p className="text-[8px] text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold">Card</p>
          <p className="text-xs font-mono text-gray-700 dark:text-gray-300 font-semibold">•••• •••• •••• 4242</p>
        </div>
        <CreditCard size={14} className="text-blue-600 dark:text-blue-400" />
      </div>

      {/* Verify button */}
      <motion.button
        style={{ 
          backgroundColor: formData.acsButtonColor,
          fontFamily: formData.acsFontStyle,
          backgroundImage: `linear-gradient(135deg, ${formData.acsButtonColor}dd, ${formData.acsButtonColor})`
        }}
        className="w-full py-2.5 rounded-lg text-white font-semibold text-sm shadow-lg transition-all transform hover:shadow-xl active:scale-95"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Verify Code
      </motion.button>

      {/* Timer with animation */}
      <div className="flex justify-between items-center text-[10px] px-1">
        <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <Clock size={10} />
          Valid for <motion.span 
            className="font-bold text-orange-600 dark:text-orange-400"
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            00:{formData.otpValidity || '60'}
          </motion.span>
        </span>
        <motion.button 
          className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 transition-colors"
          whileHover={{ scale: 1.1 }}
        >
          Resend SMS
        </motion.button>
      </div>

      {/* Contact link */}
      {formData.acsContactLink && (
        <motion.div 
          className="pt-2 border-t border-gray-200 dark:border-gray-700 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-[8px] text-gray-500 dark:text-gray-400">
            <MessageCircle size={10} className="inline mr-1" />
            <a href={`mailto:${formData.acsContactLink}`} className="text-blue-600 dark:text-blue-400 hover:underline font-medium truncate inline-block max-w-[80%]">
              {formData.acsContactLink}
            </a>
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

// Email Verification Preview Component
export function EmailOtpPreview({ formData, logoFile }: BasePreviewProps) {
  return (
    <motion.div 
      className="w-full bg-white/95 dark:bg-gray-900/95 rounded-2xl shadow-2xl p-5 space-y-4 backdrop-blur-xl border border-white/20 dark:border-gray-700/50"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      style={{
        boxShadow: '0 10px 30px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)'
      }}
    >
      {/* Header with icon */}
      <div className="text-center space-y-1">
        <div className="flex justify-center mb-2">
          <div className="p-2.5 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20 rounded-full">
            <Mail size={14} className="text-purple-600" />
          </div>
        </div>
        <p className="font-bold text-gray-800 dark:text-white text-sm leading-tight" style={{ fontFamily: formData.acsFontStyle }}>
          Check Your Email
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-[10px] leading-relaxed" style={{ fontFamily: formData.acsFontStyle }}>
          We've sent a verification code to your email
        </p>
      </div>

      {/* Email icon display */}
      <div className="flex justify-center py-3">
        <motion.div 
          className="relative"
          animate={{ 
            y: [0, -5, 0],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40 rounded-2xl flex items-center justify-center shadow-lg border-2 border-purple-300 dark:border-purple-700">
            <Mail size={28} className="text-purple-600 dark:text-purple-400" />
          </div>
          <motion.div 
            className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <CheckCircle size={12} className="text-white" />
          </motion.div>
        </motion.div>
      </div>

      {/* Email address display */}
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg px-3 py-2.5 text-center border border-purple-200 dark:border-purple-800/50">
        <p className="text-[8px] text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Sent to</p>
        <p className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
          {formData.primaryEmail || 'your-email@example.com'}
        </p>
      </div>

      {/* OTP input boxes */}
      <div className="flex justify-center gap-2">
        {[0,1,2,3,4,5].map(i => (
          <motion.div 
            key={i}
            className="w-8 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-sm font-bold text-gray-400 dark:text-gray-500 bg-white/50 dark:bg-gray-800/50 transition-all hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-md"
            whileHover={{ scale: 1.05 }}
            style={{ fontFamily: formData.acsFontStyle }}
          />
        ))}
      </div>

      {/* Verify button */}
      <motion.button
        style={{ 
          backgroundColor: formData.acsButtonColor,
          fontFamily: formData.acsFontStyle,
          backgroundImage: `linear-gradient(135deg, ${formData.acsButtonColor}dd, ${formData.acsButtonColor})`
        }}
        className="w-full py-2.5 rounded-lg text-white font-semibold text-sm shadow-lg transition-all transform hover:shadow-xl active:scale-95"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Verify Code
      </motion.button>

      {/* Resend email */}
      <div className="flex justify-between items-center text-[10px] px-1">
        <span className="text-gray-500 dark:text-gray-400">
          Didn't receive the email?
        </span>
        <motion.button 
          className="text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-700 transition-colors"
          whileHover={{ scale: 1.1 }}
        >
          Resend Email
        </motion.button>
      </div>

      {/* Contact link */}
      {formData.acsContactLink && (
        <motion.div 
          className="pt-2 border-t border-gray-200 dark:border-gray-700 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-[8px] text-gray-500 dark:text-gray-400">
            <MessageCircle size={10} className="inline mr-1" />
            <a href={`mailto:${formData.acsContactLink}`} className="text-blue-600 dark:text-blue-400 hover:underline font-medium truncate inline-block max-w-[80%]">
              {formData.acsContactLink}
            </a>
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

// In-App Authentication Preview Component
export function InAppOtpPreview({ formData, logoFile }: BasePreviewProps) {
  return (
    <motion.div 
      className="w-full bg-white/95 dark:bg-gray-900/95 rounded-2xl shadow-2xl p-5 space-y-4 backdrop-blur-xl border border-white/20 dark:border-gray-700/50"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      style={{
        boxShadow: '0 10px 30px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)'
      }}
    >
      {/* Header with icon */}
      <div className="text-center space-y-1">
        <div className="flex justify-center mb-2">
          <div className="p-2.5 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 rounded-full">
            <Bell size={14} className="text-green-600" />
          </div>
        </div>
        <p className="font-bold text-gray-800 dark:text-white text-sm leading-tight" style={{ fontFamily: formData.acsFontStyle }}>
          Approve in Your App
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-[10px] leading-relaxed" style={{ fontFamily: formData.acsFontStyle }}>
          Check your banking app to approve this transaction
        </p>
      </div>

      {/* Phone/App illustration */}
      <div className="flex justify-center py-3">
        <motion.div 
          className="relative"
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        >
          <div className="w-16 h-20 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40 rounded-xl flex flex-col items-center justify-center shadow-lg border-2 border-green-300 dark:border-green-700 relative overflow-hidden">
            {/* Phone mockup details */}
            <div className="w-8 h-0.5 bg-green-300 dark:bg-green-700 rounded-full mb-1" />
            <Smartphone size={20} className="text-green-600 dark:text-green-400 mb-1" />
            <div className="w-6 h-0.5 bg-green-300 dark:bg-green-700 rounded-full" />
            
            {/* Notification badge with pulse */}
            <motion.div 
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
              }}
            >
              <span className="text-white text-[10px] font-bold">1</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Transaction info */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg px-3 py-2.5 space-y-1 border border-green-200 dark:border-green-800/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[8px] text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold">Transaction Amount</p>
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300">$125.00</p>
          </div>
          <CreditCard size={14} className="text-green-600 dark:text-green-400" />
        </div>
        <div className="pt-1 border-t border-green-200 dark:border-green-700">
          <p className="text-[8px] text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold">Card</p>
          <p className="text-xs font-mono text-gray-700 dark:text-gray-300">•••• •••• •••• 4242</p>
        </div>
      </div>

      {/* Waiting status */}
      <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-lg px-3 py-2.5 flex items-center justify-center gap-2 border border-amber-200 dark:border-amber-800/50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Clock size={14} className="text-amber-600 dark:text-amber-400" />
        </motion.div>
        <span className="text-xs font-medium text-amber-700 dark:text-amber-300" style={{ fontFamily: formData.acsFontStyle }}>
          Waiting for approval...
        </span>
      </div>

      {/* Instructions */}
      <div className="space-y-2">
        <p className="text-[10px] text-gray-600 dark:text-gray-400 text-center leading-relaxed" style={{ fontFamily: formData.acsFontStyle }}>
          Open your {formData.name || 'banking'} app and approve the authentication request
        </p>
        <div className="flex justify-center">
          <motion.div 
            className="flex items-center gap-1 px-2 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Lock size={10} className="text-blue-600 dark:text-blue-400" />
            <span className="text-[8px] font-semibold text-blue-600 dark:text-blue-400">
              Secure verification
            </span>
          </motion.div>
        </div>
      </div>

      {/* Alternative option */}
      <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
        <motion.button 
          className="w-full text-[10px] text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          whileHover={{ scale: 1.02 }}
        >
          Use different verification method →
        </motion.button>
      </div>

      {/* Contact link */}
      {formData.acsContactLink && (
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-[8px] text-gray-500 dark:text-gray-400">
            <MessageCircle size={10} className="inline mr-1" />
            <a href={`mailto:${formData.acsContactLink}`} className="text-blue-600 dark:text-blue-400 hover:underline font-medium truncate inline-block max-w-[80%]">
              {formData.acsContactLink}
            </a>
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

// Helper function to determine which preview to show
export function getActivePreview(otpDeliveryMethods: { sms: boolean; email: boolean; inApp: boolean }): 'sms' | 'email' | 'inapp' | null {
  // Priority: SMS > Email > In-App
  if (otpDeliveryMethods.sms) return 'sms';
  if (otpDeliveryMethods.email) return 'email';
  if (otpDeliveryMethods.inApp) return 'inapp';
  return null;
}
