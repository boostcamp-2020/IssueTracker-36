import React, { useReducer,useState, useEffect } from 'react';
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
  const [issue, setissueInfo] = useState({ comments: [] });
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
  useEffect(() => {
    getIssue();
    service.getUsers().then(({ data }) => {
      setUser(data[0]);
    });
  }, []);

  return (
    <MainPageLayout>
      <IssueDetailHeader issue={issue} />
      <IssueDetail>
        <IssueComment>
          <Maincontents>
            <CommentList comments={issue.comments} />
          </Maincontents>
          <NewCommentForm user={user} />
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
`;
export default IssueDetailPage;
