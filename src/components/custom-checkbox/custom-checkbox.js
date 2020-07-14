import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classes from './custom-checkbox.module.scss';
import actions from '../../actions/actions';

const CustomCheckbox = ({ className, name, text, transfersFilter, checkingTransfersCheckbox }) => {
  const checked = transfersFilter[0] === 'all' || transfersFilter.some((el) => el === name);

  return (
    <label className={className}>
      <input
        className={classes.oldCheckbox}
        type="checkbox"
        checked={checked}
        onChange={() => checkingTransfersCheckbox(name)}
      />
      <span className={classes.checkbox} />
      <span className={classes.text}>{text}</span>
    </label>
  );
};

CustomCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  transfersFilter: PropTypes.arrayOf(String).isRequired,
  checkingTransfersCheckbox: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    transfersFilter: state.transfersFilter,
  };
};

export default connect(mapStateToProps, actions)(CustomCheckbox);
