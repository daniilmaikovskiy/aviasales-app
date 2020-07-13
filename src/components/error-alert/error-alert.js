import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
import classes from './error-alert.module.scss';

export default function ErrorAlert({ description }) {
  return (
    <div className={classes.wrapper}>
      <Alert
        className={classes.alert}
        message="Error"
        description={description}
        type="error"
        showIcon
      />
    </div>
  );
}

ErrorAlert.propTypes = {
  description: PropTypes.string.isRequired,
};
