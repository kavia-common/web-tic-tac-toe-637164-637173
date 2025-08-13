import { render, screen } from '@testing-library/react';
import App from './App';

test('renders game title', () => {
  render(<App />);
  const titleElement = screen.getByText(/tic tac toe/i);
  expect(titleElement).toBeInTheDocument();
});
