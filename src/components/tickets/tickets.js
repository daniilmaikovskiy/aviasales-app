import React from 'react';
import classes from './tickets.module.scss';
import Switch from '../switch';

export default function Tickets() {
  return (
    <div className={classes.wrapper}>
      <Switch />
    </div>
  );
}
