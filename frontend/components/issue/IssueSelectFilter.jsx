import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import qs from 'query-string';
import Dropdown from '@components/common/Dropdown';
import service from '@services';
import optionGenerator from '@utils/OptionGenerator';
import { RiArrowDownSFill } from 'react-icons/ri';

const filterAuthor = (history, params, authorId) => {
  const url = qs.stringifyUrl({
    url: '/issues',
    query: {
      ...params,
      author: authorId,
    },
  });
  history.push(url);
};
const filterMilestone = (history, params, milestoneId) => {
  const url = qs.stringifyUrl({
    url: '/issues',
    query: {
      ...params,
      milestone: milestoneId,
    },
  });
  history.push(url);
};
const filterAssignee = (history, params, assigneeId) => {
  const url = qs.stringifyUrl({
    url: '/issues',
    query: {
      ...params,
      assignee: assigneeId,
    },
  });
  history.push(url);
};

const IssueSelectFilter = ({ filterName, dropdownTitle }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [optionData, setOptionData] = useState([]);
  const history = useHistory();
  const location = useLocation();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(async () => {
    if (!showDropdown) return;
    const params = qs.parse(location.search);
    switch (filterName) {
      case 'Label':
        setOptionData(optionGenerator.labels(await service.getLabels(), []));
        break;
      case 'Author':
        setOptionData(
          optionGenerator.users(await service.getUsers(), [], filterAuthor.bind(undefined, history, params)),
        );
        break;
      case 'Assignee':
        setOptionData(
          optionGenerator.users(
            await service.getUsers(),
            [],
            filterAssignee.bind(undefined, history, params),
          ),
        );
        break;
      case 'Milestones':
        setOptionData(
          optionGenerator.milestones(
            await service.getMilestones({}),
            [],
            filterMilestone.bind(undefined, history, params),
          ),
        );
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
          isInputExist
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
};

export default IssueSelectFilter;
