import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import LabelMilestoneTab from '@components/LabelMilestoneTab';
import LabelListPage from '@pages/labels/LabelListPage';
import MilestoneListPage from '@pages/milestones/MilestoneListPage';
import MilestoneEditPage from '@pages/milestones/MilestoneEditPage';
import Layout from '@layouts/MainPageLayout';

const LabelMilestonePage = ({ location }) => {
  return (
    <Layout>
      <LabelMilestoneTab currentPage={location.pathname} />
      <Switch>
        <Route path='/labels' component={LabelListPage} />
        <Route exact path='/milestones' component={MilestoneListPage} />
        <Route path='/milestones/:id/edit' component={MilestoneEditPage} />
      </Switch>
    </Layout>
  );
};

LabelMilestonePage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default LabelMilestonePage;
