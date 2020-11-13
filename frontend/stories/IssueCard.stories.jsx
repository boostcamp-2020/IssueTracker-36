import React from 'react';
import IssueCard from '@components/issue/IssueCard';
import Label from '@components/common/Label';
import { text, number, boolean } from '@storybook/addon-knobs';

export default {
  title: 'IssueCard',
  component: IssueCard,
};

const labels = [<Label text='tag' />];

export const exampleLabelMilestoneTab = () => (
  <IssueCard
    title={text('title', 'My first Issue')}
    labelList={labels}
    issueId={number('issueId', 1)}
    created={new Date()}
    userNickname='kim'
    milestoneName={text('milestoneName', 'Day1')}
    isClosed={boolean('isClosed', false)}
  />
);
