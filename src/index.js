import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import 'antd/dist/antd.css';
import './index.css';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducer from './reducer/reducer';
import App from './components/app';
import AviasalesService from './services/aviasales-service';
import AviasalesServiceContext from './components/aviasales-service-context';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(reduxThunk)));
const aviasalesService = new AviasalesService();

ReactDOM.render(
  <AviasalesServiceContext.Provider value={aviasalesService}>
    <Provider store={store}>
      <App />
    </Provider>
  </AviasalesServiceContext.Provider>,
  document.getElementById('root')
);
