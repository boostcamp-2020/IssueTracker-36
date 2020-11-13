import React from 'react';
import Avatar from '@components/common/Avatar';
import { text } from '@storybook/addon-knobs';

export default {
  title: 'Avatar',
  component: Avatar,
};

export const Examples = () => (
  <div>
    <Avatar
      alt={text('대체 텍스트', 'avatar sample')}
      src={text('이미지 url', 'https://avatars2.githubusercontent.com/u/34625313?s=64&v=4')}
      size={text('크기', 'large')}
      shape={text('모양', 'circle')}
    />
  </div>
);
