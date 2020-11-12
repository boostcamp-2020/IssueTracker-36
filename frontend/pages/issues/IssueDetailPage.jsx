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
  const [issue, setIssueInfo] = useState({ isClosed: true, comments: [] });
  const [user, setUser] = useState({});
  const [currentSelect, dispatch] = useReducer(selectReducer, {
    assignees: [],
    labels: [],
    milestone: [],
  });

  const getIssue = async () => {
    const issueInfo = await service.getIssue(params.id);
    setIssueInfo(issueInfo.data);
  };
  const updateState = async () => {
    const updateIssue = await service.updateIssue(params.id, { title: issue.title, closed: !issue.isClosed });
    setIssueInfo({ ...issue, isClosed: updateIssue.data.isClosed });
  };
  const updateTitle = async (title) => {
    const updateIssue = await service.updateIssue(params.id, { title, closed: issue.isClosed });
    setIssueInfo({ ...issue, title: updateIssue.data.title });
  };
  const addComment = async (content) => {
    await service.addComment({ uid: user.id, content, issueId: issue.id });
    getIssue();
  };

  const onAddReaction = ({ commentId, type }) => {
    service
      .addReaction({ commentId, type })
      .then(({ data: reaction }) => {
        const index = issue.comments.findIndex((comment) => comment.id === commentId);
        if (index === -1) return;

        const { comments } = issue;
        setIssueInfo({
          ...issue,
          comments: [
            ...comments.slice(0, index),
            {
              ...comments[index],
              reactions: [...comments[index].reactions, reaction],
            },
            ...comments.slice(index + 1),
          ],
        });
      })
      .catch(console.error);
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
            <CommentList comments={issue.comments} onAddReaction={onAddReaction} />
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
`;
const Maincontents = styled.div`
  padding: 40px;
`;
const IssueSide = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  padding: 10px;
`;
export default IssueDetailPage;
