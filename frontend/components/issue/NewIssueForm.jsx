import React from 'react';
import styled from 'styled-components';
import WritingArea from '@components/common/WritingArea';

const NewIssueForm = () => {
  const clickButton = (text) => {};

  return (
    <Wrapper>
      <TitleWrapper>
        <Title placeholder='Title' />
      </TitleWrapper>
      <WritingArea buttonText='Submit new issue' onButtonClick={clickButton} />
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

export default NewIssueForm;
