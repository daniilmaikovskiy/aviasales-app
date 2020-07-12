import React from 'react';
import classes from './switch.module.scss';

export default function Switch() {
  return (
    <div>
      <button type="button" className={`${classes.btn} ${classes.secondary} ${classes.changed}`}>
        Самый дешевый
      </button>
      <button type="button" className={`${classes.btn} ${classes.primary}`}>
        Самый быстрый
      </button>
    </div>
  );
}
