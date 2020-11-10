import React, { useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import MainPageLayout from '@layouts/MainPageLayout';
import NewIssueForm from '@components/issue/NewIssueForm';
import IssueSidebar from '@components/issue/IssueSidebar';
import service from '@services';

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

const IssueAddPage = () => {
  const history = useHistory();
  const [currentSelect, dispatch] = useReducer(selectReducer, {
    assignees: [],
    labels: [],
    milestone: [],
  });

  const onSubmit = async (title, content) => {
    try {
      await service.addIssue(
        title,
        content,
        currentSelect.assignees,
        currentSelect.labels,
        currentSelect.milestone,
      );
      history.push('/issues');
    } catch (e) {
      alert('오류가 발생했습니다');
    }
  };

  return (
    <MainPageLayout>
      <Wrapper>
        <FormWrapper>
          <NewIssueForm onSubmit={onSubmit} />
        </FormWrapper>
        <SidebarWrapper>
          <IssueSidebar currentSelect={currentSelect} chageSelect={dispatch} />
        </SidebarWrapper>
      </Wrapper>
    </MainPageLayout>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const FormWrapper = styled.div`
  flex: 3;
`;

const SidebarWrapper = styled.div`
  flex: 1;
  margin-left: 15px;
`;

export default IssueAddPage;
