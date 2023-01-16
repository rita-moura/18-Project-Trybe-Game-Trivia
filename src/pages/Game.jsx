import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Question from '../components/Question';
import savePlayerToLocalStorage from '../helpers/localStorageItems';

class Game extends Component {
  state = {
    index: 0,
    redirectToLogin: false,
    redirectToFeedback: false,
    arrQuest: [],
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        const { response_code: response, results } = data;
        if (response === 0) {
          return this.setState({ arrQuest: results });
        }
        localStorage.removeItem('token');
        this.setState({ redirectToLogin: true });
      });
  }

  btnNext = (func) => {
    const { index } = this.state;
    const quatro = 4;
    if (index === quatro) {
      const { score, name, email } = this.props;
      this.setState({ redirectToFeedback: true });
      const player = { score, name, picture: email };
      savePlayerToLocalStorage(player);
    }
    this.setState({ index: index + 1 }, () => {
      func();
    });
  };

  render() {
    const {
      redirectToLogin,
      redirectToFeedback,
      arrQuest,
      index } = this.state;

    if (redirectToLogin) {
      return <Redirect to="/" />;
    }
    if (redirectToFeedback) {
      return <Redirect to="/feedback" />;
    }
    return (
      <div>
        <Header />
        { arrQuest.length !== 0
          ? (
            <Question
              selectedQuestion={ arrQuest[index] }
              btnNext={ this.btnNext }
              index={ index }
            />
          )
          : ''}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
  score: state.player.score,
});

export default connect(mapStateToProps)(Game);
