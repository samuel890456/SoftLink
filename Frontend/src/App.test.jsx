import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

describe('App', () => {
  it('renders the AppRouter component', () => {
    render(<App />);
    // Asumiendo que AppRouter renderiza algo visible, por ejemplo, el Navbar
    expect(screen.getByText(/SoftLink/i)).toBeInTheDocument();
  });
});
