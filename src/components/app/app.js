import React from 'react';
import classes from './app.module.scss';
import Picture from '../picture';
import MainGrid from '../main-grid';

export default function App() {
  return (
    <div className={classes.wrapper}>
      <Picture className={classes.logo} />
      <MainGrid />
    </div>
  );
}
