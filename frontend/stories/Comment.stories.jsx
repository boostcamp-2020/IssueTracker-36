import React from 'react';
import Comment from '@components/comment/Comment';
import { text, array, boolean } from '@storybook/addon-knobs';

export default {
  title: 'Comment',
  component: Comment,
};

const comment = {
  id: 53,
  isMain: true,
  content: 'This is Comment!! comment id=53',
  createdAt: '2020-11-09T07:10:40.000Z',
  updatedAt: '2020-11-09T07:10:40.000Z',
  userId: 14,
  issueId: 2,
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
