import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  IssueAddPage,
  IssueDetailPage,
  IssueListPage,
  LabelListPage,
  LoginPage,
  MilestoneAddPage,
  MilestoneDetailPage,
  MilestoneEditPage,
  MilestoneListPage,
  SignupPage,
  NotFoundPage,
} from '@pages/index';

const App = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LoginPage} />
        <Route path='/signup' component={SignupPage} />
        <Route exact path='/issues' component={IssueListPage} />
        <Route exact path='/issues/new' component={IssueAddPage} />
        <Route path='/issues/:id' component={IssueDetailPage} />
        <Route path='/labels' component={LabelListPage} />
        <Route exact path='/milestones' component={MilestoneListPage} />
        <Route exact path='/milestones/new' component={MilestoneAddPage} />
        <Route path='/milestones/:id/edit' component={MilestoneEditPage} />
        <Route path='/milestones/:id' component={MilestoneDetailPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  </>
);

export default App;
