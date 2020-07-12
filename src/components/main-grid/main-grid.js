import React from 'react';
import classes from './main-grid.module.scss';
import TransfersMenu from '../transfers-menu';

export default function MainGrid() {
  return (
    <main className={classes.grid}>
      <div className={classes.column1}>
        <TransfersMenu />
      </div>
      <div className={classes.column2} />
    </main>
  );
}
