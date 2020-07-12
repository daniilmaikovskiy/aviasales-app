import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SwitchButton from '../switch-button';

const Switch = ({ switchKeys }) => {
  return (
    <div>
      <SwitchButton name="cheapest" switchKeys={switchKeys} />
      <SwitchButton name="fastest" switchKeys={switchKeys} />
    </div>
  );
};

Switch.propTypes = {
  switchKeys: PropTypes.arrayOf(String).isRequired,
};

const mapStateToProps = (state) => {
  return {
    switchKeys: state.switchKeys,
  };
};

export default connect(mapStateToProps)(Switch);
