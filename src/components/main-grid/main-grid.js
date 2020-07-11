import React from 'react';
import classes from './main-grid.module.scss';

export default function MainGrid() {
  return (
    <main className={classes.grid}>
      <div className={classes.column1} />
      <div className={classes.column2} />
    </main>
  );
}
