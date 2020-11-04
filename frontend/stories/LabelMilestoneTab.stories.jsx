import React from 'react';
import LabelMilestoneTab from '@components/LabelMilestoneTab';
import { text, number } from '@storybook/addon-knobs';

export default {
  title: 'LabelMilestoneTab',
  component: LabelMilestoneTab,
};

export const exampleLabelMilestoneTab = () => (
  <LabelMilestoneTab
    currentPage={text('currentPage', '')}
    labelsNumber={number('labelsNumber', 10)}
    milestonesNumber={number('milestonesNumber', 2)}
  />
);
