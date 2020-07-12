import React from 'react';
import classes from './main-grid.module.scss';
import TransfersMenu from '../transfers-menu';
import Tickets from '../tickets';

export default function MainGrid() {
  return (
    <main className={classes.grid}>
      <div>
        <TransfersMenu />
      </div>
      <div>
        <Tickets />
      </div>
    </main>
  );
}
