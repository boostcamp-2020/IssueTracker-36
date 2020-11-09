import React from 'react';
import WritingArea from '@components/common/WritingArea';
import { text, number, boolean } from '@storybook/addon-knobs';

export default {
  title: 'WritingArea',
  component: WritingArea,
};

export const exampleWritingArea = () => <WritingArea />;
