import React from 'react';
import PropTypes from 'prop-types';
import Mytable from '@components/common/Table';
import MilestoneHeader from '@components/milestone/MilestoneListHeader';
import Milestone from '@components/milestone/Milestone';

const MilestoneList = ({ milestoneList, state, onChangeOpenState }) => {
  return (
    <>
      <Mytable
        width='100%'
        renderHeader={() => {
          return <MilestoneHeader state={state} onChangeOpenState={onChangeOpenState} />;
        }}
        renderBody={() => {
          return milestoneList.map((milestone) => {
            return <Milestone milestone={milestone} key={milestone.id} />;
          });
        }}
      />
    </>
  );
};
MilestoneList.propTypes = {
  milestoneList: PropTypes.array.isRequired,
  state: PropTypes.bool.isRequired,
  onChangeOpenState: PropTypes.func.isRequired,
};

export default MilestoneList;
