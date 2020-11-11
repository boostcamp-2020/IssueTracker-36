import React from 'react';
import Mytable from '@components/common/Table';
import MilestoneHeader from '@components/milestone/MilestoneListHeader';
import Milestone from '@components/milestone/Milestone';
import PropTypes from 'prop-types';

const MilestoneList = ({ milestoneList, state, open, close, getMilestones, milestoneListDispatch }) => {
  return (
    <>
      <Mytable
        width='100%'
        renderHeader={() => {
          return <MilestoneHeader state={state} open={open} close={close} getMilestones={getMilestones} />;
        }}
        renderBody={() => {
          return milestoneList.map((milestone) => {
            return (
              <Milestone
                milestone={milestone}
                key={milestone.id}
                milestoneListDispatch={milestoneListDispatch}
              />
            );
          });
        }}
      />
    </>
  );
};
MilestoneList.propTypes = {
  milestoneList: PropTypes.array.isRequired,
  state: PropTypes.string.isRequired,
  open: PropTypes.number.isRequired,
  close: PropTypes.number.isRequired,
  getMilestones: PropTypes.func.isRequired,
  milestoneListDispatch: PropTypes.func.isRequired,
};

export default MilestoneList;
