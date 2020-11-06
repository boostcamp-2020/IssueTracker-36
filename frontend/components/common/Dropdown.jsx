import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RiCloseLine } from 'react-icons/ri';

const Dropdown = ({ title, isInputExist, dataInDiv, toggleDropdown }) => {
  const wrapper = useRef(undefined);

  useEffect(() => {
    const clickOutside = (e) => {
      if (!wrapper.current?.contains(e.target)) toggleDropdown();
    };
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('click', clickOutside);
    };
  }, []);

  return (
    <DropdownWrapper ref={wrapper}>
      <Header>
        <Title>{title}</Title>
        <RiCloseLine onClick={toggleDropdown} />
      </Header>
      {isInputExist && (
        <SearchWrapper>
          <Search />
        </SearchWrapper>
      )}
      {dataInDiv.map(({ id, div }) => (
        <Option key={id}>{div}</Option>
      ))}
    </DropdownWrapper>
  );
};

const DropdownWrapper = styled.div`
  position: absolute;
  width: 280px;
  margin-top: 25px;
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
  font-size: ${({ theme }) => theme.fontSize.xs};
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
  toggleDropdown: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  dataInDiv: [],
};

export default Dropdown;
