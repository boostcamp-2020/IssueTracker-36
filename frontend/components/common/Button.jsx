import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = ({ size, type, role, text, icon, count, disabled }) => {
  const sizeClass = size === 'large' ? 'lg-btn' : 'sm-btn';
  const typeClass = type === 'primary' ? 'primary-btn' : 'secondary-btn';

  return (
    <ButtonWrapper type={role} className={`${sizeClass} ${typeClass}`} disabled={disabled}>
      {icon && <Icon>{icon}</Icon>}
      <Text>{text}</Text>
      {count && <Counter>{count}</Counter>}
    </ButtonWrapper>
  );
};

Button.propTypes = {
  size: PropTypes.oneOf(['large', 'small']),
  type: PropTypes.oneOf(['primary', 'secondary']),
  role: PropTypes.oneOf(['button', 'submit']),
  text: PropTypes.string,
  icon: PropTypes.element,
  count: PropTypes.number,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  size: 'small',
  type: 'primary',
  role: 'button',
  text: '',
  icon: null,
  count: null,
  disabled: false,
};

const ButtonWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  border-radius: 6px;
  line-height: 20px;
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  white-space: nowrap;
  vertical-align: middle;
  transition: background-color ease 0.1s;

  &.primary-btn {
    background-color: ${({ theme }) => theme.color.greenColor};
    color: ${({ theme }) => theme.color.whiteColor};
    &:hover {
      background-color: ${({ theme }) => theme.color.darkGreenColor};
    }
  }
  &.secondary-btn {
    background-color: ${({ theme }) => theme.color.shadeBgColor};
    color: ${({ theme }) => theme.color.textColor};
    &:hover {
      background-color: ${({ theme }) => theme.color.hoverBgColor};
    }
  }
  &.sm-btn {
    padding: 3px 12px;
    font-size: ${({ theme }) => theme.fontSize.sm};
    svg {
      width: 14px;
      height: 14px;
    }
  }
  &.lg-btn {
    padding: 5px 16px;
    font-size: ${({ theme }) => theme.fontSize.md};
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const Text = styled.span`
  display: inline-block;
  text-align: center;
  flex: 1;
`;

const Icon = styled.span`
  margin-right: 4px;
  vertical-align: text-bottom;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 20px;
`;

const Counter = styled.span`
  display: inline-block;
  padding: 0px 6px;
  background-color: ${({ theme }) => theme.color.counterBgColor};
  border-radius: 2rem;
  margin-left: 4px;

  ${ButtonWrapper}.sm-btn & {
    height: 16px;
    line-height: 16px;
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
  ${ButtonWrapper}.lg-btn & {
    height: 18px;
    line-height: 18px;
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

export default Button;
