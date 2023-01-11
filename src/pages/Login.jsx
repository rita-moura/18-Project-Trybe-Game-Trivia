import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import validateDisabledButton from '../helpers/Validation';

class Login extends Component {
  state = {
    email: '',
    name: '',
    disableButton: true,
    willRedirect: false,
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

  startGame = () => {
    const url = 'https://opentdb.com/api_token.php?command=request';
    fetch(url, { method: 'GET' })
      .then((data) => data.json())
      .then((data) => localStorage.setItem('token', data.token))
      .then(() => this.setState({ willRedirect: true }));
  };

  redirectToSettings = () => {
    this.setState({ goToSettings: true });
  };

  render() {
    const { name, email, disableButton, willRedirect, goToSettings } = this.state;

    if (willRedirect) {
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
            onClick={ this.startGame }
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

export default connect()(Login);
