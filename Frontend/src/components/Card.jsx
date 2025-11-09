import React from 'react';
import { motion } from 'framer-motion';

function Card({
  children,
  className = '',
  onClick,
  whileHover = { scale: 1.02, y: -4 },
  whileTap = { scale: 0.98 },
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.3 },
  ...props
}) {
  const baseStyles = 'bg-white p-6 rounded-3xl shadow-soft border border-gray-100';

  return (
    <motion.div
      className={`${baseStyles} ${className}`}
      onClick={onClick}
      whileHover={whileHover}
      whileTap={whileTap}
      initial={initial}
      animate={animate}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default Card;
