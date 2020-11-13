import React from 'react';
import ReactionButton from '@components/comment/ReactionButton';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Comment/ReactionButton',
  component: ReactionButton,
};

export const Examples = () => (
  <div style={{ textAlign: 'center' }}>
    <ReactionButton onClickReaction={action('Reaction Click')} />
  </div>
);
