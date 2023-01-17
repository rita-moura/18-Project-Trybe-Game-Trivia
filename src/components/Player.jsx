import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

export default class Player extends Component {
  render() {
    const { name, score, email, index } = this.props;
    return (
      <div>
        <span>
          <img
            src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
            alt="Avatar"
            data-testid="header-profile-picture"
          />
        </span>
        <span data-testid={ `player-name-${index}` }>{ name }</span>
        <span data-testid={ `player-score-${index}` }>{ score }</span>
      </div>
    );
  }
}

Player.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};
