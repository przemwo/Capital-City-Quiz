import React from 'react';
import capitalApi from '../api/mockCapitalApi';

const Counter = ({counter}) => {
  return (
    <div className="question-counter">
      <h4>{counter}/10</h4>
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

const Answer = ({answer, tmp, onCheckboxChange}) => {
  console.log(tmp);
  return (
    <div className={`radio ${tmp}`}>
      <label>
        <input
          type="radio"
          name="optionsRadios"
          onClick={onCheckboxChange}
        />
        {answer.capital}
      </label>
    </div>
  );
};

const Answers = ({answers, question, onCheckboxChange, isShowingAnswer}) => {
  return (
    <div>
      {answers.map(answer =>
        <Answer
          answer={answer}
          tmp={(isShowingAnswer) ? (JSON.stringify(answer) === JSON.stringify(question)) ? 'bg-success' : 'bg-warning' : ''}
          onCheckboxChange={onCheckboxChange.bind(null, answer)}
          key={answer.id} />
      )}
    </div>
  );
};

const CheckItBtn = ({onClickBtn, isActive, isShowingAnswer}) => {
  return (
    <div className="text-center">
      <button
        className="btn btn-primary btn-lg"
        onClick={onClickBtn}
        disabled={isShowingAnswer || !isActive}
      >
        Check it!
      </button>
    </div>
  );
};

class App extends React.Component {
  state = {
    capitals: [],
    counter: 0,
    question: {},
    answers: [],
    answer: {},
    isBtnActive: false,
    isShowingAnswer: false
  };

  constructor(props) {
    super(props);
  }

  componentDidUpdate () {
    console.log('Did update!');
    // console.log(this.state.answer);
  }

  componentDidMount () {
    // Get all capitals and update state
    capitalApi.getCapitals().then(res => {
      const capitals = res;
      const counter = this.state.counter + 1;
      const question = this.getOneCountry(capitals);
      let answers = this.getAnswers(capitals, question);
      answers = this.shuffle(answers);
      this.setState({
        capitals: res,
        counter: counter,
        question: question,
        answers: answers
      });
    });
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
      answer: answer,
      isBtnActive: true
    });
  }

  // Check if answer is right?
  onClickCheckIt = () => {
    const question = this.state.question;
    const answer = this.state.answer;
    if(JSON.stringify(question) === JSON.stringify(answer)) {
      console.log('OK!');
    } else {
      console.log('NOT OK!');
    }
    this.setState({
      isBtnActive: false,
      isShowingAnswer: true
    });
  }

  render () {
    return (
      <div className="container game-container">
        <div className="jumbotron gameboard">
          <div className="row">
            <div className="col-xs-12">

              <Counter counter={this.state.counter} />

              <Question question={this.state.question} />

              <Answers answers={this.state.answers} question={this.state.question} isShowingAnswer={this.state.isShowingAnswer} onCheckboxChange={this.handleCheckboxChange} />

              <CheckItBtn onClickBtn={this.onClickCheckIt} isActive={this.state.isBtnActive} isShowingAnswer={this.state.isShowingAnswer} />

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
