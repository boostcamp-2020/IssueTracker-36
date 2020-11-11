import React from 'react';
import PropTypes from 'prop-types';
import { LabelProvider } from '@store/LabelProvider';
import { MilestoneProvider } from '@store/MilestoneProvider';
import { UserProvider } from '@store/UserProvider';

const Store = ({ children }) => (
  <UserProvider>
    <LabelProvider>
      <MilestoneProvider>{children}</MilestoneProvider>
    </LabelProvider>
  </UserProvider>
);

Store.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Store;
