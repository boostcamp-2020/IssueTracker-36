import React, { useEffect, useState } from 'react';
import service from '@services';
import userInfo from '@utils/user-info';
import PropTypes from 'prop-types';

const UserContext = React.createContext({});
const LabelContext = React.createContext({});
const MilestoneContext = React.createContext({});

const Store = ({ children }) => {
  const [user, setUser] = useState({});
  const [labels, setLabels] = useState({});
  const [milestones, setMilestones] = useState({ open: [], close: [] });

  useEffect(() => {
    if (!userInfo.authorized) return;
    service
      .getUsers()
      .then(({ data }) => setUser(data))
      .catch(console.log);
    service
      .getLabels()
      .then(({ data }) => setLabels(data))
      .catch(console.log);
    Promise.all([service.getMilestones({ isClosed: 0 }), service.getMilestones({ isClosed: 1 })])
      .then(([{ data: open }, { data: close }]) => {
        setMilestones({ open, close });
      })
      .catch(console.log);
  }, []);
  return (
    <UserContext.Provider value={user}>
      <LabelContext.Provider value={labels}>
        <MilestoneContext.Provider value={milestones}>{children}</MilestoneContext.Provider>
      </LabelContext.Provider>
    </UserContext.Provider>
  );
};
Store.propTypes = {
  children: PropTypes.element.isRequired,
};
export default Store;
export { UserContext, LabelContext, MilestoneContext };
