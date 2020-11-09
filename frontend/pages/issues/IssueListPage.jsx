import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import MainPageLayout from '@layouts/MainPageLayout';
import LabelMilestoneTab from '@components/LabelMilestoneTab';
import Button from '@components/common/Button';
import IssueList from '@components/issue/IssueList';
import service from '@services';

const IssueListPage = () => {
  const issuesPerPage = 20;
  const history = useHistory();
  const [issues, setIssues] = useState([]);

  useEffect(async () => {
    const { data } = await service.initialGetIssues(issuesPerPage);
    setIssues(data.rows);
  }, []);

  return (
    <MainPageLayout>
      <NavBar>
        <LabelMilestoneTab />
        <Button
          text='New issue'
          onClick={() => {
            history.push('/issues/new');
          }}
        />
      </NavBar>
      <IssueList issues={issues} />
    </MainPageLayout>
  );
};

const NavBar = styled.div`
  display: flex;
  flex-direction: row;
`;

export default IssueListPage;
