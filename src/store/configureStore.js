import { createStore, applyMiddleware } from 'redux';
import mainReducer from '../reducers/main';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

const configureStore = (initialState) => {
  return createStore(
    mainReducer,
    initialState,
    applyMiddleware(thunk, reduxImmutableStateInvariant())
  );
};

export default configureStore;
