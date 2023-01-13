import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style/Games.css';

export default class Answers extends Component {
  render() {
    const { answer, pickAnswer, index, isButtonDisabled } = this.props;
    let answerToRender = answer;
    if (answer.matter) {
      answerToRender = answer.answer;
    }
    return (
      <button
        type="button"
        onClick={ () => pickAnswer() }
        data-testid={ answer.matter ? `wrong-answer-${index}` : 'correct-answer' }
        className={ answer.matter ? 'incorrect' : 'correct' }
        disabled={ isButtonDisabled }

      >
        {answerToRender}
      </button>
    );
  }
}

Answers.propTypes = {
  answer: PropTypes.string,
  pickAnswer: PropTypes.func,
  isButtonDisabled: PropTypes.bool,
}.isRequired;
