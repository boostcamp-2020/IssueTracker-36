import React, { useState, useEffect } from 'react';
import MainPageLayout from '@layouts/MainPageLayout';
import LabelMilestoneTab from '@components/LabelMilestoneTab';
import IssueList from '@components/issue/IssueList';
import service from '@services';

const IssueListPage = () => {
  const issuesPerPage = 20;
  const [issues, setIssues] = useState([]);

  useEffect(async () => {
    const { data } = await service.initialGetIssues(issuesPerPage);
    setIssues(data.rows);
  }, []);

  return (
    <MainPageLayout>
      <LabelMilestoneTab />
      <IssueList issues={issues} />
    </MainPageLayout>
  );
};

export default IssueListPage;
