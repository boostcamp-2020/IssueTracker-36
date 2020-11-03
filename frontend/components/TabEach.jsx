import React from 'react';
import PropTypes from 'prop-types';

const TabEachComponent = ({ currentPage, info }) => {
  return <></>;
};

TabEachComponent.propTypes = {
  currentPage: PropTypes.string.isRequired,
  info: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.element.isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
};

export default TabEachComponent;
