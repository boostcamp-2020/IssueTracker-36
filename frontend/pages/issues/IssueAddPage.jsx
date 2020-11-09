import React from 'react';
import styled from 'styled-components';
import MainPageLayout from '@layouts/MainPageLayout';
import NewIssueForm from '@components/issue/NewIssueForm';
import IssueSidebar from '@components/issue/IssueSidebar';

const IssueAddPage = () => {
  return (
    <MainPageLayout>
      <Wrapper>
        <FormWrapper>
          <NewIssueForm />
        </FormWrapper>
        <SidebarWrapper>
          <IssueSidebar />
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
