import React, { useState, useContext } from 'react';
import MilestoneList from '@components/milestone/MilestoneList';
import { MilestoneContext } from '@store/MilestoneProvider';

const MilestoneListPage = () => {
  const [milestones, dispatch] = useContext(MilestoneContext);
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
