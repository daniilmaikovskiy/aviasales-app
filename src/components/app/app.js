import React from 'react';
import classes from './app.module.scss';
import Picture from '../picture';

export default function App() {
  return (
    <div className={classes.wrapper}>
      <Picture className={classes.logo} />
    </div>
  );
}
