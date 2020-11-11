import React, { useState, useContext } from 'react';
import MilestoneList from '@components/milestone/MilestoneList';
import { MilestoneContext } from '@utils/store/Store';

const MilestoneListPage = () => {
  const milestones = useContext(MilestoneContext);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <MilestoneList
        milestoneList={isOpen ? milestones.open : milestones.close}
        state={isOpen}
        onChangeState={setIsOpen}
      />
    </>
  );
};

export default MilestoneListPage;
