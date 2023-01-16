import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Answers from './Answers';
import Timer from './Timer';
import { saveScore } from '../redux/action';

class Question extends Component {
  state = {
    nextLocked: false,
    answerArray: [],
    seconds: 30,
    showTimer: true,
    buttonColorChange: false,
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

  pickAnswer = (answer) => {
    const { seconds } = this.state;
    this.setState({ nextLocked: true, showTimer: false, buttonColorChange: true });

    if (answer === 'correct') {
      const { dispatch, score, selectedQuestion } = this.props;
      const multiplier = { easy: 1, medium: 2, hard: 3 };
      const dez = 10;
      const sumScore = dez + (seconds * multiplier[selectedQuestion.difficulty]);
      dispatch(saveScore(sumScore + score));
    }
  };

  handleNext = (func) => {
    func(this.setNewAnswers);
    this.setState({ nextLocked: false });
    clearInterval(this.gameTimerInterval);
    this.setState({ showTimer: true, seconds: 30, buttonColorChange: false });
    this.setTimer();
  };

  randomize = (arr) => {
    const helper = 0.5;
    return arr.sort(() => Math.random() - helper);
  };

  render() {
    const { selectedQuestion, btnNext } = this.props;
    const { nextLocked, answerArray, seconds, showTimer, buttonColorChange } = this.state;
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
              shouldChangeButtonColor={ buttonColorChange }
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

const mapStateToProps = ({ player: { score } }) => ({
  score,
});

export default connect(mapStateToProps)(Question);

Question.propTypes = {
  selectedQuestion: PropTypes.objectOf(Object),
  btnNext: PropTypes.func,
}.isRequired;
