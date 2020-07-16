import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import customPropTypes from '../../custom-prop-types';
import classes from './tickets.module.scss';
import Switch from '../switch';
import Ticket from '../ticket';
import AviasalesServiceContext from '../aviasales-service-context';
import actions from '../../actions/actions';
import Spinner from '../spinner';
import PageController from '../page-controller';

const Tickets = ({
  tickets,
  visibleTickets,
  stop,
  loadingTickets,
  changingPage,
  totalPages,
  page,
}) => {
  const aviasalesService = useContext(AviasalesServiceContext);

  useEffect(() => {
    loadingTickets(aviasalesService);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ticketsArray = visibleTickets.map(({ price, carrier, to, from, id }) => {
    return <Ticket key={id} price={price} carrier={carrier} to={to} from={from} />;
  });
  const ticketsLoading = !tickets.length || (page !== 1 && !stop);

  return (
    <div className={classes.wrapper}>
      <Switch />
      <div className={classes.ticketArray}>{ticketsLoading ? <Spinner /> : ticketsArray}</div>
      <div className={classes.pagination}>
        <PageController total={totalPages} onChange={changingPage} current={page} />
      </div>
    </div>
  );
};

Tickets.propTypes = {
  stop: PropTypes.bool.isRequired,
  loadingTickets: PropTypes.func.isRequired,
  changingPage: PropTypes.func.isRequired,
  tickets: PropTypes.arrayOf(customPropTypes.ticket).isRequired,
  visibleTickets: PropTypes.arrayOf(customPropTypes.ticket).isRequired,
  totalPages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  return {
    tickets: state.queryTickets.data,
    stop: state.queryTickets.stop,
    visibleTickets: state.queryTickets.visibleTickets,
    totalPages: state.pagination.totalPages,
    page: state.pagination.page,
  };
};

export default connect(mapStateToProps, actions)(Tickets);
