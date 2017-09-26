import { Map, List } from 'immutable';
import { appleStock } from '@vx/mock-data';

export const INITIAL_DATE_DATA_STATE = Map({
  appleStock: List(appleStock),
});

const appleStockData = (state = INITIAL_DATE_DATA_STATE, action) => {
  switch (action.type) {
    case 'DELETE_BY_ID':
    default:
      return state;
  }
};

export default appleStockData;
