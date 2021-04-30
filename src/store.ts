import { applyMiddleware, createStore as create } from 'redux';
import thunk from 'redux-thunk';

import appReducer, { createInitialState } from './modules';

const createStore = () => {
  return create(appReducer, createInitialState(), applyMiddleware(thunk));
};

export default createStore();
