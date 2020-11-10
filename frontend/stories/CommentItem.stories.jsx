import React from 'react';
import CommentItem from '@components/comment/CommentItem';

export default {
  title: 'Comment/CommentItem',
  component: CommentItem,
};

const comment = {
  id: 53,
  isMain: true,
  content: `수고하셨습니다 
  - This is Comment!! comment id=53 
  - testtest
  - **1234**
  `,
  createdAt: '2020-11-09T07:10:40.000Z',
  updatedAt: '2020-11-09T07:10:40.000Z',
  userId: 14,
  issueId: 2,
  user: { nickName: 'user-14' },
  reactions: [
    {
      id: 24,
      type: ':heart',
      createdAt: '2020-11-09T07:10:40.000Z',
      updatedAt: '2020-11-09T07:10:40.000Z',
      commentId: 53,
      userId: 41,
    },
    {
      id: 47,
      type: ':heart',
      createdAt: '2020-11-09T07:10:40.000Z',
      updatedAt: '2020-11-09T07:10:40.000Z',
      commentId: 53,
      userId: 70,
    },
    {
      id: 178,
      type: ':heart',
      createdAt: '2020-11-09T07:10:40.000Z',
      updatedAt: '2020-11-09T07:10:40.000Z',
      commentId: 53,
      userId: 63,
    },
  ],
};

export const example = () => <CommentItem comment={comment} />;
