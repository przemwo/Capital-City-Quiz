// ROOT REDUCER
import * as types from '../actions/actionsTypes';

const mainReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_ALL_CAPITALS:
      return Object.assign({}, state, {capitals: action.capitals});
    case types.CHOOSE_CAPITALS:
      const selected = (state.selected == null) ? [action.capital] : [...state.selected, action.capital];
      return Object.assign({}, state, {selected: selected});
    default:
      return state;
  }
};

export default mainReducer;
