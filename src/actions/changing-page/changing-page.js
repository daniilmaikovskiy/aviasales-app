import changingVisibleTickets from '../changing-visible-tickets/changing-visible-tickets';

const changedPage = (page) => {
  return {
    type: 'CHANGED_PAGE',
    page,
  };
};

const changingPage = (page) => {
  return (dispatch) => {
    dispatch(changedPage(page));
    dispatch(changingVisibleTickets());
  };
};

export default changingPage;
