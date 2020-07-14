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
  changingVisibleTickets,
  calculatingTotalPages,
  changedPage,
  totalPages,
  page,
}) => {
  const aviasalesService = useContext(AviasalesServiceContext);

  useEffect(() => {
    if (!stop) {
      loadingTickets(aviasalesService);
      changingVisibleTickets();
      calculatingTotalPages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickets]);

  useEffect(() => {
    changingVisibleTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const ticketsArray = visibleTickets.map(({ price, img, to, from, id }) => {
    return <Ticket key={id} price={price} img={img} to={to} from={from} />;
  });

  return (
    <div className={classes.wrapper}>
      <Switch />
      <div className={classes.ticketArray}>{tickets.length ? ticketsArray : <Spinner />}</div>
      <div className={classes.pagination}>
        <PageController
          total={totalPages}
          onChange={(e) => {
            changedPage(e);
          }}
          current={page}
        />
      </div>
    </div>
  );
};

Tickets.propTypes = {
  stop: PropTypes.bool.isRequired,
  loadingTickets: PropTypes.func.isRequired,
  changingVisibleTickets: PropTypes.func.isRequired,
  calculatingTotalPages: PropTypes.func.isRequired,
  changedPage: PropTypes.func.isRequired,
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
