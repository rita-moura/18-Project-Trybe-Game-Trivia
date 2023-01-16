import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style/Games.css';

export default class Answers extends Component {
  render() {
    const {
      answer,
      pickAnswer,
      index,
      isButtonDisabled,
      shouldChangeButtonColor,
    } = this.props;
    const setClassByMatter = answer.matter ? 'incorrect' : 'correct';
    let answerToRender = answer;
    if (answer.matter) {
      answerToRender = answer.answer;
    }
    return (
      <button
        type="button"
        onClick={ () => pickAnswer(setClassByMatter) }
        data-testid={ answer.matter ? `wrong-answer-${index}` : 'correct-answer' }
        disabled={ isButtonDisabled }
        className={ shouldChangeButtonColor ? setClassByMatter : '' }
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
