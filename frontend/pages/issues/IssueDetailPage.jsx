import React, { useReducer, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainPageLayout from '@layouts/MainPageLayout';
import service from '@services';
import styled from 'styled-components';
import IssueDetailHeader from '@components/issue/issueDetailHeader';
import IssueSidebar from '@components/issue/IssueSidebar';
import CommentList from '@components/comment/CommentList';
import NewCommentForm from '@components/comment/NewCommentForm';

const selectReducer = (state, action) => {
  switch (action.type) {
    case 'assignee':
      return { ...state, assignees: action.newSelection };
    case 'label':
      return { ...state, labels: action.newSelection };
    case 'milestone':
      return { ...state, milestone: action.newSelection };
    default:
      return state;
  }
};

const IssueDetailPage = () => {
  const params = useParams();
  const [issue, setissueInfo] = useState({ isClosed: true, comments: [] });
  const [user, setUser] = useState({});
  const [currentSelect, dispatch] = useReducer(selectReducer, {
    assignees: [],
    labels: [],
    milestone: [],
  });

  const getIssue = async () => {
    const issueInfo = await service.getIssue(params.id);
    setissueInfo(issueInfo.data);
  };
  const updateState = async () => {
    const updateIssue = await service.updateIssue(params.id, { title: issue.title, closed: !issue.isClosed });
    setissueInfo({ ...issue, isClosed: updateIssue.data.isClosed });
  };
  const updateTitle = async (title) => {
    const updateIssue = await service.updateIssue(params.id, { title, closed: issue.isClosed });
    setissueInfo({ ...issue, title: updateIssue.data.title });
  };
  const addComment = async (content) => {
    await service.addComment({ uid: user.id, content, issueId: issue.id });
    getIssue();
  };

  useEffect(() => {
    getIssue();
    service.getUsers().then(({ data }) => {
      setUser(data[0]);
    });
  }, []);

  return (
    <MainPageLayout>
      <IssueDetailHeader issue={issue} onClickBtn={updateTitle} />
      <IssueDetail>
        <IssueComment>
          <Maincontents>
            <CommentList comments={issue.comments} />
          </Maincontents>
          <NewCommentForm
            user={user}
            isClosed={issue.isClosed}
            leftBtnText={issue.isClosed ? 'Reopen Issue' : 'Close issue'}
            rightBtnText='comment'
            onClickLeftBtn={updateState}
            onClickRightBtn={addComment}
          />
        </IssueComment>
        <IssueSide>
          <IssueSidebar currentSelect={currentSelect} chageSelect={dispatch} />
        </IssueSide>
      </IssueDetail>
    </MainPageLayout>
  );
};

const IssueDetail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;
const IssueComment = styled.div`
  display: flex;
  flex-direction: column;
  flex: 7;
  height: 100%;
  margin-right: 28px;
`;
const Maincontents = styled.div`
  margin-bottom: 32px;
`;
const IssueSide = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  padding: 10px;
`;
export default IssueDetailPage;
