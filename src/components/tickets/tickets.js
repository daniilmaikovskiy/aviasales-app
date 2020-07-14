import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classes from './tickets.module.scss';
import Switch from '../switch';
import Ticket from '../ticket';
import AviasalesServiceContext from '../aviasales-service-context';
import actions from '../../actions';

const Tickets = ({ searchId, tickets, stop, loadingTickets }) => {
  const aviasalesService = useContext(AviasalesServiceContext);

  useEffect(() => {
    if (!stop) {
      loadingTickets(aviasalesService, searchId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickets, stop]);

  const visibleTickets = tickets.slice(0, 5).map(({ price, carrier, segments }) => {
    return <Ticket price={price} carrier={carrier} to={segments[0]} from={segments[1]} />;
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
