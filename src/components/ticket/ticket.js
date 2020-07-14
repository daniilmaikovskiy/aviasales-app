import React from 'react';
import PropTypes from 'prop-types';
import classes from './ticket.module.scss';
import Picture from '../picture';

export default function Ticket({ price, img, to, from }) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.cost}>
        <div className={classes.cell}>{price} P</div>
      </div>
      <Picture className={classes.logo} src={img} />
      <div className={classes.voyageCell}>
        <span className={classes.label}>
          {to.origin} - {to.destination}
        </span>
        <span className={classes.text}>{to.timeInterval}</span>
      </div>
      <div className={classes.voyageCell}>
        <span className={classes.label}>В пути</span>
        <span className={[classes.text, classes.duration].join(' ')}>{to.duration}</span>
      </div>
      <div className={classes.voyageCell}>
        <span className={classes.label}>{to.transfersCount}</span>
        <span className={classes.text}>{to.transfers}</span>
      </div>
      <div className={classes.voyageCell}>
        <span className={classes.label}>
          {from.origin} - {from.destination}
        </span>
        <span className={classes.text}>{from.timeInterval}</span>
      </div>
      <div className={classes.voyageCell}>
        <span className={classes.label}>В пути</span>
        <span className={[classes.text, classes.duration].join(' ')}>{from.duration}</span>
      </div>
      <div className={classes.voyageCell}>
        <span className={classes.label}>{from.transfersCount}</span>
        <span className={classes.text}>{from.transfers}</span>
      </div>
    </div>
  );
}

Ticket.propTypes = {
  price: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,

  to: PropTypes.shape({
    origin: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    timeInterval: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    transfersCount: PropTypes.string.isRequired,
    transfers: PropTypes.string.isRequired,
  }).isRequired,

  from: PropTypes.shape({
    origin: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    timeInterval: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    transfersCount: PropTypes.string.isRequired,
    transfers: PropTypes.string.isRequired,
  }).isRequired,
};
