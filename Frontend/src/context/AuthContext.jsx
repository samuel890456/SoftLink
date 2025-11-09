import { createContext, useState, useContext, useEffect } from "react";
import authService from '../services/authService';
import usuariosService from '../services/usuariosService'; // Importar el servicio de usuarios
import { jwtDecode } from 'jwt-decode'; // Necesitarás instalar jwt-decode

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          // Decodificar el token para obtener el ID del usuario
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.sub; // Asumiendo que el ID del usuario está en el campo 'sub'

          // Obtener los datos completos del usuario usando el servicio de usuarios
          const userData = await usuariosService.getUsuarioById(userId);
          setUser(userData);
        } catch (error) {
          console.error("Error al cargar el usuario desde el token o API", error);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    loadUser();
  }, [token]);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await authService.login(email, password);
      localStorage.setItem('token', response.access_token);
      setToken(response.access_token);
      // Aquí podrías necesitar una llamada adicional para obtener los datos completos del usuario
      // si la respuesta del login no los incluye directamente, o si response.user no es el formato esperado
      // Por ahora, asumimos que la API devuelve el id_rol directamente en la respuesta del token
      const decodedToken = jwtDecode(response.access_token);
      const userId = decodedToken.sub;
      const userData = await usuariosService.getUsuarioById(userId);
      setUser({ ...userData, id_rol: response.id_rol }); // Set user with id_rol
      setIsLoading(false);
      return response; // Return the full response including id_rol
    } catch (error) {
      console.error("Login failed", error);
      setIsLoading(false);
      return null; // Return null on failure
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsLoading(false);
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      await authService.register(userData);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Registration failed", error);
      setIsLoading(false);
      // Re-throw the specific error from the backend so the component can catch it
      throw new Error(error.response?.data?.detail || 'Error en el registro');
    }
  };

  const updateUser = (newUserData) => {
    setUser(newUserData);
  };

  const authContextValue = {
    user,
    token,
    isLoading,
    login,
    logout,
    register,
    updateUser, // Add updateUser to the context value
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}