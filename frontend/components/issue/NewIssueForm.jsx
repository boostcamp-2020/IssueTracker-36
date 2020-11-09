import React from 'react';
import styled from 'styled-components';
import WritingArea from '@components/common/WritingArea';
import Button from '@components/common/Button';

const NewIssueForm = () => {
  return (
    <Wrapper>
      <TitleWrapper>
        <Title placeholder='Title' />
      </TitleWrapper>
      <WritingArea />
      <ButtonWrapper>
        <Button size='large' text='Submit new issue' />
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  border-radius: 3px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Title = styled.input`
  height: 2.5rem;
  width: 98%;
  margin: 15px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  border-radius: 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 10px;
`;

export default NewIssueForm;
