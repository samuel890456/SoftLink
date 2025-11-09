import React from 'react';
import { motion } from 'framer-motion';

function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ariaLabel,
  ...props
}) {
  const baseStyles = 'font-semibold rounded-2xl transition-all-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  let variantStyles = '';
  let sizeStyles = '';

  // Size styles
  switch (size) {
    case 'sm':
      sizeStyles = 'px-4 py-2 text-sm';
      break;
    case 'md':
      sizeStyles = 'px-6 py-3 text-base';
      break;
    case 'lg':
      sizeStyles = 'px-8 py-4 text-lg';
      break;
    default:
      sizeStyles = 'px-6 py-3 text-base';
  }

  // Variant styles
  switch (variant) {
    case 'primary':
      variantStyles = 'bg-primary text-white hover:bg-indigo-700 hover:shadow-glow focus:ring-primary';
      break;
    case 'secondary':
      variantStyles = 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary';
      break;
    case 'success':
      variantStyles = 'bg-accent text-white hover:bg-green-600 hover:shadow-glow focus:ring-accent';
      break;
    case 'danger':
      variantStyles = 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
      break;
    case 'ghost':
      variantStyles = 'bg-lightGray text-darkGray hover:bg-gray-200 focus:ring-gray-400';
      break;
    default:
      variantStyles = 'bg-primary text-white hover:bg-indigo-700 focus:ring-primary';
  }

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${disabledStyles} ${className}`}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default Button;
