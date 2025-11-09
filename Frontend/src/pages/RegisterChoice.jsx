import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Building } from 'lucide-react';

function RegisterChoice() {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-white mb-4">Únete a SoftLink</h1>
        <p className="text-xl text-white/90">Elige el tipo de cuenta que quieres crear.</p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Card for Students */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <Link to="/register/student" className="block">
            <div className="bg-white p-10 rounded-lg shadow-xl text-center w-full max-w-sm cursor-pointer">
              <User className="mx-auto text-blue-600 mb-4" size={64} />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Soy Estudiante</h2>
              <p className="text-gray-600">Busco participar en proyectos y desarrollar mis habilidades.</p>
            </div>
          </Link>
        </motion.div>

        {/* Card for Companies */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <Link to="/register/company" className="block">
            <div className="bg-white p-10 rounded-lg shadow-xl text-center w-full max-w-sm cursor-pointer">
              <Building className="mx-auto text-purple-600 mb-4" size={64} />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Soy Empresa</h2>
              <p className="text-gray-600">Quiero proponer iniciativas y encontrar talento.</p>
            </div>
          </Link>
        </motion.div>
      </div>
       <div className="mt-12 text-center">
          <p className="text-white/90">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="font-bold text-white underline hover:text-blue-200">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
    </div>
  );
}

export default RegisterChoice;
