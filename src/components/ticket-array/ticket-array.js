import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import customPropTypes from '../../custom-prop-types';
import { wrapper } from './ticket-array.module.scss';
import Spinner from '../spinner';
import ErrorAlert from '../error-alert';
import Ticket from '../ticket';
import AviasalesServiceContext from '../aviasales-service-context';
import actions from '../../actions/actions';

const TicketArray = ({
  loadingTickets,
  tickets,
  visibleTickets,
  error,
  stop,
  page,
  filteredTickets,
  transfersFilter,
}) => {
  const aviasalesService = useContext(AviasalesServiceContext);

  useEffect(() => {
    loadingTickets(aviasalesService);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLoadingError = error && !tickets.length;

  if (isLoadingError) {
    return (
      <div className={wrapper}>
        <ErrorAlert description="Loading Error" />
      </div>
    );
  }

  const isEmptyFilteredTickets = !transfersFilter.length || (!filteredTickets.length && stop);

  if (isEmptyFilteredTickets) {
    return (
      <div className={wrapper}>
        <ErrorAlert description="Рейсов, подходящих под заданные фильтры, не найдено" />
      </div>
    );
  }

  const isTicketsLoading = !filteredTickets.length || (page !== 1 && !stop);

  if (isTicketsLoading) {
    return (
      <div className={wrapper}>
        <Spinner />
      </div>
    );
  }

  const ticketsArray = visibleTickets.map(({ price, carrier, to, from, id }) => {
    return <Ticket key={id} price={price} carrier={carrier} to={to} from={from} />;
  });

  return <div className={wrapper}>{ticketsArray}</div>;
};

TicketArray.propTypes = {
  stop: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  loadingTickets: PropTypes.func.isRequired,
  tickets: PropTypes.arrayOf(customPropTypes.ticket).isRequired,
  filteredTickets: PropTypes.arrayOf(customPropTypes.ticket).isRequired,
  visibleTickets: PropTypes.arrayOf(customPropTypes.preparedTicket).isRequired,
  transfersFilter: PropTypes.arrayOf(String).isRequired,
  page: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  return {
    tickets: state.queryTickets.data,
    stop: state.queryTickets.stop,
    error: state.queryTickets.error,
    visibleTickets: state.queryTickets.visibleTickets,
    filteredTickets: state.queryTickets.filteredTickets,
    transfersFilter: state.transfersFilter,
    page: state.pagination.page,
  };
};

export default connect(mapStateToProps, actions)(TicketArray);
