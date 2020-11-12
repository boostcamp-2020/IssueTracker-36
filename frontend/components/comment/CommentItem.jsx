import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Comment from '@components/comment/Comment';
import Avatar from '@components/common/Avatar';

const CommentItem = ({ comment, onAddReaction, onDeleteReaction }) => {
  return (
    <ItemWrapper>
      <AvatarWrapper>
        <Avatar alt={`${comment.user.nickName} profile image`} />
      </AvatarWrapper>
      <CommentWrapper>
        <Comment comment={comment} onAddReaction={onAddReaction} onDeleteReaction={onDeleteReaction} />
      </CommentWrapper>
    </ItemWrapper>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  onAddReaction: PropTypes.func.isRequired,
  onDeleteReaction: PropTypes.func.isRequired,
};

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const AvatarWrapper = styled.div`
  margin-right: 20px;
`;

const CommentWrapper = styled.div`
  flex: 1;
`;

export default CommentItem;
