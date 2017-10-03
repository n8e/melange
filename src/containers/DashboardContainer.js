import { toJS } from 'immutable'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import Dashboard from '../components/dashboard/Dashboard';

function mapStateToProps(state) {
  const { dispatch } = state;
  const letterFrequencyData = state.letterFrequencyData.toJS();
  const appleStockData = state.appleStockData.toJS();
  return {
    dispatch,
    letterFrequencyData,
    appleStockData,
  };
}

export default connect(mapStateToProps)(Dashboard);