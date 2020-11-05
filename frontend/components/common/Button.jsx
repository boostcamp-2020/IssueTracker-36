import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**
 * 기본 버튼 컴포넌트입니다.
 */
const Button = ({ size, type, role, text, icon, count, disabled }) => {
  const sizeClass = size === 'large' ? 'lg-btn' : 'sm-btn';
  const typeClass = `${type}-btn`;

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
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
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
