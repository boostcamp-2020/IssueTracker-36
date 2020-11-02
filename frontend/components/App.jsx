import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login';
import LoggingIn from './LoggingIn';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/oauth/callback/github' component={LoggingIn} />
    </Switch>
  </BrowserRouter>
);

export default App;
