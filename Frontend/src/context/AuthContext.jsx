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
    console.log("AuthContext - Attempting login for:", email);
    try {
      const response = await authService.login(email, password);
      console.log("AuthContext - Login API response:", response);
      
      if (!response || !response.access_token) {
        console.error("AuthContext - Invalid response from login");
        setIsLoading(false);
        throw new Error('Respuesta inválida del servidor');
      }
      
      localStorage.setItem('token', response.access_token);
      setToken(response.access_token);
      
      // Obtener datos del usuario desde el token
      try {
        const decodedToken = jwtDecode(response.access_token);
        const userId = decodedToken.sub;
        const userData = await usuariosService.getUsuarioById(userId);
        
        // Asegurarse de que el id_rol se obtenga correctamente
        const userWithRole = { 
          ...userData, 
          id_rol: response.id_rol || userData.id_rol || userData.id_rol 
        };
        setUser(userWithRole);
        console.log("AuthContext - User set after login:", userWithRole);
        
        setIsLoading(false);
        return { ...response, id_rol: userWithRole.id_rol }; // Return response with id_rol
      } catch (userError) {
        console.error("AuthContext - Error fetching user data:", userError);
        // Si falla obtener el usuario, al menos tenemos el token
        setIsLoading(false);
        throw new Error('Error al obtener datos del usuario');
      }
    } catch (error) {
      console.error("AuthContext - Login failed", error);
      setIsLoading(false);
      throw error; // Re-throw para que el componente pueda manejarlo
    }
  };

  const logout = () => {
    console.log("AuthContext - Logging out."); // Nuevo
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsLoading(false);
  };

  const register = async (userData) => {
    setIsLoading(true);
    console.log("AuthContext - Attempting registration for:", userData.email); // Nuevo
    try {
      const response = await authService.register(userData); // Nuevo: capturar respuesta
      console.log("AuthContext - Registration API response:", response); // Nuevo
      setIsLoading(false);
      return response; // Nuevo: devolver respuesta
    } catch (error) {
      console.error("AuthContext - Registration failed", error); // Nuevo
      setIsLoading(false);
      throw new Error(error.response?.data?.detail || 'Error en el registro');
    }
  };

  const updateUser = (newUserData) => {
    console.log("AuthContext - Updating user data:", newUserData); // Nuevo
    // Cache-busting for the user's photo to force a reload
    if (newUserData.foto) {
      newUserData.foto = `${newUserData.foto}?t=${new Date().getTime()}`;
    }
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