import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterChoice from './pages/RegisterChoice';
import RegisterStudent from './pages/RegisterStudent';
import RegisterCompany from './pages/RegisterCompany';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Iniciativas from './pages/Iniciativas';
import IniciativaDetalle from './pages/IniciativaDetalle';
import Estudiantes from './pages/Estudiantes';
import Proyectos from './pages/Proyectos';
import ProyectoDetalle from './pages/ProyectoDetalle';
import Contacto from './pages/Contacto';
import './index.css';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Cargando...</div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterChoice />} />
          <Route path="/register/student" element={<RegisterStudent />} />
          <Route path="/register/company" element={<RegisterCompany />} />
          <Route path="/iniciativas" element={<Iniciativas />} />
          <Route path="/iniciativas/:id" element={<IniciativaDetalle />} />
          <Route path="/estudiantes" element={<Estudiantes />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/proyectos/:id" element={<ProyectoDetalle />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
