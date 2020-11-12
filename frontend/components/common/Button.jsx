import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**
 * 기본 버튼 컴포넌트입니다.
 */
const Button = ({ size, type, role, text, icon, count, disabled, onClick, children, style }) => {
  const sizeClass = size === 'large' ? 'lg-btn' : 'sm-btn';
  const typeClass = `${type}-btn`;

  return (
    <ButtonWrapper
      type={role}
      className={`${sizeClass} ${typeClass}`}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      {icon && <Icon>{icon}</Icon>}
      <Text>{text}</Text>
      {children}
      {count && <Counter>{count}</Counter>}
    </ButtonWrapper>
  );
};

Button.propTypes = {
  size: PropTypes.oneOf(['large', 'small']),
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  role: PropTypes.oneOf(['button', 'submit']),
  text: PropTypes.string,
  icon: PropTypes.element,
  count: PropTypes.number,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
  children: PropTypes.element,
};

Button.defaultProps = {
  size: 'small',
  type: 'primary',
  role: 'button',
  text: '',
  icon: null,
  count: null,
  disabled: false,
  onClick: undefined,
  style: {},
  children: undefined,
};

const ButtonWrapper = styled.button`
  display: inline-flex;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  white-space: nowrap;
  transition: background-color ease 0.1s;
  font-weight: 500;
  line-height: 20px;

  &.primary-btn {
    background-color: ${({ theme }) => theme.color.greenColor};
    color: ${({ theme }) => theme.color.whiteColor};
    &:not(:disabled):hover {
      background-color: ${({ theme }) => theme.color.lightGreenColor};
    }
    &:disabled {
      cursor: not-allowed;
      filter: saturate(0.8) brightness(1.3);
    }
  }
  &.secondary-btn {
    background-color: ${({ theme }) => theme.color.shadeBgColor};
    color: ${({ theme }) => theme.color.textColor};
    &:not(:disabled):hover {
      background-color: ${({ theme }) => theme.color.hoverBgColor};
    }
    &:disabled {
      cursor: not-allowed;
      filter: saturate(1) brightness(0.9);
    }
  }
  &.tertiary-btn {
    background-color: ${({ theme }) => theme.color.blueColor};
    color: ${({ theme }) => theme.color.whiteColor};
    &:not(:disabled):hover {
      background-color: ${({ theme }) => theme.color.lightBlueColor};
    }
    &:disabled {
      cursor: not-allowed;
      filter: saturate(0.8) brightness(1.3);
    }
  }
  &.sm-btn {
    padding: 3px 12px;
    font-size: ${({ theme }) => theme.fontSize.xs};
    svg {
      width: 14px;
      height: 14px;
    }
  }
  &.lg-btn {
    padding: 5px 16px;
    font-size: ${({ theme }) => theme.fontSize.sm};
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
  font-size: ${({ theme }) => theme.fontSize.xs};
  min-width: 20px;
  line-height: 18px;
  text-align: center;
  border: 1px solid transparent;

  ${ButtonWrapper}.sm-btn & {
    height: 17px;
    line-height: 17px;
  }
  ${ButtonWrapper}.lg-btn & {
    height: 18px;
    line-height: 18px;
  }
`;

export default Button;
