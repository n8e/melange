import { connect } from 'react-redux';
import Dashboard from './Dashboard';

function mapStateToProps(state) {
  const { dispatch } = state;
  const letterFrequencyData = state.letterFrequencyData;
  const appleStockData = state.appleStockData;
  return {
    dispatch,
    letterFrequencyData,
    appleStockData,
  };
}

export default connect(mapStateToProps)(Dashboard);
