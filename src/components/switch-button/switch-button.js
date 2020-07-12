import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { btn, primary, secondary, changed } from './switch-button.module.scss';
import actions from '../../actions';

const getDataByName = (name) => {
  switch (name) {
    case 'cheapest':
      return {
        text: 'Самый дешевый',
        classes: [btn, secondary],
      };
    case 'fastest':
      return {
        text: 'Самый быстрый',
        classes: [btn, primary],
      };
    default:
      throw new Error('Unknown name');
  }
};

const SwitchButton = ({ name, switchKeys, switchBtnPressed }) => {
  const data = getDataByName(name);
  const { classes } = data;

  if (switchKeys.some((el) => el === name)) {
    classes.push(changed);
  }

  const className = classes.join(' ');

  return (
    <button type="button" name={name} className={className} onClick={() => switchBtnPressed(name)}>
      {data.text}
    </button>
  );
};

SwitchButton.propTypes = {
  switchKeys: PropTypes.arrayOf(String).isRequired,
  name: PropTypes.string.isRequired,
  switchBtnPressed: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    switchKeys: state.switchKeys,
  };
};

export default connect(mapStateToProps, actions)(SwitchButton);
