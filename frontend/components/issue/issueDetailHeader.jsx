import React from 'react';
import Label from '@components/common/Label';
import Moment from 'react-moment';
import { GoIssueOpened, GoIssueClosed } from 'react-icons/go';
import Button from '@components/common/Button';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const IssueDetailHeader = ({ issue, onClickTitleBtn, isEdit, setIsEdit }) => {
  const { title, id, isClosed, createdAt } = issue;
  const user = issue.user_issues ? issue.user_issues[0].user.nickName : '';
  const commentNumber = issue.comments ? issue.comments.length : 0;
  return (
    <>
      <IssueHeader>
        <IssueTitle>
          {!isEdit ? (
            <>
              {title}
              <IssueNumber> {` #${id}`} </IssueNumber>
            </>
          ) : (
            <Input value={title} onChange={(e) => onClickTitleBtn(e.target.value)} />
          )}
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
          <Button
            text={!isEdit ? 'Edit' : 'Save'}
            size='large'
            type='secondary'
            onClick={() => setIsEdit(!isEdit)}
          />
        </ButtonWrapper>
      </IssueHeader>
    </>
  );
};
IssueDetailHeader.propTypes = {
  issue: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  onClickTitleBtn: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
  setIsEdit: PropTypes.func.isRequired,
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
const Input = styled.input`
  margin-right: 5px;
  background-color: ${({ theme }) => theme.color.inputContrast};
  padding: 5px 12px;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.color.textColor};
  vertical-align: middle;
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  border-radius: 6px;
  outline: none;
  width: 100%;
`;
export default IssueDetailHeader;
