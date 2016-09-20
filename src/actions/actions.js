import * as types from './actionsTypes';
import capitalApi from '../api/mockCapitalApi';

// Choose capitals for quiz
export const chooseCapitals = (capital) => {
  return {
    type: types.CHOOSE_CAPITALS,
    capital: capital
  };
};

// All capitals loaded successfully
export const getAllCapitalsSuccess = (capitals) => {
  return {
    type: types.GET_ALL_CAPITALS,
    capitals
  };
};

// Load all capitals (promise)
export const getAllCapitals = () => {
  return (dispatch) => {
    return capitalApi.getCapitals().then(res => {
      dispatch(getAllCapitalsSuccess(res));
    }).catch(error => {
      throw(error)
    });
  };
};
