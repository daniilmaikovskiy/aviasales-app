export default function reducer(
  state = {
    switchKeys: ['cheapest'],
    transfersFilter: [],
    querySearchId: {
      id: '',
      loading: true,
      error: false,
      errorMessage: '',
    },
    queryTickets: {
      stop: false,
      data: [],
      maxId: 1,
    },
  },
  action
) {
  switch (action.type) {
    case 'PRESSED_SWITCH_BTN':
      return { ...state, switchKeys: action.switchKeys };
    case 'CHECKED_TRANSFERS_CHECKBOX': {
      return { ...state, transfersFilter: action.filter };
    }
    case 'RECEIVED_SEARCH_ID': {
      return { ...state, querySearchId: { ...state.querySearchId, id: action.payload } };
    }
    case 'ERROR_OF_RECEIVING_SEARCH_ID': {
      return {
        ...state,
        querySearchId: { ...state.querySearchId, error: true, errorMessage: action.message },
      };
    }
    case 'LOADED_SEARCH_ID':
      return { ...state, querySearchId: { ...state.querySearchId, loading: false } };
    case 'RECEIVED_TICKETS':
      return {
        ...state,
        queryTickets: {
          ...state.queryTickets,
          stop: action.stop,
          data: [...state.queryTickets.data, ...action.tickets],
          maxId: action.maxId,
        },
      };
    case 'ERROR_OF_RECEIVING_TICKETS':
      return {
        ...state,
        queryTickets: { ...state.queryTickets, data: [...state.queryTickets.data] },
      };
    default:
      return state;
  }
}
