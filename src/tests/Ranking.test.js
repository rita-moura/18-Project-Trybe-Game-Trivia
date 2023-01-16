import React from "react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import Ranking from "../pages/Ranking";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe('Testa se a página de Ranking', () => {
  test('Testa se a página contém as informações corretas', () => {
    renderWithRouterAndRedux(<Ranking />);

    const title = screen.getByRole('heading', {
      level: 1,
      text: /Ranking/i,
    });
    const button = screen.getByRole('button');

    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  test('Testa se o botão funciona corretamente', () => {
    const { history } = renderWithRouterAndRedux(<Ranking />);

    const button = screen.getByRole('button', {
      text: 'Início',
    })

    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  })
})