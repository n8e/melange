import { letterFrequency } from '@vx/mock-data';

export const INITIAL_LINE_DATA_STATE = {
  letterFrequency: letterFrequency,
};

const letterFrequencyData = (state = INITIAL_LINE_DATA_STATE, action) => {
  switch (action.type) {
    case 'DELETE_BY_ID':
    default:
      return state;
  }
};

export default letterFrequencyData;
