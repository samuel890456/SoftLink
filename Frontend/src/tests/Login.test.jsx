import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Login from '../pages/Login';

// Mock the auth context to control authentication state in tests
jest.mock('../context/AuthContext', () => ({
  ...jest.requireActual('../context/AuthContext'),
  useAuth: () => ({
    login: jest.fn(),
    isLoading: false,
    user: null,
  }),
}));

describe('Login Component', () => {
  test('renders login form with email and password fields', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByText(/¿no tienes cuenta\?/i)).toBeInTheDocument();
  });

  test('shows error message on failed login attempt', async () => {
    const mockLogin = jest.fn(() => false); // Simulate failed login
    jest.spyOn(require('../context/AuthContext'), 'useAuth').mockReturnValue({
      login: mockLogin,
      isLoading: false,
      user: null,
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    expect(await screen.findByText(/credenciales inválidas/i)).toBeInTheDocument();
    expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  test('navigates to register page when "Regístrate aquí" is clicked', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    const registerLink = screen.getByRole('link', { name: /regístrate aquí/i });
    expect(registerLink).toHaveAttribute('href', '/register');
  });
});