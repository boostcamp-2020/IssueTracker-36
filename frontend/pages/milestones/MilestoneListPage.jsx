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
  const getOpen = async () => {
    const milestones = await service.getMilestones({ isClosed: FALSE });
    setOpenMilestone(milestones.data);
  };
  const getClosed = async () => {
    const milestones = await service.getMilestones({ isClosed: TRUE });
    setClosedMilestone(milestones.data);
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
    getOpen();
    getClosed();
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
