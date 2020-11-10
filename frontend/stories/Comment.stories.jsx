import React from 'react';
import Comment from '@components/comment/Comment';
import { text, array, boolean } from '@storybook/addon-knobs';

export default {
  title: 'Comment/Comment',
  component: Comment,
};

const comment = {
  id: 53,
  isMain: true,
  content: `## HI! ISSUE-2 
  - This is Comment!! comment id=53 
  - zdsadasdasdasdasdsadasdasasdasda
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

export const exampleDropdown = () => <Comment comment={comment} />;
