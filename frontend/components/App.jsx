import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from '@utils/PrivateRoute';
import { GlobalStyle, theme } from '@layouts/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import Store from '@store';
import {
  IssueAddPage,
  IssueDetailPage,
  IssueListPage,
  LoginPage,
  LoggingInPage,
  LabelMilestonePage,
  MilestoneAddPage,
  MilestoneDetailPage,
  SignupPage,
  NotFoundPage,
} from '@pages/index';

const App = () => (
  <Store>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <Route path='/oauth/callback/github' component={LoggingInPage} />
          <Route path='/signup' component={SignupPage} />
          <PrivateRoute exact path='/issues' component={IssueListPage} />
          <PrivateRoute exact path='/issues/new' component={IssueAddPage} />
          <PrivateRoute path='/issues/:id' component={IssueDetailPage} />
          <PrivateRoute path='/labels' component={LabelMilestonePage} />
          <PrivateRoute exact path='/milestones' component={LabelMilestonePage} />
          <PrivateRoute path='/milestones/:id/edit' component={LabelMilestonePage} />
          <PrivateRoute exact path='/milestones/new' component={MilestoneAddPage} />
          <PrivateRoute path='/milestones/:id' component={MilestoneDetailPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  </Store>
);
export default App;
