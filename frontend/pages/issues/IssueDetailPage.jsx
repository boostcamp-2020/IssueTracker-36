import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainPageLayout from '@layouts/MainPageLayout';
import service from '@services';
import styled from 'styled-components';
import WritingArea from '@components/common/WritingArea';
import IssueDetailHeader from '@components/issue/issueDetailHeader';

const IssueDetailPage = () => {
  const params = useParams();
  const [issue, setissueInfo] = useState([]);
  const getIssue = async () => {
    const issueInfo = await service.getIssue(params.id);
    setissueInfo(issueInfo.data);
  };
  useEffect(() => {
    getIssue();
  }, []);

  return (
    <MainPageLayout>
      <IssueDetailHeader issue={issue} />
      <IssueDetail>
        <IssueComment>
          본문,댓글
          <WritingArea />
        </IssueComment>
        <IssueSide>사이드</IssueSide>
      </IssueDetail>
    </MainPageLayout>
  );
};

const IssueDetail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
const IssueComment = styled.div`
  display: flex;
  flex-direction: column;
  flex: 7;
  border: 1px solid ${({ theme }) => theme.color.borderColor};
`;
const IssueSide = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  border: 1px solid ${({ theme }) => theme.color.borderColor};
`;
export default IssueDetailPage;
