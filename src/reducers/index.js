import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import authentication from './authentication';
import messaging from './messaging';
import letterFrequencyData from './letterFrequencyData';
import appleStockData from './appleStockData';
import entities from './entities';
import errorMessage from './errorMessage';

const rootReducer = combineReducers({
  authentication,
  entities,
  errorMessage,
  routing,
  messaging,
  letterFrequencyData,
  appleStockData,
});

export default rootReducer;
