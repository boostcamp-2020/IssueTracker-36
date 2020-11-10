import React from 'react';
import PropTypes from 'prop-types';

const Imoji = ({ className, label, hexCode }) => (
  <span className={className} role='img' aria-label={label}>
    {String.fromCodePoint(hexCode)}
  </span>
);

Imoji.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  hexCode: PropTypes.string.isRequired,
};

Imoji.defaultProps = {
  className: '',
  label: '',
};

export default Imoji;
