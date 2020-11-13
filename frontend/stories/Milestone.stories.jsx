import React from 'react';
import Milestone from '@components/milestone/Milestone';
import { object } from '@storybook/addon-knobs';

export default {
  title: 'MilestoneList',
  component: Milestone,
};
const milestoneObj = {
  createdAt: '2020-11-06T13:00:49.000Z',
  description: 'milestone_2',
  dueDate: '2020-11-06T13:00:49.000Z',
  id: 2,
  isClosed: false,
  title: 'milestone2',
  updatedAt: '2020-11-06T13:00:49.000Z',
};
export const exampleMilestone = () => <Milestone milestone={object('milestone', milestoneObj)} />;
