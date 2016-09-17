import React from 'react';
import { connect } from 'react-redux';

class Main extends React.Component {
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
              <h2 className="text-center">Poland?</h2>

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
    capitals: state.capitals ? state.capitals : []
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch
  };
};
const App = connect(mapStateToProps, mapDispatchToProps)(Main);
export default App;
