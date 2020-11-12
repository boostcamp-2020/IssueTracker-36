import React from 'react';
import Label from '@components/common/Label';
import Moment from 'react-moment';
import { GoIssueOpened, GoIssueClosed } from 'react-icons/go';
import Button from '@components/common/Button';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const IssueDetailHeader = ({ issue }) => {
  const { title, id, isClosed, createdAt } = issue;
  const user = issue.user_issues ? issue.user_issues[0].user.nickName : '';
  const commentNumber = issue.comments ? issue.comments.length : 0;
  return (
    <IssueHeader>
      <IssueTitle>
        {title}
        <IssueNumber>{` #${id}`}</IssueNumber>
        <IssueInfo>
          {!isClosed ? (
            <Label bg='green' text='Open' icon={<GoIssueOpened />} />
          ) : (
            <Label bg='red' text='Closed' icon={<GoIssueClosed />} />
          )}
          {`${user} opened this issue `}
          <Moment fromNow>{createdAt}</Moment>
          {` · ${commentNumber} comment`}
        </IssueInfo>
      </IssueTitle>
      <ButtonWrapper>
        <Button text='Edit' size='large' type='secondary' />
      </ButtonWrapper>
    </IssueHeader>
  );
};
IssueDetailHeader.propTypes = {
  issue: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};
const IssueTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  padding: 18px;
`;
const IssueNumber = styled.span`
  color: ${({ theme }) => theme.color.grayColor};
`;
const IssueInfo = styled.div`
  color: #696969;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;
const IssueHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.color.borderColor};
  margin-bottom: 40px;
`;
const ButtonWrapper = styled.div`
  padding: 18px;
  margin: auto 0;
`;
export default IssueDetailHeader;
