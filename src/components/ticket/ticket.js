import React from 'react';
import PropTypes from 'prop-types';
import classes from './ticket.module.scss';
import Picture from '../picture';

const createImgUrl = (carrier) => {
  const imagesUrl = 'https://pics.avs.io/99/36/';
  const imagesExtension = 'png';

  return `${imagesUrl}${carrier}.${imagesExtension}`;
};

const transfersText = (value) => {
  switch (value) {
    case 0:
      return 'Без пересадок';
    case 1:
      return '1 пересадка';
    case 2:
      return '2 пересадки';
    case 3:
      return '3 пересадки';
    default:
      throw new Error('unexpected value');
  }
};

const formatDate = (dateObj) => {
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  return `${(hours < 10 ? '0' : '') + hours}:${(minutes < 10 ? '0' : '') + minutes}`;
};

const formatDuration = (durationInMinutes) => {
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  return `${hours}ч ${minutes}м`;
};

const calculateNewDate = (dateObj, durationInMinutes) => {
  const durationInMilliseconds = durationInMinutes * 60 * 1000;
  const result = new Date(dateObj.valueOf() + durationInMilliseconds);

  return result;
};

export default function Ticket({ price, carrier, to, from }) {
  const dateObjTo = new Date(to.date);
  const dateObjFrom = new Date(from.date);

  const dateObjToPlusDuration = calculateNewDate(dateObjTo, to.duration);
  const dateObjFromPlusDuration = calculateNewDate(dateObjFrom, from.duration);

  const timeToString = `${formatDate(dateObjTo)} - ${formatDate(dateObjToPlusDuration)}`;
  const timeFromString = `${formatDate(dateObjFrom)} - ${formatDate(dateObjFromPlusDuration)}`;

  return (
    <div className={classes.wrapper}>
      <div className={classes.cost}>
        <div className={classes.cell}>{price} P</div>
      </div>
      <Picture className={classes.logo} src={createImgUrl(carrier)} />
      <div className={classes.voyageCell}>
        <span className={classes.label}>
          {to.origin} - {to.destination}
        </span>
        <span className={classes.text}>{timeToString}</span>
      </div>
      <div className={classes.voyageCell}>
        <span className={classes.label}>В пути</span>
        <span className={[classes.text, classes.duration].join(' ')}>
          {formatDuration(to.duration)}
        </span>
      </div>
      <div className={classes.voyageCell}>
        <span className={classes.label}>{transfersText(to.stops.length)}</span>
        <span className={classes.text}>{to.stops.join(', ')}</span>
      </div>
      <div className={classes.voyageCell}>
        <span className={classes.label}>MOW - HKT</span>
        <span className={classes.text}>{timeFromString}</span>
      </div>
      <div className={classes.voyageCell}>
        <span className={classes.label}>В пути</span>
        <span className={[classes.text, classes.duration].join(' ')}>
          {formatDuration(from.duration)}
        </span>
      </div>
      <div className={classes.voyageCell}>
        <span className={classes.label}>{transfersText(from.stops.length)}</span>
        <span className={classes.text}>{from.stops.join(', ')}</span>
      </div>
    </div>
  );
}

Ticket.propTypes = {
  price: PropTypes.number.isRequired,
  carrier: PropTypes.string.isRequired,

  to: PropTypes.shape({
    origin: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    stops: PropTypes.arrayOf(String).isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,

  from: PropTypes.shape({
    origin: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    stops: PropTypes.arrayOf(String).isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,
};
