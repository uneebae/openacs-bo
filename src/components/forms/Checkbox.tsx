import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false
}) => {
  return (
    <label className={`flex items-start gap-3 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <motion.div
          whileTap={!disabled ? { scale: 0.95 } : {}}
          className={`
            w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
            ${checked 
              ? 'bg-primary-600 border-primary-600' 
              : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
            }
            ${!disabled && 'hover:border-primary-500'}
          `}
        >
          {checked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <Check className="h-3 w-3 text-white" strokeWidth={3} />
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {(label || description) && (
        <div className="flex-1">
          {label && (
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {label}
            </p>
          )}
          {description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {description}
            </p>
          )}
        </div>
      )}
    </label>
  );
};
