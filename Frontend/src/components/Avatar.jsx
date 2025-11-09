import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

function Avatar({
  src,
  alt = 'Avatar',
  size = 'md',
  className = '',
  initials = ''
}) {
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-12 w-12 text-base',
    lg: 'h-16 w-16 text-lg',
    xl: 'h-24 w-24 text-3xl',
  };

  const currentSizeClass = sizeClasses[size] || sizeClasses.md;

  const getInitials = () => {
    if (initials) return initials.substring(0, 2).toUpperCase();
    if (alt) return alt.substring(0, 2).toUpperCase();
    return '?';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-indigo-700 text-white font-semibold overflow-hidden border-2 border-white shadow-soft ${currentSizeClass} ${className}`}
    >
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="absolute inset-0 w-full h-full object-cover" 
          loading="lazy"
        />
      ) : (
        <span className="font-poppins font-bold">{getInitials()}</span>
      )}
    </motion.div>
  );
}

export default Avatar;
