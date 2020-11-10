import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CommentItem from '@components/comment/CommentItem';

const CommentList = ({ comments }) => {
  return (
    <ListWrapper>
      {comments.map((comment) => (
        <ItemWrapper>
          <CommentItem comment={comment} key={comment.id} />
        </ItemWrapper>
      ))}
    </ListWrapper>
  );
};

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
};

const ListWrapper = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.color.borderColor};
  position: relative;

  &:before {
    content: '';
    width: 1px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 76px;
    border-left: 1px solid ${({ theme }) => theme.color.borderColor};
  }
`;

const ItemWrapper = styled.div`
  margin-bottom: 24px;
`;

export default CommentList;
