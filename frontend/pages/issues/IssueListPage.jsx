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
  const [LabelMilestoneNumer, setLabelMilestoneNumber] = useState({ labels: 0, milestones: 0 });

  useEffect(async () => {
    const { data: issuesResponse } = await service.initialGetIssues(issuesPerPage);
    setIssues(issuesResponse.rows);
    const { data: labelsResponse } = await service.getLabels();
    const { data: milestonesResponse } = await service.getMilestones({});
    setLabelMilestoneNumber({
      labels: labelsResponse.length,
      milestones: milestonesResponse.length,
    });
  }, []);

  return (
    <MainPageLayout>
      <NavBar>
        <LabelMilestoneTab
          labelsNumber={LabelMilestoneNumer.labels}
          milestonesNumber={LabelMilestoneNumer.milestones}
        />
        <Button
          text='New issue'
          onClick={() => {
            history.push('/issues/new');
          }}
          size='large'
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
