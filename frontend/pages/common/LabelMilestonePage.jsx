import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import LabelListPage from '@pages/labels/LabelListPage';
import MilestoneListPage from '@pages/milestones/MilestoneListPage';
import MilestoneEditPage from '@pages/milestones/MilestoneEditPage';
import Layout from '@layouts/MainPageLayout';
import LabelMilestonePageNavbar from './LabelMilestonePageNavbar';

const LabelMilestonePage = ({ location }) => {
  const [newButton, setNewButton] = useState('');

  return (
    <Layout>
      <LabelMilestonePageNavbar location={location} newButton={newButton} />
      <Switch>
        <Route path='/labels' render={() => <LabelListPage setNewButton={setNewButton} />} />
        <Route
          exact
          path='/milestones'
          render={({ match }) => <MilestoneListPage setNewButton={setNewButton} match={match} />}
        />
        <Route path='/milestones/:id/edit' component={MilestoneEditPage} />
      </Switch>
    </Layout>
  );
};

LabelMilestonePage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default LabelMilestonePage;
