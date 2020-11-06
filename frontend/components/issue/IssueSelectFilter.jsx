import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dropdown from '@components/common/Dropdown';
import { RiArrowDownSFill } from 'react-icons/ri';

const IssueSelectFilter = ({ filterName }) => {
  const [showDropdown, setShowDropdown] = useState(true);

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
`;

const FilterButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const FilterName = styled.div`
  margin-right: 5px;
  user-select: none;
`;

IssueSelectFilter.propTypes = {
  filterName: PropTypes.string.isRequired,
};

export default IssueSelectFilter;
