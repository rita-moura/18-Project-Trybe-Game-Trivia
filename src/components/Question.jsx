import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Answers from './Answers';

export default class Question extends Component {
  state = {
    nextLocked: false,
    answerArray: [],
  };

  componentDidMount() {
    this.setNewAnswers();
  }

  organizeAnswer = (array, matter) => array.map((answer) => ({ answer, matter }));

  setNewAnswers = () => {
    const { selectedQuestion } = this.props;
    const {
      incorrect_answers: incorrectAnswer,
      correct_answer: correctAnswer,
    } = selectedQuestion;

    const wrong = this.organizeAnswer(incorrectAnswer, 'incorrect');

    let answers = [...wrong, correctAnswer];

    answers = this.randomize(answers);
    this.setState({ answerArray: answers });
  };

  pickAnswer = () => {
    this.setState({ nextLocked: true });
  };

  handleNext = (func) => {
    this.setState({ nextLocked: false });
    func();
    this.setNewAnswers();
  };

  randomize = (arr) => {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const x = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[x]] = [arr[x], arr[i]];
    }
    return arr;
  };

  render() {
    const { selectedQuestion, btnNext } = this.props;
    const { nextLocked, answerArray } = this.state;
    const { category, question } = selectedQuestion;

    return (
      <div>
        <h1 data-testid="question-category">{ category }</h1>
        <h2 data-testid="question-text">{ question }</h2>
        <div data-testid="answer-options">
          { answerArray.map((answer, index) => (
            <Answers
              key={ `${answer}${index}` }
              answer={ answer }
              pickAnswer={ this.pickAnswer }
              index={ index }
            />
          )) }
        </div>
        { nextLocked
          ? (
            <button
              type="button"
              onClick={ () => this.handleNext(btnNext) }
            >
              Next
            </button>
          )
          : '' }
      </div>
    );
  }
}

Question.propTypes = {
  selectedQuestion: PropTypes.objectOf(Object),
  btnNext: PropTypes.func,
}.isRequired;
