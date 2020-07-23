import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from './ticket-array.module.scss';
import getPreparedVisibleTickets from './get-prepared-visible-tickets';
import getFilteredTickets from './get-filtered-tickets';
import getTicketsWithSortedFragment from './get-tickets-with-sorted-fragment';
import Spinner from '../spinner';
import ErrorAlert from '../error-alert';
import Ticket from '../ticket';
import AviasalesServiceContext from '../aviasales-service-context';
import actions from '../../actions/actions';

const TicketArray = () => {
  const aviasalesService = useContext(AviasalesServiceContext);
  const dispatch = useDispatch();

  const page = useSelector(({ pagination }) => pagination.page);
  const transfersFilter = useSelector(({ transfersFilter: filter }) => filter);

  const tickets = useSelector(({ queryTickets }) => queryTickets.data);
  const filteredTickets = useSelector(({ queryTickets, transfersFilter: filter, switchKeys }) => {
    const filtered = getFilteredTickets(queryTickets.data, filter);

    if (!queryTickets.stop) {
      return getTicketsWithSortedFragment(filtered, switchKeys);
    }

    return filtered;
  });
  const visibleTickets = useSelector(({ pagination }) =>
    getPreparedVisibleTickets(filteredTickets, pagination.page)
  );

  const error = useSelector(({ queryTickets }) => queryTickets.error);
  const stop = useSelector(({ queryTickets }) => queryTickets.stop);

  useEffect(() => {
    dispatch(actions.loadingTickets(aviasalesService));
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

export default TicketArray;
