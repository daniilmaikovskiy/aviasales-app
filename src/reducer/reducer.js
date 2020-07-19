export default function reducer(
  state = {
    switchKeys: ['cheapest'],
    transfersFilter: ['no-transfers'],
    querySearchId: {
      id: '',
      loading: true,
      error: false,
      errorMessage: '',
    },
    queryTickets: {
      stop: false,
      error: false,
      data: [],
      maxId: 1,
      visibleTickets: [],
      filteredTickets: [],
    },
    pagination: {
      page: 1,
      totalPages: 0,
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
    case 'ERROR_404_OF_RECEIVING_TICKETS':
      return {
        ...state,
        queryTickets: { ...state.queryTickets, stop: true, error: true },
      };
    // case 'ERROR_500_OF_RECEIVING_TICKETS':
    //   return {
    //     ...state,
    //     queryTickets: { ...state.queryTickets, stop: true, error: true },
    //   };
    case 'CHANGED_VISIBLE_TICKETS':
      return {
        ...state,
        queryTickets: { ...state.queryTickets, visibleTickets: [...action.tickets] },
      };
    case 'CALCULATED_TOTAL_PAGES':
      return { ...state, pagination: { ...state.pagination, totalPages: action.totalPages } };
    case 'CHANGED_PAGE':
      return { ...state, pagination: { ...state.pagination, page: action.page } };
    case 'SORTED_TICKETS':
      return { ...state, queryTickets: { ...state.queryTickets, data: action.tickets } };
    case 'SORTED_TICKETS_FRAGMENT':
      return { ...state, queryTickets: { ...state.queryTickets, data: action.tickets } };
    case 'IS_FILTERED_TICKETS':
      return { ...state, queryTickets: { ...state.queryTickets, filteredTickets: action.tickets } };
    default:
      return state;
  }
}
