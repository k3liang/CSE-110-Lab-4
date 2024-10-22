import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

/*
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/

test('renders title', () => {
  render(<App />);
  const title = screen.getByText("My Budget Planner");
  expect(title).toBeInTheDocument();
});
