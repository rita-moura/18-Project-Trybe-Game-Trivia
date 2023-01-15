import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Feedback extends Component {
  state = {
    redirectToLogin: false,
    redirectToRanking: false,
  };

  redirectToLogin = () => {
    this.setState({ redirectToLogin: true });
  };

  redirectToRanking = () => {
    this.setState({ redirectToRanking: true });
  };

  render() {
    const { redirectToLogin, redirectToRanking } = this.state;

    if (redirectToLogin) {
      return <Redirect to="/" />;
    }
    if (redirectToRanking) {
      return <Redirect to="/ranking" />;
    }

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
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.redirectToRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}
