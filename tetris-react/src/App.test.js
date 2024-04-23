import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders tetris with start game button', () => {
  render(<App />);
  screen.debug();
  const linkElement = screen.getByText("Start Game");
  expect(linkElement).toBeInTheDocument();
});
