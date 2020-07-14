import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { btn, left, right, changed } from './switch-button.module.scss';
import actions from '../../actions/actions';

const SwitchButton = ({ name, text, orientation, switchKeys, switchBtnPressed }) => {
  const classes = [btn];

  if (orientation === 'left') {
    classes.push(left);
  } else {
    classes.push(right);
  }

  if (switchKeys.some((el) => el === name)) {
    classes.push(changed);
  }

  return (
    <button
      type="button"
      name={name}
      className={classes.join(' ')}
      onClick={() => switchBtnPressed(name)}
    >
      {text}
    </button>
  );
};

SwitchButton.propTypes = {
  switchKeys: PropTypes.arrayOf(String).isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  orientation: PropTypes.string.isRequired,
  switchBtnPressed: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    switchKeys: state.switchKeys,
  };
};

export default connect(mapStateToProps, actions)(SwitchButton);
