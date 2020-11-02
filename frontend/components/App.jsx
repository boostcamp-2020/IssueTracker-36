import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from '@utils/PrivateRoute';
import {
  IssueAddPage,
  IssueDetailPage,
  IssueListPage,
  LabelListPage,
  LoginPage,
  LoggingInPage,
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
        <Route path='/oauth/callback/github' component={LoggingInPage} />
        <Route path='/signup' component={SignupPage} />
        <PrivateRoute exact path='/issues' component={IssueListPage} />
        <PrivateRoute exact path='/issues/new' component={IssueAddPage} />
        <PrivateRoute path='/issues/:id' component={IssueDetailPage} />
        <PrivateRoute path='/labels' component={LabelListPage} />
        <PrivateRoute exact path='/milestones' component={MilestoneListPage} />
        <PrivateRoute exact path='/milestones/new' component={MilestoneAddPage} />
        <PrivateRoute path='/milestones/:id/edit' component={MilestoneEditPage} />
        <PrivateRoute path='/milestones/:id' component={MilestoneDetailPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  </>
);

export default App;
