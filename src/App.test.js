import { render, screen } from '@testing-library/react';
import App from './App';

test('renderiza a tela inicial com o título EcoQuiz', () => {
  render(<App />);
  const titulo = screen.getByText(/EcoQuiz/i);
  expect(titulo).toBeInTheDocument();
});

test('renderiza o botão de jogar', () => {
  render(<App />);
  const botao = screen.getByText(/Jogar Agora/i);
  expect(botao).toBeInTheDocument();
});
