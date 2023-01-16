import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  state = {
    redirectToLogin: false,
    redirectToRanking: false,
    feedbackMessage: '',
  };

  componentDidMount() {
    this.setFeedbackMessage();
  }

  redirectToLogin = () => {
    this.setState({ redirectToLogin: true });
  };

  redirectToRanking = () => {
    this.setState({ redirectToRanking: true });
  };

  setFeedbackMessage = () => {
    const { score: { pickedAnswers } } = this.props;
    const minExpected = 3;
    if (!pickedAnswers) {
      return;
    }
    const correctAnswers = pickedAnswers.filter((answer) => answer === 'correct');
    if (correctAnswers.length < minExpected) {
      this.setState({ feedbackMessage: 'Could be better...' });
    }
    if (correctAnswers.length === minExpected || correctAnswers.length > minExpected) {
      this.setState({ feedbackMessage: 'Well Done!' });
    }
  };

  render() {
    const { redirectToLogin, redirectToRanking, feedbackMessage } = this.state;

    if (redirectToLogin) {
      return <Redirect to="/" />;
    }
    if (redirectToRanking) {
      return <Redirect to="/ranking" />;
    }

    return (
      <div data-testid="feedback-text">
        <Header />
        <h1>Feedback</h1>
        <h2 data-testid="feedback-text">{ feedbackMessage }</h2>
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

const mapStateToProps = ({ player: score }) => ({
  score,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  score: PropTypes.objectOf(Object).isRequired,
};
