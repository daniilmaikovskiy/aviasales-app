const receivedSearchId = (id) => {
  return {
    type: 'RECEIVED_SEARCH_ID',
    payload: id,
  };
};

const errorOfReceivingSearchId = (message) => {
  return {
    type: 'ERROR_OF_RECEIVING_SEARCH_ID',
    message,
  };
};

const loadedSearchId = () => ({ type: 'LOADED_SEARCH_ID' });

const loadingSearchId = (aviasalesService) => {
  return (dispatch) => {
    aviasalesService
      .getSearchId()
      .then((searchId) => dispatch(receivedSearchId(searchId)))
      .catch((error) => dispatch(errorOfReceivingSearchId(error.message)))
      .finally(() => dispatch(loadedSearchId()));
  };
};

export default loadingSearchId;
