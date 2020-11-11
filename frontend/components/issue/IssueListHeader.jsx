import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import IssueSelectFilter from './IssueSelectFilter';
import Button from '@components/common/Button';

const IssueListHeader = ({ filterData, setFilterData, onClickSelectAll, selectedIssues }) => {
  const forMarkAs = selectedIssues[0] !== undefined;
  const filters = [
    {
      filterName: 'Author',
      dropdownTitle: 'Filter by author',
      isInputExist: true,
      show: !forMarkAs,
    },
    {
      filterName: 'Label',
      dropdownTitle: 'Filter by label',
      isInputExist: true,
      show: !forMarkAs,
    },
    {
      filterName: 'Milestones',
      dropdownTitle: 'Filter by milestone',
      isInputExist: true,
      show: !forMarkAs,
    },
    {
      filterName: 'Assignee',
      dropdownTitle: "Filter by who's assigned",
      isInputExist: true,
      show: !forMarkAs,
    },
    {
      filterName: 'Mark As',
      dropdownTitle: 'Actions',
      isInputExist: false,
      show: forMarkAs,
    },
  ];

  return (
    <Wrapper>
      <TD>
        <Checkbox checked={forMarkAs} readOnly onChange={(e) => onClickSelectAll(e)} />
      </TD>
      <TD>
        <Filters>
          {filters.map(({ filterName, dropdownTitle, isInputExist, show }) => {
            return !show ? undefined : (
              <IssueSelectFilter
                filterName={filterName}
                dropdownTitle={dropdownTitle}
                key={filterName}
                filterData={filterData}
                setFilterData={setFilterData}
                isInputExist={isInputExist}
                selectedIssues={selectedIssues}
              />
            );
          })}
        </Filters>
      </TD>
    </Wrapper>
  );
};

IssueListHeader.propTypes = {
  filterData: PropTypes.object.isRequired,
  setFilterData: PropTypes.func.isRequired,
  onClickSelectAll: PropTypes.func.isRequired,
  selectedIssues: PropTypes.array.isRequired,
};

const Wrapper = styled.tr`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TD = styled.td`
  padding: 15px 20px;
`;

const Checkbox = styled.input.attrs({
  type: 'checkbox',
})``;

const Filters = styled.div`
  display: flex;
  flex-direction: row;
`;

export default IssueListHeader;
