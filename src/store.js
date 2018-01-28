import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combineReducers from "./reducers/"
import logger from 'redux-logger'


const middleware = applyMiddleware( thunk, logger )

const store = createStore(
  combineReducers, middleware
);
export default store;
