import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Moment from 'react-moment';
import ReactionButton from '@components/comment/ReactionButton';
import ReactMarkdown from 'react-markdown';

const Comment = ({ comment: { isMain, content, updatedAt, reactions, user } }) => {
  return (
    <CommentWrapper className={isMain ? 'main-comment' : ''}>
      <Head>
        <Title>
          <NickName>{user.nickName}</NickName> commented <Moment fromNow>{updatedAt}</Moment>
        </Title>
        <Buttons>
          <ReactionButton onClickReaction={console.log} />
          <EditButton type='button'>Edit</EditButton>
        </Buttons>
      </Head>
      <Body>
        <ReactMarkdown className='markdown-body'>{content}</ReactMarkdown>
      </Body>
    </CommentWrapper>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

const CommentWrapper = styled.article`
  position: relative;
  color: ${({ theme }) => theme.color.textColor};
  background-color: ${({ theme }) => theme.color.whiteColor};
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  border-radius: 6px;
  font-size: ${({ theme }) => theme.fontSize.sm};

  &:before {
    width: 0;
    height: 0;
    pointer-events: none;
    content: ' ';
    border-color: transparent;
    border-style: solid solid outset;
    display: block;
    border-width: 8px;
    border-right-color: ${({ theme }) => theme.color.borderColor};
    position: absolute;
    top: 11px;
    right: 100%;
    left: -16px;
  }
  &:after {
    width: 0;
    height: 0;
    pointer-events: none;
    content: ' ';
    border-color: transparent;
    border-style: solid solid outset;
    display: block;
    margin-top: 1px;
    margin-left: 2px;
    border-width: 7px;
    border-right-color: ${({ theme }) => theme.color.shadeBgColor};
    position: absolute;
    top: 11px;
    right: 100%;
    left: -16px;
  }
  &.main-comment:after {
    border-right-color: ${({ theme }) => theme.color.mainCommentHeadColor};
  }
`;

const Head = styled.div`
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.borderColor};
  background-color: ${({ theme }) => theme.color.shadeBgColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px 6px 0 0;

  ${CommentWrapper}.main-comment & {
    background-color: ${({ theme }) => theme.color.mainCommentHeadColor};
  }
`;

const Title = styled.div`
  padding: 10px 0;
  color: ${({ theme }) => theme.color.secondaryTextColor};
`;

const NickName = styled.span`
  color: ${({ theme }) => theme.color.textColor};
  font-weight: 600;
`;

const Buttons = styled.div``;

const EditButton = styled.button`
  padding: 2px 8px;
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  border-radius: 6px;
`;

const Body = styled.div`
  padding: 15px;
  border-radius: 0 0 6px 6px;
`;

export default Comment;
