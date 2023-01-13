import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../App"
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const initialState = {
  email: '',
  name: '',
  disableButton: true,
  goToGame: false,
  goToSettings: false,
};


describe('Testa se a página de Login funciona corretamente', () => {
  test('Testa se contém as informações corretas', () => {
    renderWithRouterAndRedux(<App />, initialState)

    const email = screen.getByTestId('input-gravatar-email');
    const name = screen.getByTestId('input-player-name');
    const buttons = screen.getAllByRole('button')

    expect(email).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(buttons).toHaveLength(2);

  })

  test('Testa se os inputs e botão Play funcionam corretamente', async() => {
    const { history } = renderWithRouterAndRedux(<App />)

    const email = screen.getByTestId('input-gravatar-email');
    const name = screen.getByTestId('input-player-name');
    const buttonPlay = screen.getByRole('button', {
      name: /play/i
    })

    expect(buttonPlay.disabled).toBe(true);

    userEvent.type(email, 'Teste@este.com');
    userEvent.type(name, 'Teste Teste');

    expect(buttonPlay.disabled).toBe(false);

    userEvent.click(buttonPlay)

    const { pathname } = history.location;
    expect(pathname).toBe('/');
    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/game')
    });
  })
  
  test('Testa se o botão de Configurações redireciona para a página correta', () => {
    const { history } = renderWithRouterAndRedux(<App />)

    const buttonSettings = screen.getByRole('button', {
      name: /configurações/i
    })
    expect(buttonSettings).toBeInTheDocument();

    userEvent.click(buttonSettings)

    const { pathname } = history.location;
    expect(pathname).toBe('/settings');
  });

});
