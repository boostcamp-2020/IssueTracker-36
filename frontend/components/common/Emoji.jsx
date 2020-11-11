import React from 'react';
import PropTypes from 'prop-types';

const Emoji = ({ className, label, hexCode }) => (
  <span className={className} role='img' aria-label={label}>
    {String.fromCodePoint(hexCode)}
  </span>
);

Emoji.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  hexCode: PropTypes.string.isRequired,
};

Emoji.defaultProps = {
  className: '',
  label: '',
};

export default Emoji;
