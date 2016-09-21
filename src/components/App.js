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

const Answer = ({answer}) => {
  return (
    <div className="radio">
      <label>
        <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" />
        {answer.capital}
      </label>
    </div>
  );
};

const Answers = ({answers}) => {
  return (
    <div>
      {answers.map(answer =>
        <Answer answer={answer} key={answer.id} />
      )}
    </div>
  );
};

const CheckItBtn = () => {
  return (
    <div className="text-center">
      <button
        className="btn btn-primary btn-lg"
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
    answers: []
  };

  constructor(props) {
    super(props);
  }

  componentDidUpdate () {
    console.log('Did update!');
  }

  componentDidMount () {
    // Get all capitals and update state
    capitalApi.getCapitals().then(res => {
      const capitals = res;
      const counter = this.state.counter + 1;
      const question = this.getOneCountry(capitals);
      const answers = this.getAnswers(capitals, question);
      this.setState({
        capitals: res,
        counter: counter,
        question: question,
        answers: answers
      });
      console.log(this.state.answers);
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
    // const questionString = JSON.stringify(question);
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

  render () {
    return (
      <div className="container game-container">
        <div className="jumbotron gameboard">
          <div className="row">
            <div className="col-xs-12">

              <Counter counter={this.state.counter} />

              <Question question={this.state.question} />

              <Answers answers={this.state.answers} />

              <CheckItBtn />

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
