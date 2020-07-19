import { PAGE_ITEMS_NUMBER } from '../settings';

const calculatedTotalPages = (totalPages) => {
  return {
    type: 'CALCULATED_TOTAL_PAGES',
    totalPages,
  };
};

const calculatingTotalPages = () => {
  return (dispatch, getState) => {
    const { filteredTickets } = getState().queryTickets;
    const totalPages = Math.ceil(filteredTickets.length / PAGE_ITEMS_NUMBER);

    dispatch(calculatedTotalPages(totalPages));
  };
};

export default calculatingTotalPages;
