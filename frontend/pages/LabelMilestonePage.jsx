import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LabelMilestoneTab from '@components/LabelMilestoneTab';
import LabelListPage from '@pages/lables/LabelListPage';
import MilestoneListPage from '@pages/milestones/MilestoneListPage';
import MilestoneEditPage from '@pages/milestones/MilestoneEditPage';

const LabelMilestonePage = () => (
  <>
    <LabelMilestoneTab />
    <Switch>
      <Route path='/labels' component={LabelListPage} />
      <Route exact path='/milestones' component={MilestoneListPage} />
      <Route path='/milestones/:id/edit' component={MilestoneEditPage} />
    </Switch>
  </>
);

export default LabelMilestonePage;
