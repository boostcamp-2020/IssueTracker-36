import React, { useReducer } from 'react';
import styled from 'styled-components';
import MainPageLayout from '@layouts/MainPageLayout';
import NewIssueForm from '@components/issue/NewIssueForm';
import IssueSidebar from '@components/issue/IssueSidebar';

const selectReducer = (state, action) => {
  switch (action.type) {
    case 'assignee':
      return { ...state, user: action.newSelction };
    case 'label':
      return { ...state, labels: action.newSelction };
    case 'milestone':
      return { ...state, milestone: action.newSelction };
    default:
      return state;
  }
};

const IssueAddPage = () => {
  const [currentSelect, dispatch] = useReducer(selectReducer, {
    assignees: [],
    labels: [],
    milestone: undefined,
  });

  return (
    <MainPageLayout>
      <Wrapper>
        <FormWrapper>
          <NewIssueForm />
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
