import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders height input', () => {
  render(<App />);
  const heightInput = screen.getByText(/height/i);
  expect(heightInput).toBeInTheDocument();
});
