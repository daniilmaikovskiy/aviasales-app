const changedPage = (page) => {
  return {
    type: 'CHANGED_PAGE',
    page,
  };
};

const changingPage = (page) => {
  return (dispatch) => {
    dispatch(changedPage(page));
  };
};

export default changingPage;
