import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Menu, X, GraduationCap, LogOut, User, LayoutDashboard } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { to: "/", label: "Inicio", id: "nav-inicio" },
    { to: "/iniciativas", label: "Iniciativas", id: "nav-iniciativas" },
    { to: "/estudiantes", label: "Estudiantes", id: "nav-estudiantes" },
    { to: "/freelancer", label: "FreeLancer", id: "nav-freelancer" },
    { to: "/proyectos", label: "Proyectos", id: "nav-proyectos" },
    { to: "/contacto", label: "Contacto", id: "nav-contacto" },
    { to: "/panel", label: "Panel", id: "nav-panel", roles: [1, 3, 4] }, // Coordinator, Empresa, Admin
    { to: "/perfil", label: "Perfil", id: "nav-perfil", roles: [1, 2, 3, 4] }, // All authenticated users
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <nav 
      className="bg-white/95 backdrop-blur-sm shadow-soft sticky top-0 z-50" 
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
            aria-label="Ir a inicio"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-gradient-to-br from-primary to-indigo-700 p-2 rounded-2xl shadow-soft"
            >
              <GraduationCap className="w-8 h-8 text-white" />
            </motion.div>
            <span className="text-2xl font-poppins font-bold text-primary hidden sm:block">
              SoftLink
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1" role="menubar">
            {navLinks.map((link, index) => {
              // No renderizar el enlace de Inicio en la navegación de escritorio
              if (link.to === "/") {
                return null;
              }
              // If link has roles, check if user is logged in and has one of the required roles
              if (link.roles && (!user || !link.roles.includes(user.id_rol))) {
                return null;
              }
              // If link does not have roles, or user is authenticated and has role, render it
              return (
                <motion.div
                  key={link.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.to}
                    className="px-4 py-2 text-gray-700 font-medium hover:text-primary transition-all-300 rounded-xl hover:bg-lightGray focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    role="menuitem"
                    aria-label={`Ir a ${link.label}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Auth Buttons Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-all-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                aria-label="Cerrar sesión"
              >
                <LogOut className="w-5 h-5" />
                <span>Cerrar</span>
              </motion.button>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-accent tw-gradient-via rounded-2xl hover:bg-gray-100 transition-all-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                    aria-label="Crear una cuenta"
                  >
                    Registro
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/login"
                    className="px-4 py-2 bg-primary tw-gradient-via rounded-2xl hover:shadow-glow transition-all-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label="Iniciar sesión"
                  >
                    Iniciar Sesión
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-lightGray transition-all-300 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Abrir menú de navegación"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden py-4 space-y-2"
          >
            {navLinks.map(link => {
              // If link has roles, check if user is logged in and has one of the required roles
              if (link.roles && (!user || !link.roles.includes(user.id_rol))) {
                return null;
              }
              // If link does not have roles, or user is authenticated and has role, render it
              return (
                <Link
                  key={link.id}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 font-medium hover:text-primary hover:bg-lightGray rounded-xl transition-all-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label={`Ir a ${link.label}`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4 space-y-2 border-t-2 border-lightGray">
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-3 bg-red-500 text-white rounded-2xl transition-all-300"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Cerrar Sesión</span>
                </button>
              ) : (
                <>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 bg-accent text-white rounded-2xl text-center transition-all-300"
                  >
                    Registro
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 bg-primary text-white rounded-2xl text-center transition-all-300"
                  >
                    Iniciar Sesión
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
