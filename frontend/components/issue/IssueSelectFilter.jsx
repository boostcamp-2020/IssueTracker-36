import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dropdown from '@components/common/Dropdown';
import service from '@services';
import optionGenerator from '@utils/option-generator';
import { RiArrowDownSFill } from 'react-icons/ri';

const IssueSelectFilter = ({ filterName, dropdownTitle }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [optionData, setOptionData] = useState([]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(async () => {
    if (!showDropdown) return;
    switch (filterName) {
      case 'Label':
        setOptionData(optionGenerator.labels(await service.getLabels()));
        break;
      case 'Author':
      case 'Assignee':
        // TODO: getUsers 구현
        // setOptionData(optionGenerator.users(await service.getUsers()));
        break;
      case 'Milestones':
        setOptionData(optionGenerator.milestones(await service.getMilestones({})));
        break;
      default:
        setOptionData([]);
    }
  }, [showDropdown]);

  return (
    <SelectFilter>
      <FilterButton onClick={toggleDropdown}>
        <FilterName>{filterName}</FilterName>
        <RiArrowDownSFill />
      </FilterButton>
      {showDropdown && (
        <Dropdown title={dropdownTitle} isInputExist dataInDiv={optionData} toggleDropdown={toggleDropdown} />
      )}
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
  dropdownTitle: PropTypes.string.isRequired,
};

export default IssueSelectFilter;
