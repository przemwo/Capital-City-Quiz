// ROOT REDUCER
import * as types from '../actions/actionsTypes';

const mainReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_ALL_CAPITALS:
      console.log(action.capitals);
      return Object.assign({}, state, {capitals: action.capitals});
    default:
      return state;
  }
};

export default mainReducer;
