import React from 'react';
import classes from './ticket.module.scss';
import Picture from '../picture';
import s7Logo from '../../img/s7logo.png';

export default function Ticket() {
  return (
    <div className={classes.wrapper}>
      <div className={`${classes.cost} ${classes.cell}`}>13 400 P</div>
      <div className={classes.cell}>
        <Picture className={classes.logo} src={s7Logo} />
      </div>
      <div className={classes.voyageCell}>
        <span className={classes.label}>MOW - HKT</span>
        <br />
        <span className={classes.text}>10:45 - 08:00</span>
      </div>
      <div className={classes.voyageCell}>
        <span className={classes.label}>В пути</span>
        <br />
        <span className={classes.text}>21ч 15м</span>
      </div>
      <div className={classes.voyageCell}>
        <span className={classes.label}>2 пересадки</span>
        <br />
        <span className={classes.text}>HKG, JNB</span>
      </div>
      <div className={classes.voyageCell}>
        <span className={classes.label}>MOW - HKT</span>
        <br />
        <span className={classes.text}>11:20 - 00:50</span>
      </div>
      <div className={classes.voyageCell}>
        <span className={classes.label}>В пути</span>
        <br />
        <span className={classes.text}>13ч 30м</span>
      </div>
      <div className={classes.voyageCell}>
        <span className={classes.label}>1 пересадка</span>
        <br />
        <span className={classes.text}>HKG</span>
      </div>
    </div>
  );
}
