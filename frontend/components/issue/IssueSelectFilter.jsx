import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import qs from 'query-string';
import Dropdown from '@components/common/Dropdown';
import service from '@services';
import toggleArray from '@utils/toggle-array';
import optionGenerator from '@utils/OptionGenerator';
import { RiArrowDownSFill } from 'react-icons/ri';

const IssueSelectFilter = ({
  filterName,
  dropdownTitle,
  filterData,
  isInputExist,
  selectedIssues,
  setSelectedIssues,
  getIssues,
}) => {
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

  const filterAuthor = () => (authorId) => {
    const url = qs.stringifyUrl({
      url: '/issues',
      query: {
        ...filterData,
        page: undefined,
        author: Number(filterData.author) === authorId ? undefined : authorId,
      },
    });
    history.push(url);
    toggleDropdown();
  };
  const filterMilestone = () => (milestoneId) => {
    const url = qs.stringifyUrl({
      url: '/issues',
      query: {
        ...filterData,
        page: undefined,
        milestone: Number(filterData.milestone) === milestoneId ? undefined : milestoneId,
      },
    });
    history.push(url);

    toggleDropdown();
  };
  const filterAssignee = () => (assigneeId) => {
    const url = qs.stringifyUrl({
      url: '/issues',
      query: {
        ...filterData,
        page: undefined,
        assignee: Number(filterData.assignee) === assigneeId ? undefined : assigneeId,
      },
    });
    toggleDropdown();
    history.push(url);

    toggleDropdown();
  };

  const filterLabels = () => (labelId) => {
    const url = qs.stringifyUrl({
      url: '/issues',
      query: {
        ...filterData,
        page: undefined,
        label: toggleArray(filterData.label, String(labelId)),
      },
    });
    history.push(url);
    // history.go();

    toggleDropdown();
  };

  const filterMarkAs = async (type) => {
    switch (type) {
      case 'Open':
        await service.patchIssues(selectedIssues, false);
        break;
      case 'Closed':
        await service.patchIssues(selectedIssues, true);
        break;
      default:
    }
    getIssues();
    setShowDropdown(!showDropdown);
    setSelectedIssues([]);
  };
  useEffect(async () => {
    if (!showDropdown) {
      setOptionData([]);
    } else {
      switch (filterName) {
        case 'Label':
          setOptionData(
            optionGenerator.labels(await service.getLabels(), filterData.label, filterLabels(filterData)),
          );
          break;
        case 'Author':
          setOptionData(
            optionGenerator.users(
              await service.getUsers(),
              [Number(filterData.author)],
              filterAuthor(filterData),
            ),
          );
          break;
        case 'Assignee':
          setOptionData(
            optionGenerator.users(
              await service.getUsers(),
              [Number(filterData.assignee)],
              filterAssignee(filterData),
            ),
          );
          break;
        case 'Milestones':
          setOptionData(
            optionGenerator.milestones(
              await service.getMilestones({}),
              [Number(filterData.milestone)],
              filterMilestone(filterData),
            ),
          );
          break;
        case 'Mark As':
          setOptionData(optionGenerator.markAs(markAsActons, filterMarkAs));
          break;
        default:
          setOptionData([]);
      }
    }
  }, [showDropdown, filterData]);

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
  getIssues: PropTypes.func.isRequired,
  setSelectedIssues: PropTypes.func.isRequired,
};

export default IssueSelectFilter;
