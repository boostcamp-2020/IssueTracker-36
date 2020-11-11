import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import service from '@services';
import MilestoneList from '@components/milestone/MilestoneList';
import Button from '@components/common/Button';

const MilestoneListPage = ({ setNewButton }) => {
  const [open, setOpenMilestone] = useState([]);
  const [close, setClosedMilestone] = useState([]);
  const [milestoneList, setMilestoneList] = useState([]);
  const [state, setState] = useState('open');
  const history = useHistory();
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
    const newMilestoneButton = (
      <Button
        text='New milestone'
        size='large'
        onClick={() => {
          history.push('/milestones/new');
        }}
      />
    );
    setNewButton(newMilestoneButton);
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

MilestoneListPage.propTypes = {
  setNewButton: PropTypes.func.isRequired,
};

export default MilestoneListPage;
