import { toJS } from 'immutable'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import Downloads from '../components/downloads/Downloads';

function mapStateToProps(state) {
  const { dispatch } = state;
  return {
    dispatch,
  };
}

export default connect(mapStateToProps)(Downloads);
