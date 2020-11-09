import React from 'react';
import styled from 'styled-components';
import { RiSettings4Line } from 'react-icons/ri';

const IssueSidebar = ({ currentSelect, chageSelect }) => {
  return (
    <>
      <Wrapper>
        <Title>
          <p>Assignee</p>
          <RiSettings4Line />
        </Title>
        {currentSelect.user ? '' : 'No one'}
      </Wrapper>
      <Wrapper>
        <Title>
          <p>Label</p>
          <RiSettings4Line />
        </Title>
        {currentSelect.label ? '' : 'None yet'}
      </Wrapper>
      <Wrapper>
        <Title>
          <p>Milestone</p>
          <RiSettings4Line />
        </Title>
        {currentSelect.label ? '' : 'No milestone'}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid gray;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.blueColor};
  }
`;

export default IssueSidebar;
