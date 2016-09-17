import * as types from './actionsTypes';
import capitalApi from '../api/mockCapitalApi';

export const getAllCapitalsSuccess = (capitals) => {
  return {
    type: types.GET_ALL_CAPITALS,
    capitals
  };
};

export const getAllCapitals = () => {
  return (dispatch) => {
    return capitalApi.getCapitals().then(res => {
      dispatch(getAllCapitalsSuccess(res));
    }).catch(error => {
      throw(error)
    });
  };
};
