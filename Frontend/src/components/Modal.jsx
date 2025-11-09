import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

function Modal({
  isOpen,
  onClose,
  children,
  title,
  className = '',
  ...props
}) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
        >
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label="Cerrar modal"
          />

          {/* Modal Content */}
          <motion.div
            className={`relative bg-white p-8 rounded-3xl shadow-glow max-w-2xl w-full mx-auto z-10 ${className}`}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            {...props}
          >
            {title && (
              <div className="flex justify-between items-center mb-6">
                <h2 id="modal-title" className="text-2xl font-poppins font-bold text-darkGray">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 hover:bg-lightGray p-2 rounded-xl transition-all-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Cerrar modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            )}
            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
