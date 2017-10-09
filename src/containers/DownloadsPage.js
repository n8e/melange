import React from 'react';
import cloudinary from 'cloudinary-core';
import { toJS } from 'immutable'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import Downloads from '../components/dashboard/Dashboard';

function mapStateToProps(state) {
  const { dispatch } = state;
  return {
    dispatch,
  };
}

export default connect(mapStateToProps)(Downloads);
