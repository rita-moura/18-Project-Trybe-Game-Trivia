import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import validateDisabledButton from '../helpers/Validation';

class Login extends Component {
  state = {
    email: '',
    name: '',
    disableButton: true,
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

  render() {
    const { name, email, disableButton } = this.state;
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
            disabled={ disableButton }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(Login);
