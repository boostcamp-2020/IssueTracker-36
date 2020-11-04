/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Label = ({ text, color, bg }) => (
  <LabelWrapper color={color} bg={bg}>
    {text}
  </LabelWrapper>
);

Label.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  bg: PropTypes.string,
};
Label.defaultProps = {
  color: 'white',
  bg: 'red',
};

const LabelWrapper = styled.div`
  display: inline-box;
  font-weight: bold;
  padding: 4px 7px;
  font-size: 12px;
  margin: 2px;
  text-align: center;
  border-radius: 4px;
  white-space: nowrap;
  color: ${(props) => props.color || 'white'};
  background-color: ${(props) => props.bg || 'white'};
`;
export default Label;
