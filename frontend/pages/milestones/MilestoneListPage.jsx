import React, { useEffect, useState } from 'react';
import service from '@services';
import MilestoneList from '@components/milestone/MilestoneList';

const MilestoneListPage = () => {
  const [open, setOpenMilestone] = useState([]);
  const [close, setClosedMilestone] = useState([]);
  const [milestoneList, setMilestoneList] = useState([]);
  const [state, setState] = useState('open');
  const TRUE = 1;
  const FALSE = 0;

  const getNumber = async () => {
    const openedMilestones = await service.getMilestones({ isClosed: FALSE });
    const closedMilestones = await service.getMilestones({ isClosed: TRUE });
    setOpenMilestone(openedMilestones.data);
    setClosedMilestone(closedMilestones.data);
  };
  const getMilestones = async (status) => {
    const milestones =
      status === 'close'
        ? await service.getMilestones({ isClosed: TRUE })
        : await service.getMilestones({ isClosed: FALSE });
    setMilestoneList(milestones.data);
    setState(status);
  };
  useEffect(() => {
    getNumber();
    getMilestones('open');
  }, []);
  return (
    <>
      <MilestoneList
        milestoneList={milestoneList}
        state={state}
        open={open}
        close={close}
        getMilestones={getMilestones}
      />
    </>
  );
};

export default MilestoneListPage;
