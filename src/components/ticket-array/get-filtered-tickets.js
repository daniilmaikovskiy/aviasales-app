const ALL_TRANSFERS_FILTER_VALUES = [
  'no-transfers',
  'one-transfer',
  'two-transfers',
  'three-transfers',
];

const translateTransfersFilterToNumbers = (transfersFilter) => {
  if (transfersFilter[0] === 'all') {
    return ALL_TRANSFERS_FILTER_VALUES.map((el, i) => i);
  }

  return transfersFilter.reduce((acc, el) => {
    const index = ALL_TRANSFERS_FILTER_VALUES.findIndex((findIndexEl) => el === findIndexEl);

    if (index === -1) {
      return acc;
    }

    return [...acc, index];
  }, []);
};

const getFilteredTickets = (tickets, transfersFilter) => {
  const arrayOfTransfersNumber = translateTransfersFilterToNumbers(transfersFilter);
  return tickets.filter(({ segments }) => {
    {
      const isFit = arrayOfTransfersNumber.some((el) => el === segments[0].stops.length);

      if (!isFit) {
        return false;
      }
    }
    {
      const isFit = arrayOfTransfersNumber.some((el) => el === segments[1].stops.length);

      if (!isFit) {
        return false;
      }
    }

    return true;
  });
};

export default getFilteredTickets;
