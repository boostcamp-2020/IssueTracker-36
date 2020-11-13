import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import WritingArea from '@components/common/WritingArea';
import Button from '@components/common/Button';

const NewIssueForm = ({ onSubmit }) => {
  const title = useRef(undefined);
  const clickButton = (content) => {
    onSubmit(title.current.value, content);
  };
  return (
    <Wrapper>
      <TitleWrapper>
        <Title placeholder='Title' ref={title} />
      </TitleWrapper>
      <WritingArea
        renderButton={(text) => {
          return (
            <Button
              size='large'
              text='Submit new issue'
              onClick={() => {
                clickButton(text);
              }}
              disabled={!text.length}
            />
          );
        }}
      />
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

NewIssueForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default NewIssueForm;
