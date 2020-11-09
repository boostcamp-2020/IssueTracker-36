import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RiCloseLine } from 'react-icons/ri';

const Dropdown = ({ title, isInputExist, dataInDiv }) => {
  return (
    <DropdownWrapper>
      <Header>
        <Title>{title}</Title>
        <RiCloseLine />
      </Header>
      {isInputExist && (
        <SearchWrapper>
          <Search />
        </SearchWrapper>
      )}
      {dataInDiv.map((data) => (
        <Option>{data}</Option>
      ))}
    </DropdownWrapper>
  );
};

const DropdownWrapper = styled.div`
  width: 300px;
  margin: 0;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 0 3px gray;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 15px;
  border-bottom: 1px solid ${({ theme }) => theme.color.borderColor};
  svg {
    color: ${({ theme }) => theme.color.iconColor};
    cursor: pointer;
    &:hover {
      color: black;
    }
  }
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: bold;
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 5px 0;
`;

const Search = styled.input`
  width: 95%;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  border-radius: 5px;
  &:focus {
    box-shadow: 0 0 2px ${({ theme }) => theme.color.blueColor};
  }
`;

const Option = styled.div`
  padding: 8px 20px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: bold;
  border-top: 1px solid ${({ theme }) => theme.color.borderColor};
  &:hover {
    background-color: ${({ theme }) => theme.color.hoverBgColor};
    cursor: pointer;
  }
`;

Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  isInputExist: PropTypes.bool.isRequired,
  dataInDiv: PropTypes.array,
};

Dropdown.defaultProps = {
  dataInDiv: [],
};

export default Dropdown;
