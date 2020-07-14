import PropTypes from 'prop-types';

const ticketSegment = PropTypes.shape({
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  timeInterval: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  transfersCount: PropTypes.string.isRequired,
  transfers: PropTypes.string.isRequired,
});

const ticket = PropTypes.shape({
  price: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  to: ticketSegment.isRequired,
  from: ticketSegment.isRequired,
});

const customPropTypes = {
  ticketSegment,
  ticket,
};

export default customPropTypes;
