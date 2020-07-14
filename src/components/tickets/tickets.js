import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classes from './tickets.module.scss';
import Switch from '../switch';
import Ticket from '../ticket';
import AviasalesServiceContext from '../aviasales-service-context';
import actions from '../../actions';

const createImgUrl = (carrier) => {
  const imagesUrl = 'https://pics.avs.io/99/36/';
  const imagesExtension = 'png';

  return `${imagesUrl}${carrier}.${imagesExtension}`;
};

const getTransfersCountString = (value) => {
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

const Tickets = ({ searchId, tickets, stop, loadingTickets }) => {
  const aviasalesService = useContext(AviasalesServiceContext);

  useEffect(() => {
    if (!stop) {
      loadingTickets(aviasalesService, searchId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickets, stop]);

  const visibleTickets = tickets.slice(0, 5).map(({ price, carrier, segments }) => {
    const dateObjTo = new Date(segments[0].date);
    const dateObjFrom = new Date(segments[1].date);

    const dateObjToPlusDuration = calculateNewDate(dateObjTo, segments[0].duration);
    const dateObjFromPlusDuration = calculateNewDate(dateObjFrom, segments[1].duration);

    const timeIntervalTo = `${formatDate(dateObjTo)} - ${formatDate(dateObjToPlusDuration)}`;
    const timeIntervalFrom = `${formatDate(dateObjFrom)} - ${formatDate(dateObjFromPlusDuration)}`;

    const img = createImgUrl(carrier);
    const to = {
      origin: segments[0].origin,
      destination: segments[0].destination,
      timeInterval: timeIntervalTo,
      duration: formatDuration(segments[0].duration),
      transfersCount: getTransfersCountString(segments[0].stops.length),
      transfers: segments[0].stops.join(', '),
    };
    const from = {
      origin: segments[1].origin,
      destination: segments[1].destination,
      timeInterval: timeIntervalFrom,
      duration: formatDuration(segments[1].duration),
      transfersCount: getTransfersCountString(segments[1].stops.length),
      transfers: segments[1].stops.join(', '),
    };

    return <Ticket price={price} img={img} to={to} from={from} />;
  });

  return (
    <div className={classes.wrapper}>
      <Switch />
      <div className={classes.ticketArray}>{visibleTickets}</div>
    </div>
  );
};

Tickets.propTypes = {
  searchId: PropTypes.string.isRequired,
  stop: PropTypes.bool.isRequired,
  loadingTickets: PropTypes.func.isRequired,

  tickets: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number.isRequired,
      carrier: PropTypes.string.isRequired,

      segments: PropTypes.arrayOf(
        PropTypes.shape({
          origin: PropTypes.string.isRequired,
          destination: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
          stops: PropTypes.arrayOf(String).isRequired,
          duration: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

const mapStateToProps = (state) => {
  return {
    searchId: state.querySearchId.id,
    tickets: state.queryTickets.data,
    stop: state.queryTickets.stop,
  };
};

export default connect(mapStateToProps, actions)(Tickets);
