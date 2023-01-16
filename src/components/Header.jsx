import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, email, score, assertions } = this.props;
    return (
      <div>
        <p data-testid="header-player-name">{ name }</p>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
          alt="ffff"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-score">{ score }</p>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  email: globalState.player.email,
  name: globalState.player.name,
  score: globalState.player.score,
  assertions: globalState.player.assertions,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
