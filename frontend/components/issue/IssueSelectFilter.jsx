import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dropdown from '@components/common/Dropdown';
import { RiArrowDownSFill } from 'react-icons/ri';

const IssueSelectFilter = ({ filterName }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <SelectFilter>
      <FilterButton onClick={toggleDropdown}>
        <FilterName>{filterName}</FilterName>
        <RiArrowDownSFill />
      </FilterButton>
      {showDropdown && <Dropdown title='제목' isInputExist toggleDropdown={toggleDropdown} />}
    </SelectFilter>
  );
};

const SelectFilter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 25px;
`;

const FilterButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${({ theme }) => theme.color.secondaryTextColor};
  &:hover {
    color: black;
    cursor: pointer;
  }
`;

const FilterName = styled.div`
  margin-right: 5px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  user-select: none;
`;

IssueSelectFilter.propTypes = {
  filterName: PropTypes.string.isRequired,
};

export default IssueSelectFilter;
