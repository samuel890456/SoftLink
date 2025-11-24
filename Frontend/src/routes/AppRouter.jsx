import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CreativeHome from "../pages/CreativeHome";
import HomeDisruptive from "../pages/HomeDisruptive";
import Iniciativas from "../pages/Iniciativas";
import IniciativaDetalle from "../pages/IniciativaDetalle";
import Estudiantes from "../pages/Estudiantes";
import EstudianteDetalle from "../pages/EstudianteDetalle";
import Freelancer from "../pages/Freelancer";
import Proyectos from "../pages/Proyectos";
import ProyectoDetalle from "../pages/ProyectoDetalle";
import Contacto from "../pages/Contacto";
import Criterios from "../pages/Criterios";
import Panel from "../pages/Panel";
import Login from "../pages/Login";
import RegisterChoice from "../pages/RegisterChoice"; // Import choice component
import RegisterStudent from "../pages/RegisterStudent"; // Import student registration
import RegisterCompany from "../pages/RegisterCompany"; // Import company registration
import ForgotPassword from "../pages/ForgotPassword";
import Perfil from "../pages/Perfil";
import Navbar from "../components/Navbar";

import ProtectedRoute from "../components/ProtectedRoute";

import PanelEmpresa from "../pages/PanelEmpresa"; // Importar el nuevo panel

function AppRouter() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/iniciativas" element={<Iniciativas />} />
            <Route path="/iniciativas/:id" element={<IniciativaDetalle />} />
            <Route path="/estudiantes" element={<Estudiantes />} />
            <Route path="/estudiantes/:id" element={<EstudianteDetalle />} />
            <Route path="/freelancer" element={<Freelancer />} />
            <Route path="/proyectos" element={<Proyectos />} />
            <Route path="/proyectos/:id" element={<ProyectoDetalle />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/criterios" element={<Criterios />} />
            <Route
              path="/panel"
              element={
                <ProtectedRoute requiredRoles={[1]}> {/* Solo Coordinador */}
                  <Panel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/panel-empresa"
              element={
                <ProtectedRoute requiredRoles={[3]}> {/* Solo Empresa */}
                  <PanelEmpresa />
                </ProtectedRoute>
              }
            />
            <Route
              path="/perfil"
              element={
                <ProtectedRoute>
                  <Perfil />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterChoice />} />
            <Route path="/register/student" element={<RegisterStudent />} />
            <Route path="/register/company" element={<RegisterCompany />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
