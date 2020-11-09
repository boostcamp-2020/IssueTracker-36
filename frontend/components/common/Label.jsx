/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import fontColorContrast from 'font-color-contrast';

const Label = ({ text, color, bg, icon }) => (
  <LabelWrapper color={color || fontColorContrast(bg)} bg={bg || 'red'} >
    {icon && <Icon>{icon}</Icon>}
    {text}
  </LabelWrapper>
);

Label.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  bg: PropTypes.string,
  icon: PropTypes.element,
};
Label.defaultProps = {
  bg: undefined,
  color: undefined,
  icon: null,
};

const LabelWrapper = styled.div`
  display: inline-block;
  vertical-align: baseline;
  margin: 2px;
  text-align: center;
  white-space: nowrap;
  color: ${(props) => props.color || 'white'};
  background-color: ${(props) => props.bg || 'white'};
  padding: 0 10px;
  font-size: 12px;
  font-weight: 600;
  line-height: 22px !important;
  border: 1px solid transparent;
  border-radius: 2em;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji;
`;
const Icon = styled.span`
  margin-right: 4px;
  vertical-align: text-bottom;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

export default Label;
