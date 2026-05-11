import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { Input } from '../components/forms/Input';
import { Button } from '../components/forms/Button';
import { Switch } from '../components/forms/Switch';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('uneeb_ahmed');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { username?: string; password?: string } = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [loginError, setLoginError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setLoginError('');

    // Validate credentials
    setTimeout(() => {
      if (username === 'uneeb_ahmed' && password === 'admin123') {
        onLogin();
      } else {
        setLoginError('Invalid username or password. Please try again.');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="grid lg:grid-cols-2">
          {/* Left side - Animated gradient background */}
          <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-gradient-to-br from-primary-600 to-primary-700 relative overflow-hidden">
            {/* Grid pattern background */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 400 400">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="400" height="400" fill="url(#grid)" />
              </svg>
            </div>

            {/* Animated security graphic */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative z-10"
            >
              <svg width="280" height="280" viewBox="0 0 280 280" fill="none">
                {/* Animated concentric circles */}
                <motion.circle
                  cx="140"
                  cy="140"
                  r="120"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                />
                <motion.circle
                  cx="140"
                  cy="140"
                  r="90"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.3, ease: 'easeInOut' }}
                />
                <motion.circle
                  cx="140"
                  cy="140"
                  r="60"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.6, ease: 'easeInOut' }}
                />

                {/* Center shield icon */}
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <circle cx="140" cy="140" r="40" fill="white" opacity="0.9" />
                  <path
                    d="M 140 120 L 140 145 L 155 130"
                    stroke="#2F80ED"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </motion.g>

                {/* Animated dots around circles */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                  const x = 140 + 110 * Math.cos((angle * Math.PI) / 180);
                  const y = 140 + 110 * Math.sin((angle * Math.PI) / 180);
                  return (
                    <motion.circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.3, 0.8, 0.3] }}
                      transition={{
                        duration: 2,
                        delay: i * 0.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  );
                })}
              </svg>
            </motion.div>

            {/* Security badges */}
            <div className="mt-8 space-y-4 relative z-10">
              {['3DS Secure', 'Encrypted', 'PCI-DSS'].map((badge, i) => (
                <motion.div
                  key={badge}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-sm font-medium border border-white/20"
                >
                  {badge}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right side - Login form */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="mb-8">
              <Logo size="lg" />
            </div>

            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back, Uneeb Ahmed
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Secure Access Control & Transaction Authentication Platform
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {loginError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-600 dark:text-red-400">{loginError}</p>
                </motion.div>
              )}

              <Input
                label="Username"
                type="text"
                placeholder="e.g., uneeb_ahmed"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) {
                    setErrors({ ...errors, username: undefined });
                  }
                }}
                error={errors.username}
                leftIcon={<User size={18} />}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors({ ...errors, password: undefined });
                  }
                }}
                error={errors.password}
                leftIcon={<Lock size={18} />}
                required
              />

              <div className="flex items-center justify-between flex-wrap gap-2">
                <Switch
                  checked={rememberMe}
                  onChange={setRememberMe}
                  label="Remember me"
                />
                <a
                  href="#"
                  className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
                rightIcon={!isLoading && <ArrowRight size={18} />}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
            >
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-1 font-medium">Demo Credentials</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 text-center">Username: <span className="font-mono text-gray-600 dark:text-gray-300">uneeb_ahmed</span> &nbsp;|&nbsp; Password: <span className="font-mono text-gray-600 dark:text-gray-300">admin123</span></p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400"
            >
              Version 2.4.1 • © 2026 OpenACS
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}