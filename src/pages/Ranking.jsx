import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Ranking extends Component {
  state = {
    redirectToLogin: false,
  };

  redirectToLogin = () => {
    this.setState({ redirectToLogin: true });
  };

  render() {
    const { redirectToLogin } = this.state;

    if (redirectToLogin) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.redirectToLogin }
        >
          Início
        </button>
      </div>
    );
  }
}
