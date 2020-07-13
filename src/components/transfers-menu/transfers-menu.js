import React from 'react';
import classes from './transfers-menu.module.scss';
import CustomCheckbox from '../custom-checkbox';

export default function TransfersMenu() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.menu}>
        <div className={`${classes.title} ${classes.row}`}>Количество пересадок</div>
        <CustomCheckbox className={classes.row} name="all" text="Все" />
        <CustomCheckbox className={classes.row} name="no-transfers" text="Без пересадок" />
        <CustomCheckbox className={classes.row} name="one-transfer" text="1 пересадка" />
        <CustomCheckbox className={classes.row} name="two-transfers" text="2 пересадки" />
        <CustomCheckbox className={classes.row} name="three-transfers" text="3 пересадки" />
      </div>
    </div>
  );
}
