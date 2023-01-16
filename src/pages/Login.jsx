import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import validateDisabledButton from '../helpers/Validation';
import { fetchAPIToken, userInfo } from '../redux/action/index';

class Login extends Component {
  state = {
    email: '',
    name: '',
    disableButton: true,
    goToGame: false,
    goToSettings: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.setState((prevState) => ({
          disableButton: !validateDisabledButton(prevState),
        }));
      },
    );
  };

  redirectToGame = async () => {
    const { name, email } = this.state;
    const getToken = await fetchAPIToken();
    const { dispatch } = this.props;
    localStorage.setItem('token', getToken.token);
    dispatch(userInfo({ name, email }));
    this.setState({ goToGame: true });
  };

  redirectToSettings = () => {
    this.setState({ goToSettings: true });
  };

  render() {
    const {
      name,
      email,
      disableButton,
      goToGame,
      goToSettings } = this.state;

    if (goToGame) {
      return <Redirect to="/game" />;
    } if (goToSettings) {
      return <Redirect to="/settings" />;
    }

    return (
      <div>
        <form action="">
          <input
            type="text"
            data-testid="input-player-name"
            name="name"
            value={ name }
            onChange={ this.handleChange }
            placeholder="Nome:"
          />
          <input
            type="email"
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            placeholder="Email:"
          />
          <button
            type="button"
            data-testid="btn-play"
            onClick={ this.redirectToGame }
            disabled={ disableButton }
          >
            Play
          </button>
        </form>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.redirectToSettings }
        >
          Configurações
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  name: globalState.user.name,
});

export default connect(mapStateToProps)(Login);
