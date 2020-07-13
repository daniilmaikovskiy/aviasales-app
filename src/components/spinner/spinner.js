import React from 'react';
import { Spin } from 'antd';
import classes from './spinner.module.scss';

export default function Spinner() {
  return (
    <div className={classes.wrapper}>
      <Spin className={classes.spinner} tip="loading..." />
    </div>
  );
}
