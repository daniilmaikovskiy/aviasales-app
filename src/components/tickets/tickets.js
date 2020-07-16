import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classes from './tickets.module.scss';
import Switch from '../switch';
import actions from '../../actions/actions';
import PageController from '../page-controller';
import TicketArray from '../ticket-array';

const Tickets = ({ changingPage, totalPages, page }) => {
  return (
    <div className={classes.wrapper}>
      <Switch />
      <TicketArray />
      <div className={classes.pagination}>
        <PageController total={totalPages} onChange={changingPage} current={page} />
      </div>
    </div>
  );
};

Tickets.propTypes = {
  changingPage: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  return {
    totalPages: state.pagination.totalPages,
    page: state.pagination.page,
  };
};

export default connect(mapStateToProps, actions)(Tickets);
