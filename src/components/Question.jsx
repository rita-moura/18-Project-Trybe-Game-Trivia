import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Answers from './Answers';
import Timer from './Timer';

export default class Question extends Component {
  state = {
    nextLocked: false,
    answerArray: [],
    seconds: 30,
    showTimer: true,
  };

  componentDidMount() {
    this.setNewAnswers();
    this.setTimer();
  }

  componentWillUnmount() {
    clearInterval(this.gameTimerInterval);
  }

  setTimer = () => {
    const timeInterval = 1000;
    this.gameTimerInterval = setInterval(() => {
      const { seconds } = this.state;
      if (seconds > 0) {
        this.setState((prevState) => ({
          seconds: prevState.seconds - 1,
        }));
      }
      if (seconds === 0) {
        clearInterval(this.gameTimerInterval);
      }
    }, timeInterval);
  };

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
    this.setState({ nextLocked: true, showTimer: false });
  };

  handleNext = (func) => {
    this.setState({ nextLocked: false });
    clearInterval(this.gameTimerInterval);
    this.setState({ showTimer: true, seconds: 30 });
    this.setTimer();
    this.setNewAnswers();
    func();
  };

  randomize = (arr) => {
    const helper = 0.5;
    return arr.sort(() => Math.random() - helper);
  };

  render() {
    const { selectedQuestion, btnNext } = this.props;
    const { nextLocked, answerArray, seconds, showTimer } = this.state;
    const { category, question } = selectedQuestion;

    return (
      <div>
        <div>
          { showTimer && <Timer seconds={ seconds } />}
        </div>
        <h1 data-testid="question-category">{ category }</h1>
        <h2 data-testid="question-text">{ question }</h2>
        <div data-testid="answer-options">
          { answerArray.map((answer, index) => (
            <Answers
              key={ `${answer}${index}` }
              answer={ answer }
              pickAnswer={ this.pickAnswer }
              index={ index }
              isButtonDisabled={ seconds === 0 }
            />
          )) }
        </div>
        { nextLocked
          ? (
            <button
              type="button"
              data-testid="btn-next"
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
