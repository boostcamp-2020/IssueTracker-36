import React, { useRef } from 'react';
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
  const titleInput = useRef(undefined);

  return (
    <>
      <IssueHeader>
        <IssueTitle>
          {!isEdit ? (
            <div>
              {title}
              <IssueNumber> {` #${id}`} </IssueNumber>
            </div>
          ) : (
            <Input defaultValue={title} ref={titleInput} />
          )}
          <ButtonWrapper>
            <Button
              text={!isEdit ? 'Edit' : 'Save'}
              size='large'
              type={isEdit ? 'primary' : 'secondary'}
              onClick={() => {
                if (isEdit) onClickTitleBtn(titleInput.current.value);
                setIsEdit(!isEdit);
              }}
            />
            {isEdit && (
              <Button
                text='Cancel'
                size='large'
                type='secondary'
                style={{ marginLeft: '10px' }}
                onClick={() => {
                  setIsEdit(!isEdit);
                }}
              />
            )}
          </ButtonWrapper>
        </IssueTitle>
        <IssueInfo>
          <div style={{ marginRight: '10px' }}>
            {!isClosed ? (
              <Label bg='green' text='Open' icon={<GoIssueOpened />} />
            ) : (
              <Label bg='red' text='Closed' icon={<GoIssueClosed />} />
            )}
          </div>
          {`${user} opened this issue `}
          <Moment fromNow>{createdAt}</Moment>
          {` · ${commentNumber} comment`}
        </IssueInfo>
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.xl};
`;
const IssueNumber = styled.span`
  color: ${({ theme }) => theme.color.grayColor};
`;
const IssueInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #696969;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;
const IssueHeader = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.color.borderColor};
  padding-bottom: 15px;
  margin-bottom: 20px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
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
