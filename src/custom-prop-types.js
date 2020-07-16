import PropTypes from 'prop-types';

const preparedTicketSegment = PropTypes.shape({
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  timeInterval: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  transfersCount: PropTypes.string.isRequired,
  transfers: PropTypes.arrayOf(String).isRequired,
});

const ticketSegment = PropTypes.shape({
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  stops: PropTypes.arrayOf(String).isRequired,
  duration: PropTypes.number.isRequired,
});

const ticket = PropTypes.shape({
  id: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  carrier: PropTypes.string.isRequired,
  fullDuration: PropTypes.number.isRequired,
  segments: PropTypes.arrayOf(ticketSegment).isRequired,
});

const preparedTicket = PropTypes.shape({
  id: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  carrier: PropTypes.string.isRequired,
  to: preparedTicketSegment.isRequired,
  from: preparedTicketSegment.isRequired,
});

const customPropTypes = {
  preparedTicketSegment,
  ticketSegment,
  ticket,
  preparedTicket,
};

export default customPropTypes;
