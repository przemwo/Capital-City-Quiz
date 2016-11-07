import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './components/App';
import { getAllCapitals } from './actions/actions';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';

// const store = configureStore();
// store.dispatch(getAllCapitals());

ReactDOM.render(
  // <Provider store={store}>
    <App />,
  // </Provider>,
  document.getElementById('app')
);
