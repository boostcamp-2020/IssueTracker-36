import React from 'react';
import styled from 'styled-components';
import IssueSelectFilter from './IssueSelectFilter';

const IssueListHeader = () => {
  const filters = [
    { filterName: 'Author', dropdownTitle: 'Filter by author' },
    { filterName: 'Label', dropdownTitle: 'Filter by label' },
    { filterName: 'Milestones', dropdownTitle: 'Filter by milestone' },
    { filterName: 'Assignee', dropdownTitle: "Filter by who's assigned" },
  ];

  return (
    <Wrapper>
      <TD>
        <Checkbox />
      </TD>
      <TD>
        <Filters>
          {filters.map(({ filterName, dropdownTitle }) => {
            return (
              <IssueSelectFilter filterName={filterName} dropdownTitle={dropdownTitle} key={filterName} />
            );
          })}
        </Filters>
      </TD>
    </Wrapper>
  );
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
