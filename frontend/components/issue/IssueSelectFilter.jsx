import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import qs from 'query-string';
import Dropdown from '@components/common/Dropdown';
import service from '@services';
import toggleArray from '@utils/toggle-array';
import optionGenerator from '@utils/OptionGenerator';
import { RiArrowDownSFill } from 'react-icons/ri';

const filterAuthor = (history, filterData, authorId) => {
  const url = qs.stringifyUrl({
    url: '/issues',
    query: {
      ...filterData,
      author: authorId,
    },
  });
  history.push(url);
};
const filterMilestone = (history, filterData, milestoneId) => {
  const url = qs.stringifyUrl({
    url: '/issues',
    query: {
      ...filterData,
      milestone: milestoneId,
    },
  });
  history.push(url);
};
const filterAssignee = (history, filterData, assigneeId) => {
  const url = qs.stringifyUrl({
    url: '/issues',
    query: {
      ...filterData,
      assignee: assigneeId,
    },
  });
  history.push(url);
};

const filterLabels = (history, filterData, labelId) => {
  const url = qs.stringifyUrl({
    url: '/issues',
    query: {
      ...filterData,
      label: toggleArray(filterData.label, String(labelId)),
    },
  });
  history.push(url);
};
const filterMarkAs = (selectedIssues) => async (type) => {
  switch (type) {
    case 'Open':
      console.log('open');
      await service.patchIssues(selectedIssues, false);
      break;
    case 'Closed':
      console.log('close');
      await service.patchIssues(selectedIssues, true);
      break;
    default:
  }
};

const IssueSelectFilter = ({ filterName, dropdownTitle, filterData, isInputExist, selectedIssues }) => {
  const markAsActons = [
    { id: 1, type: 'Open' },
    { id: 2, type: 'Closed' },
  ];
  const [showDropdown, setShowDropdown] = useState(false);
  const history = useHistory();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const [optionData, setOptionData] = useState([]);
  useEffect(async () => {
    if (!showDropdown) return;
    switch (filterName) {
      case 'Label':
        setOptionData(
          optionGenerator.labels(
            await service.getLabels(),
            filterData.label,
            filterLabels.bind(undefined, history, filterData),
          ),
        );
        break;
      case 'Author':
        setOptionData(
          optionGenerator.users(
            await service.getUsers(),
            [Number(filterData.author)],
            filterAuthor.bind(undefined, history, filterData),
          ),
        );
        break;
      case 'Assignee':
        setOptionData(
          optionGenerator.users(
            await service.getUsers(),
            [Number(filterData.assignee)],
            filterAssignee.bind(undefined, history, filterData),
          ),
        );
        break;
      case 'Milestones':
        setOptionData(
          optionGenerator.milestones(
            await service.getMilestones({}),
            [Number(filterData.milestone)],
            filterMilestone.bind(undefined, history, filterData),
          ),
        );
        break;
      case 'Mark As':
        setOptionData(optionGenerator.markAs(markAsActons, filterMarkAs(selectedIssues)));
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
        <Dropdown
          title={dropdownTitle}
          isInputExist={isInputExist}
          options={optionData}
          marginTop='25px'
          toggleDropdown={toggleDropdown}
        />
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
  filterData: PropTypes.object.isRequired,
  isInputExist: PropTypes.bool.isRequired,
  selectedIssues: PropTypes.array.isRequired,
};

export default IssueSelectFilter;
