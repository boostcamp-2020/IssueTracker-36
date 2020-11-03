import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TabEachComponent = ({ currentPage, info }) => {
  const isSelected = currentPage === info.name;

  return (
    <Wrapper isSelected={isSelected}>
      <info.image style={{ color: isSelected ? 'white' : '' }} />
      <Title isSelected={isSelected}>{info.name}</Title>
      {!currentPage && (
        <NumberWrapper>
          <EachNumber>{info.number}</EachNumber>
        </NumberWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 6px 18px;
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  border-radius: 3px;
  background-color: ${(props) => (props.isSelected ? props.theme.color.blueColor : '')};
  > div {
    margin-left: 5px;
  }
  &:hover {
    cursor: pointer;
    background-color: ${(props) => (props.isSelected ? '' : props.theme.color.hoverBgColor)};
  }
`;

const Title = styled.div`
  color: ${(props) => (props.isSelected ? 'white' : props.theme.color.textColor)};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: bold;
`;

const NumberWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: max-content;
  min-width: 20px;
  padding: 3px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.borderColor};
`;

const EachNumber = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: bold;
  line-height: 0;
`;

TabEachComponent.propTypes = {
  currentPage: PropTypes.string.isRequired,
  info: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.func.isRequired,
    number: PropTypes.number.isRequired,
  }).isRequired,
};

export default TabEachComponent;
