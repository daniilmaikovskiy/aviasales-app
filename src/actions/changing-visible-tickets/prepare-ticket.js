const getTransfersCountString = (value) => {
  switch (value) {
    case 0:
      return 'Без пересадок';
    case 1:
      return '1 пересадка';
    case 2:
      return '2 пересадки';
    case 3:
      return '3 пересадки';
    default:
      throw new Error('unexpected value');
  }
};

const formatDate = (dateObj) => {
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  return `${(hours < 10 ? '0' : '') + hours}:${(minutes < 10 ? '0' : '') + minutes}`;
};

const formatDuration = (durationInMinutes) => {
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  return `${hours}ч ${minutes}м`;
};

const calculateNewDate = (dateObj, durationInMinutes) => {
  const durationInMilliseconds = durationInMinutes * 60 * 1000;
  const result = new Date(dateObj.valueOf() + durationInMilliseconds);

  return result;
};

const prepareTicket = ({ price, carrier, segments, id }) => {
  const dateObjTo = new Date(segments[0].date);
  const dateObjFrom = new Date(segments[1].date);

  const dateObjToPlusDuration = calculateNewDate(dateObjTo, segments[0].duration);
  const dateObjFromPlusDuration = calculateNewDate(dateObjFrom, segments[1].duration);

  const timeIntervalTo = `${formatDate(dateObjTo)} - ${formatDate(dateObjToPlusDuration)}`;
  const timeIntervalFrom = `${formatDate(dateObjFrom)} - ${formatDate(dateObjFromPlusDuration)}`;

  const to = {
    origin: segments[0].origin,
    destination: segments[0].destination,
    timeInterval: timeIntervalTo,
    duration: formatDuration(segments[0].duration),
    transfersCount: getTransfersCountString(segments[0].stops.length),
    transfers: segments[0].stops,
  };
  const from = {
    origin: segments[1].origin,
    destination: segments[1].destination,
    timeInterval: timeIntervalFrom,
    duration: formatDuration(segments[1].duration),
    transfersCount: getTransfersCountString(segments[1].stops.length),
    transfers: segments[1].stops,
  };

  return { price, carrier, to, from, id };
};

export default prepareTicket;
