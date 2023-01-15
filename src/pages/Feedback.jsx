import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Feedback extends Component {
  state = {
    goLogin: false,
  };

  redirectToLogin = () => {
    this.setState({ goLogin: true });
  };

  render() {
    const { goLogin } = this.state;

    if (goLogin) return <Redirect to="/" />;

    return (
      <div data-testid="feedback-text">
        <h1>Feedback</h1>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.redirectToLogin }
        >
          Play Again
        </button>
      </div>
    );
  }
}
