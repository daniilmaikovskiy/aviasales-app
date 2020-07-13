import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classes from './app.module.scss';
import Picture from '../picture';
import MainGrid from '../main-grid';
import AviasalesServiceContext from '../aviasales-service-context';
import actions from '../../actions';
import ErrorAlert from '../error-alert';
import Spinner from '../spinner';

const App = ({ querySearchId, startOfLoadingSearchId }) => {
  const aviasalesService = useContext(AviasalesServiceContext);

  useEffect(() => {
    startOfLoadingSearchId(aviasalesService);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (querySearchId.error) {
    return <ErrorAlert description={querySearchId.errorMessage} />;
  }

  if (querySearchId.loading) {
    return <Spinner />;
  }

  return (
    <div className={classes.wrapper}>
      <Picture className={classes.logo} />
      <MainGrid />
    </div>
  );
};

App.propTypes = {
  startOfLoadingSearchId: PropTypes.func.isRequired,
  querySearchId: PropTypes.shape({
    id: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => {
  return {
    querySearchId: state.querySearchId,
  };
};

export default connect(mapStateToProps, actions)(App);
