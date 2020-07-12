import React from 'react';
import classes from './tickets.module.scss';
import Switch from '../switch';
import Ticket from '../ticket';

export default function Tickets() {
  return (
    <div className={classes.wrapper}>
      <Switch />
      <Ticket />
      <Ticket />
      <Ticket />
      <Ticket />
      <Ticket />
    </div>
  );
}
