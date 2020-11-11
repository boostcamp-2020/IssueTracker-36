import React from 'react';
import CommentList from '@components/comment/CommentList';

export default {
  title: 'Comment/CommentList',
  component: CommentList,
};

const comments = [
  {
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
    ],
  },
  {
    id: 177,
    isMain: false,
    content: '와 정말 대다내',
    createdAt: '2020-11-09T07:10:40.000Z',
    updatedAt: '2020-11-09T07:10:40.000Z',
    userId: 37,
    issueId: 24,
    user: {
      nickName: 'user_37',
    },
    reactions: '[]',
  },
];

export const example = () => <CommentList comments={comments} />;
