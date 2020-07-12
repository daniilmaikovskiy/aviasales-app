import React from 'react';
import PropTypes from 'prop-types';
import { btn, primary, secondary, changed } from './switch-button.module.scss';

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

const SwitchButton = ({ name, switchKeys }) => {
  const data = getDataByName(name);
  const { classes } = data;

  if (switchKeys.some((el) => el === name)) {
    classes.push(changed);
  }

  return (
    <button type="button" name={name} className={classes.join(' ')}>
      {data.text}
    </button>
  );
};

SwitchButton.propTypes = {
  switchKeys: PropTypes.arrayOf(String).isRequired,
  name: PropTypes.string.isRequired,
};

export default SwitchButton;
