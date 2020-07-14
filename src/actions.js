const switchBtnPressed = (name) => {
  return {
    type: 'SWITCH_BTN_PRESSED',
    name,
  };
};

const transfersCheckboxChecked = (name) => {
  return {
    type: 'TRANSFERS_CHECKBOX_CHECKED',
    name,
  };
};

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

const startOfLoadingSearchId = (aviasalesService) => {
  return (dispatch) => {
    aviasalesService
      .getSearchId()
      .then((searchId) => dispatch(receivedSearchId(searchId)))
      .catch((error) => dispatch(errorOfReceivingSearchId(error.message)))
      .finally(() => dispatch(loadedSearchId()));
  };
};

const receivedTickets = (data) => {
  return {
    type: 'RECEIVED_TICKETS',
    payload: data,
  };
};

const errorOfReceivingTickets = () => ({ type: 'ERROR_OF_RECEIVING_TICKETS' });

const loadingTickets = (aviasalesService, searchId) => {
  return (dispatch) => {
    aviasalesService
      .getTickets(searchId)
      .then((data) => dispatch(receivedTickets(data)))
      .catch(() => dispatch(errorOfReceivingTickets()));
  };
};

const actions = {
  switchBtnPressed,
  transfersCheckboxChecked,
  startOfLoadingSearchId,
  loadingTickets,
};

export default actions;
