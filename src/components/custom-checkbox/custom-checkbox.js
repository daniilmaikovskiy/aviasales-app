import React from 'react';
import PropTypes from 'prop-types';
import classes from './custom-checkbox.module.scss';

export default function CustomCheckbox({ className, text }) {
  return (
    <label className={className}>
      <input className={classes.oldCheckbox} type="checkbox" />
      <span className={classes.checkbox} />
      <span className={classes.text}>{text}</span>
    </label>
  );
}

CustomCheckbox.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
