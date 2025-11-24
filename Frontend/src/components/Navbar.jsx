import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Menu, X, GraduationCap, LogOut, User, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import Button from "./Button";

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
    { to: "/criterios", label: "Criterios", id: "nav-criterios" },
    { to: "/contacto", label: "Contacto", id: "nav-contacto" },
    { to: "/panel", label: "Panel Coordinador", id: "nav-panel-coord", roles: [1] }, // Coordinator only
    { to: "/panel-empresa", label: "Panel Empresa", id: "nav-panel-empresa", roles: [3] }, // Company only
    { to: "/perfil", label: "Perfil", id: "nav-perfil", roles: [1, 2, 3] }, // All authenticated users
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
              <Button
                variant="danger"
                onClick={handleLogout}
                ariaLabel="Cerrar sesión"
                className="flex items-center space-x-2"
              >
                <LogOut className="w-5 h-5" />
                <span>Cerrar</span>
              </Button>
            ) : (
              <>
                <Link to="/register">
                  <Button
                    variant="success"
                    ariaLabel="Crear una cuenta"
                  >
                    Registro
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    variant="primary"
                    ariaLabel="Iniciar sesión"
                  >
                    Iniciar Sesión
                  </Button>
                </Link>
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
                <Button
                  variant="danger"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Cerrar Sesión</span>
                </Button>
              ) : (
                <>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block"
                  >
                    <Button
                      variant="success"
                      className="w-full"
                    >
                      Registro
                    </Button>
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block"
                  >
                    <Button
                      variant="primary"
                      className="w-full"
                    >
                      Iniciar Sesión
                    </Button>
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
