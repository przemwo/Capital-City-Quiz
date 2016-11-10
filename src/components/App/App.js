import React from 'react';
import capitalApi from '../../api/mockCapitalApi';

const Counter = ({counter}) => {
  return (
    <div className="question-counter">
      <h5>Question: {counter}/10</h5>
    </div>
  );
};

const Question = ({question}) => {
  return (
    <div>
      <h4>What's the capital city of...</h4>
      <h2 className="text-center">{question.country}?</h2>
    </div>
  );
};

const Answer = ({answer, selectedAnswer, isRightAnswer, isShowingAnswer, onCheckboxChange}) => {

  return (
    <div className="radio" style={(isShowingAnswer && !isRightAnswer) ? {color: '#b0b0b0'} : {}}>
      <label>
        <input
          type="radio"
          name="optionsRadios"
          onChange={isShowingAnswer ? null : onCheckboxChange} //prevent onChange when presenting answer
          checked={selectedAnswer === answer.capital}
        />
      {answer.capital} {isRightAnswer && <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>}
      </label>
    </div>
  );
};

const Answers = ({answers, question, answer, onCheckboxChange, isShowingAnswer}) => {
  const selectedAnswer = answer.capital;
  return (
    <div>
      {answers.map(answer =>
        <Answer
          answer={answer}
          selectedAnswer={selectedAnswer}
          isRightAnswer={isShowingAnswer && (JSON.stringify(answer) === JSON.stringify(question))}
          isShowingAnswer={isShowingAnswer}
          onCheckboxChange={onCheckboxChange.bind(null, answer)}
          key={answer.id} />
      )}
    </div>
  );
};

const Button = (props) => {
  return (
    <div className="text-center">
      <button
        className="btn btn-primary btn-lg"
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    </div>
  );
};

class GameContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      question: {},
      answers: [],
      selectedAnswer: {},
      isShowingAnswer: false
    };
  }

  componentDidMount() {
    if(!this.props.capitals) return;
    const capitals = this.props.capitals;
    const counter = this.state.counter + 1;
    const question = this.getOneCountry(capitals);
    let answers = this.getAnswers(capitals, question);
    answers = this.shuffle(answers);
    this.setState({
      counter: counter,
      question: question,
      answers: answers
    });
    console.log(1);
  }



  componentDidUpdate () {
    console.log('Did update!');
  }

  // Choose one country
  getOneCountry = (capitals) => {
    const number = Math.floor(Math.random() * capitals.length);
    return capitals[number];
  }

  // Choose answers
  getAnswers = (capitals, question, num = 2) => {
    let counter = 0;
    const answers = [question];
    while (counter < num) {
      const tmpAnswer = this.getOneCountry(capitals);
      const tmp = answers.filter(answer => {
        return JSON.stringify(answer) === JSON.stringify(tmpAnswer);
      });
      if(tmp.length === 0) {
        answers.push(tmpAnswer);
        counter++;
      }
    }
    return answers;
  };

  shuffle = (array) => {
    array = Object.assign([], array);
    let currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
  };

  // User selected an answer
  handleCheckboxChange = (answer) => {
    this.setState({
      selectedAnswer: answer
    });
  }

  // Check if answer is right?
  onClickCheckIt = () => {
    const question = this.state.question;
    const answer = this.state.selectedAnswer;
    if(JSON.stringify(question) === JSON.stringify(answer)) {
      console.log('OK!');
    } else {
      console.log('NOT OK!');
    }
    this.setState({
      isShowingAnswer: true
    });
  }
  onClickNext = () => {
    const counter = this.state.counter + 1;
    const question = this.getOneCountry(this.props.capitals);
    let answers = this.getAnswers(this.props.capitals, question);
    answers = this.shuffle(answers);
    this.setState({
      selectedAnswer: {},
      counter: counter,
      question: question,
      answers: answers,
      isShowingAnswer: false
    });
  }

  render () {
    const isBtnActive = Object.keys(this.state.selectedAnswer).length > 0;
    const btnCopy = (this.props.capitals.length === 0) ? 'Loading...' : this.state.isShowingAnswer ? 'Next' : 'Check it!';
    let onClickBtn;
    if(this.state.isShowingAnswer) {
      onClickBtn = this.onClickNext;
    } else {
      onClickBtn = this.onClickCheckIt;
    }
    return (
      <div>
        <Counter counter={this.state.counter} />
        <Question question={this.state.question} />
        <div className="text-center">
          <img src={require('../../assets/images/face_thinking.png')} style={{width: '75px'}} />
        </div>
        <Answers
          answers={this.state.answers}
          question={this.state.question}
          answer={this.state.selectedAnswer}
          isShowingAnswer={this.state.isShowingAnswer}
          onCheckboxChange={this.handleCheckboxChange} />
        <Button
          onClick={onClickBtn}
          disabled = {!isBtnActive}>
          {btnCopy}
        </Button>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { capitals: [] };
  }
  componentDidMount () {
    // Get all capitals and update state
    capitalApi.getCapitals().then(res => {
      this.setState({
        capitals: res,
      });
    });
  }
  render() {

    return(
      <div className="container game-container">
        <div className="jumbotron gameboard">
          <div className="row">
            <div className="col-xs-12">
                {this.state.capitals.length === 0 ? (
                  <div className="text-center">
                    <h2>Loading...</h2>
                  </div>
                ) : (
                  <GameContainer capitals={this.state.capitals} />
                )}
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default App;
