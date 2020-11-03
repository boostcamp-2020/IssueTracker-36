import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TabEachComponent = ({ currentPage, info }) => {
  return (
    <Wrapper>
      <info.image />
      <Title>{info.name}</Title>
      <NumberWrapper>
        <EachNumber>{info.number}</EachNumber>
      </NumberWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  border-radius: 2px;
  > div {
    margin-left: 5px;
  }
`;

const Title = styled.div`
  color: ${({ theme }) => theme.color.textColor};
`;

const NumberWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.borderColor};
`;

const EachNumber = styled.div`
  font-size: 0.8rem;
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
