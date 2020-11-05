import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const TabButton = ({ currentPage, info }) => {
  const history = useHistory();
  const onClick = () => {
    if (currentPage !== info.url) history.push(info.url);
  };

  return (
    <Wrapper onClick={onClick} isSelected={info.isSelected}>
      <info.image style={{ color: info.isSelected ? 'white' : '' }} />
      <Title isSelected={info.isSelected}>{info.name}</Title>
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
  padding: 5px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.color.borderColor};
`;

const EachNumber = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: bold;
  line-height: 0;
`;

TabButton.propTypes = {
  currentPage: PropTypes.string.isRequired,
  info: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.func.isRequired,
    number: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TabButton;
