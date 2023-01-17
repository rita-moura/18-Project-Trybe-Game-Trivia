import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Player from '../components/Player';

class Ranking extends Component {
  state = {
    redirectToLogin: false,
    ranking: [],
  };

  componentDidMount() {
    if (!localStorage.getItem('ranking')) {
      return;
    }
    const rankingList = JSON.parse(localStorage.getItem('ranking'));
    const sortedRanking = rankingList.sort((a, b) => b.score - a.score);
    this.setState({
      ranking: sortedRanking,
    });
  }

  redirectToLogin = () => {
    this.setState({ redirectToLogin: true });
  };

  render() {
    const { redirectToLogin, ranking } = this.state;

    if (redirectToLogin) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {ranking.map((rank, index) => (
          <Player
            key={ index }
            index={ index }
            name={ rank.name }
            email={ rank.picture }
            score={ rank.score }
          />
        ))}
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

export default Ranking;
