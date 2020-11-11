import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Dropdown = ({ children, closeHandler }) => {
  useEffect(() => {
    const clickOutside = ({ target }) => {
      if (target.closest('.comment-dropdown')) return;
      closeHandler();
    };
    document.addEventListener('click', clickOutside);
    return () => document.removeEventListener('click', clickOutside);
  }, []);

  return <Wrapper className='comment-dropdown'>{children}</Wrapper>;
};

Dropdown.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.string, PropTypes.number]),
  closeHandler: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  children: '',
};

const Wrapper = styled.div`
  position: absolute;
  width: 150px;
  right: 0;
  top: 100%;
  padding: 4px 0;
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  color: ${({ theme }) => theme.color.secondaryTextColor};
  background-color: ${({ theme }) => theme.color.whiteColor};
  border-radius: 6px;
  cursor: auto;
  z-index: 1;
  &:before {
    top: -16.5px;
    right: 9px;
    left: auto;
    border: 8px solid transparent;
    border-bottom: 8px solid ${({ theme }) => theme.color.borderColor};
    position: absolute;
    display: inline-block;
    content: '';
  }
  &:after {
    top: -14px;
    right: 10px;
    left: auto;
    border: 7px solid transparent;
    border-bottom: 7px solid ${({ theme }) => theme.color.whiteColor};
    position: absolute;
    display: inline-block;
    content: '';
  }
`;

export default Dropdown;
