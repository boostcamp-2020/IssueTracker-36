import React, { useReducer, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainPageLayout from '@layouts/MainPageLayout';
import service from '@services';
import styled from 'styled-components';
import IssueDetailHeader from '@components/issue/issueDetailHeader';
import IssueSidebar from '@components/issue/IssueSidebar';
import CommentList from '@components/comment/CommentList';
import NewCommentForm from '@components/comment/NewCommentForm';

const getDifference = (before, after) => {
  const difference = [];
  before.forEach((element) => {
    if (!after.includes(element)) difference.push({ isNew: false, id: element });
  });
  after.forEach((element) => {
    if (!before.includes(element)) difference.push({ isNew: true, id: element });
  });
  return difference;
};

const selectReducer = (state, action) => {
  const { type, newSelection } = action;
  switch (type) {
    case 'init':
      return {
        issueId: action.issueId,
        assignees: newSelection.assignees,
        labels: newSelection.labels,
        milestone: newSelection.milestone,
      };
    case 'assignee':
      const changedAssignee = getDifference(state.assignees, newSelection);
      changedAssignee.forEach(async (difference) => {
        if (difference.isNew) await service.addIssueUser(state.issueId, difference.id);
        else await service.deleteIssueUser(state.issueId, difference.id);
      });
      return { ...state, assignees: newSelection };
    case 'label':
      const changedLabel = getDifference(state.labels, newSelection);
      changedLabel.forEach(async (difference) => {
        if (difference.isNew) await service.addIssueLabel(state.issueId, difference.id);
        else await service.deleteIssueLabel(state.issueId, difference.id);
      });
      return { ...state, labels: newSelection };
    case 'milestone':
      const changedMilestone = getDifference(state.milestone, newSelection);
      changedMilestone.forEach(async (difference) => {
        if (difference.isNew) await service.addIssueMilestone(state.issueId, difference.id);
        else await service.deleteIssueMilestone(state.issueId, difference.id);
      });
      return { ...state, milestone: newSelection };
    default:
      return state;
  }
};

const IssueDetailPage = () => {
  const params = useParams();
  const [issue, setIssueInfo] = useState({ isClosed: true, comments: [] });
  const [isEdit, setIsEdit] = useState(false);
  const [user, setUser] = useState({});
  const [currentSelect, dispatch] = useReducer(selectReducer, {
    id: 0,
    assignees: [],
    labels: [],
    milestone: [],
  });

  const getIssue = async () => {
    const { data } = await service.getIssue(params.id);
    setIssueInfo(data);
    dispatch({ type: 'issue', id: data.id });

    const assignees = data.user_issues.reduce((acc, userIssue) => {
      if (!userIssue.is_owner) acc.push(userIssue.user.id);
      return acc;
    }, []);
    const milestone = data.milestoneId ? [data.milestoneId] : [];
    const labels = data.issue_labels.reduce((acc, issueLabel) => {
      acc.push(issueLabel.label_id);
      return acc;
    }, []);
    dispatch({ type: 'init', issueId: data.id, newSelection: { assignees, labels, milestone } });
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

  const onAddReaction = ({ commentId, type }) =>
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

  const onDeleteReaction = ({ commentId, reactionId }) =>
    service
      .deleteReaction({ commentId, reactionId })
      .then(({ data: deletedReaction }) => {
        const index = issue.comments.findIndex((comment) => comment.id === commentId);
        if (index === -1) return;

        const { comments } = issue;
        setIssueInfo({
          ...issue,
          comments: [
            ...comments.slice(0, index),
            {
              ...comments[index],
              reactions: [
                ...comments[index].reactions.filter((reaction) => reaction.id !== deletedReaction.id),
              ],
            },
            ...comments.slice(index + 1),
          ],
        });
      })
      .catch(console.error);

  useEffect(() => {
    getIssue();
    service.getUsers().then(({ data }) => {
      setUser(data[0]);
    });
  }, []);

  return (
    <MainPageLayout>
      <IssueDetailHeader issue={issue} onClickTitleBtn={updateTitle} isEdit={isEdit} setIsEdit={setIsEdit} />
      <IssueDetail>
        <IssueComment>
          <Maincontents>
            <CommentList
              comments={issue.comments}
              onAddReaction={onAddReaction}
              onDeleteReaction={onDeleteReaction}
            />
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
  margin-left: 20px;
`;
export default IssueDetailPage;
