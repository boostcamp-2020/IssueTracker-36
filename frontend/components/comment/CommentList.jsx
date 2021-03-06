import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CommentItem from '@components/comment/CommentItem';

const CommentList = ({
  comments,
  onAddReaction,
  onDeleteReaction,
  isCommentEdit,
  setIsCommentEdit,
  onClickEditBtn,
}) => {
  return (
    <ListWrapper>
      {comments.map((comment) => (
        <ItemWrapper key={comment.id}>
          <CommentItem
            comment={comment}
            onAddReaction={onAddReaction}
            isCommentEdit={isCommentEdit}
            setIsCommentEdit={setIsCommentEdit}
            onClickEditBtn={onClickEditBtn}
            onDeleteReaction={onDeleteReaction}
          />
        </ItemWrapper>
      ))}
    </ListWrapper>
  );
};

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  onAddReaction: PropTypes.func.isRequired,
  onDeleteReaction: PropTypes.func.isRequired,
  isCommentEdit: PropTypes.number.isRequired,
  setIsCommentEdit: PropTypes.func.isRequired,
  onClickEditBtn: PropTypes.func.isRequired,
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
