import React, { useState, useEffect } from 'react';
import MainPageLayout from '@layouts/MainPageLayout';
import service from '@services';
import styled from 'styled-components';
import Label from '@components/common/Label';
import Moment from 'react-moment';
import { GoIssueOpened, GoIssueClosed } from 'react-icons/go';

const IssueDetailPage = (id) => {
  const [issue, setissueInfo] = useState([]);
  const getIssue = async () => {
    const issueInfo = await service.getIssue(id);
    setissueInfo(issueInfo);
  };
  useEffect(async () => {
    getIssue();
  }, []);

  return (
    <MainPageLayout>
      <IssueTitle>
        {issue.title}#{issue.id}
        <br />
        <IssueInfo>
          {issue.isCloed ? (
            <Label bg='green' text='Open' icon={<GoIssueOpened />} />
          ) : (
            <Label bg='red' text='Closed' icon={<GoIssueClosed />} />
          )}
          {` opened this issue `}
          <Moment fromNow>{issue.createdAt}</Moment>
          {` 숫자 comment `}
        </IssueInfo>
      </IssueTitle>
      <IssueDetail>
        <IssueComment>본문,댓글</IssueComment>
        <IssueSide>사이드</IssueSide>
      </IssueDetail>
    </MainPageLayout>
  );
};

const IssueTitle = styled.div`
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  font-size: ${({ theme }) => theme.fontSize.xl};
`;
const IssueInfo = styled.div`
  color: #696969;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;
const IssueDetail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
const IssueComment = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  border: 3px solid ${({ theme }) => theme.color.borderColor};
`;
const IssueSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  border: 3px solid ${({ theme }) => theme.color.borderColor};
`;
export default IssueDetailPage;
