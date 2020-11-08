import React, { useState } from 'react';
import styled from 'styled-components';

const WritingArea = () => {
  const [text, setText] = useState('');
  const [isPreview, setIsPreview] = useState(false);

  const clickTab = (clickedPreview) => {
    if (isPreview !== clickedPreview) setIsPreview(!isPreview);
  };
  const inputTextarea = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <Header>
        <Tab onClick={() => clickTab(false)} isSelected={!isPreview}>
          Write
        </Tab>
        <Tab onClick={() => clickTab(true)} isSelected={isPreview}>
          Preview
        </Tab>
      </Header>
      <Textarea placeholder='Leave a comment' value={text} onChange={inputTextarea} />
    </>
  );
};

const Header = styled.ul`
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.color.borderColor};
`;

const Tab = styled.li`
  display: inline;
  position: relative;
  list-style: none;
  padding: 10px 20px;
  background-color: ${(props) => props.isSelected && 'white'};
  border: ${(props) => props.isSelected && `1px solid ${props.theme.color.borderColor}`};
  border-bottom: ${(props) => props.isSelected && '1px solid white'};
  border-radius: 5px 5px 0 0;
  cursor: pointer;
`;

const Textarea = styled.textarea`
  margin: 5px 10px;
  padding: 10px;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  min-height: 350px;
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  border-radius: 5px;
  &:focus {
    box-shadow: 0 0 3px ${({ theme }) => theme.color.blueColor};
  }
`;

export default WritingArea;
