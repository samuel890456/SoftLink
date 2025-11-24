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
  const baseStyles = 'font-semibold rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center';
  
  let variantStyles = '';
  let sizeStyles = '';
  let textColor = '';
  let bgColor = '';
  let borderColor = '';

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

  // Variant styles with explicit colors
  switch (variant) {
    case 'primary':
      variantStyles = 'bg-[#4F46E5] hover:bg-[#4338ca] hover:shadow-lg focus:ring-[#4F46E5]';
      textColor = 'text-white';
      bgColor = '#4F46E5';
      break;
    case 'secondary':
      variantStyles = 'bg-transparent border-2 border-[#4F46E5] hover:bg-[#4F46E5] focus:ring-[#4F46E5]';
      textColor = 'text-[#4F46E5]';
      borderColor = '#4F46E5';
      break;
    case 'success':
      variantStyles = 'bg-[#10B981] hover:bg-[#059669] hover:shadow-lg focus:ring-[#10B981]';
      textColor = 'text-white';
      bgColor = '#10B981';
      break;
    case 'danger':
      variantStyles = 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
      textColor = 'text-white';
      bgColor = 'rgb(220 38 38)';
      break;
    case 'ghost':
      variantStyles = 'bg-gray-100 hover:bg-gray-200 focus:ring-gray-400';
      textColor = 'text-gray-800';
      bgColor = 'rgb(243 244 246)';
      break;
    default:
      variantStyles = 'bg-[#4F46E5] hover:bg-[#4338ca] focus:ring-[#4F46E5]';
      textColor = 'text-white';
      bgColor = '#4F46E5';
  }

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  // Inline styles to ensure visibility
  const inlineStyles = {
    color: variant === 'secondary' && !disabled ? '#4F46E5' : 
           variant === 'ghost' && !disabled ? '#1F2937' : 
           disabled ? '#9CA3AF' : '#FFFFFF',
    backgroundColor: variant === 'secondary' || variant === 'ghost' ? 'transparent' : 
                     disabled ? undefined : bgColor,
    borderColor: variant === 'secondary' ? borderColor : 'transparent',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${textColor} ${sizeStyles} ${disabledStyles} ${className}`}
      style={inlineStyles}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      aria-label={ariaLabel}
      {...props}
    >
      <span className="relative z-10" style={{ color: 'inherit' }}>
        {children}
      </span>
    </motion.button>
  );
}

export default Button;
