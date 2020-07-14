import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classes from './tickets.module.scss';
import Switch from '../switch';
import Ticket from '../ticket';
import AviasalesServiceContext from '../aviasales-service-context';
import actions from '../../actions/actions';
import Spinner from '../spinner';

const Tickets = ({ searchId, tickets, stop, loadingTickets }) => {
  const aviasalesService = useContext(AviasalesServiceContext);

  useEffect(() => {
    if (!stop) {
      loadingTickets(aviasalesService, searchId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickets]);

  const visibleTickets = tickets.slice(0, 5).map(({ price, img, to, from, id }) => {
    return <Ticket key={id} price={price} img={img} to={to} from={from} />;
  });

  return (
    <div className={classes.wrapper}>
      <Switch />
      <div className={classes.ticketArray}>{tickets.length ? visibleTickets : <Spinner />}</div>
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
