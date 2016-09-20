import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actions';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      capital: {
        country: 'Please wait...'
      }
    };

    this.getQuestion = this.getQuestion.bind(this);
    this.getAnswers = this.getAnswers.bind(this);
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  componentDidUpdate() {
    if(this.props.selected.length === 0 && this.props.capitals.length > 0) {
      const capital = this.getQuestion(this.props.capitals);
      this.setState({
        capital: capital
      });
      this.props.actions.chooseCapitals(capital);
      this.getAnswers(this.props.capitals, capital);

    }
  }

  getQuestion(capitals) {
    return capitals[Math.floor(Math.random() * capitals.length)];
  }

// TODO: make sure that answers is also unique!!!
  getAnswers(capitals, questionCapital, num = 2) {
    let counter = 0;
    const answers = [];
    const question = JSON.stringify(questionCapital);
    while(counter < num) {
      let tmp = this.getQuestion(capitals);
      if(JSON.stringify(tmp) !== question) {
        answers.push(tmp);
        counter++;
      }
    }
    console.log(answers);
  }

  render () {
    return (
      <div className="container game-container">

        <div className="jumbotron gameboard">

          <div className="row">
            <div className="col-xs-12">

              <div className="question-counter">
                <h4>3/10</h4>
              </div>

              <h4>What's the capital city of...</h4>
              <h2 className="text-center">{this.state.capital.country}?</h2>

              <div>
                <div className="radio">
                  <label>
                    <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" />
                    Warszawa
                  </label>
                </div>

                <div className="radio">
                  <label>
                    <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2" />
                    London
                  </label>
                </div>

                <div className="radio">
                  <label>
                    <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2" />
                    Berlin
                  </label>
                </div>

              </div>

              <div className="text-center">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => {console.log(1);}}>
                  Check it!
                </button>
              </div>

              {this.props.capitals.map(capital => {
                return (
                  <div key={capital.id}>
                    {capital.country} - {capital.capital}
                  </div>
                );
              })}

            </div>
          </div>

        </div>

      </div>
    );
  }
}

const mapStateToProps = (state = {}, ownProps) => {
  return {
    capitals: state.capitals ? state.capitals : [],
    selected: state.selected ? state.selected : []
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
};
const App = connect(mapStateToProps, mapDispatchToProps)(Main);
export default App;
