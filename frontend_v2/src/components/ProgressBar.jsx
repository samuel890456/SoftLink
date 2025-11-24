import React from 'react';
import { motion } from 'framer-motion';

function ProgressBar({ progress, className = '' }) {
    return (
        <div className={`w-full bg-gray-100 rounded-full h-2 overflow-hidden ${className}`}>
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full"
            />
        </div>
    );
}

export default ProgressBar;
