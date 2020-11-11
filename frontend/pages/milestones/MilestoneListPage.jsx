import React, { useEffect, useState, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import service from '@services';
import MilestoneList from '@components/milestone/MilestoneList';
import Button from '@components/common/Button';
import reducer from './milestone-list-page-reducer';

const MilestoneListPage = ({ setNewButton }) => {
  const [milestoneList, milestoneListDispatch] = useReducer(reducer, { open: 0, close: 0, milestones: [] });
  const [state, setState] = useState('open');
  const history = useHistory();
  const TRUE = 1;
  const FALSE = 0;

  const getNumber = async () => {
    const openedMilestones = await service.getMilestones({ isClosed: FALSE });
    const closedMilestones = await service.getMilestones({ isClosed: TRUE });
    milestoneListDispatch({
      type: 'setNumber',
      open: openedMilestones.data.length,
      close: closedMilestones.data.length,
    });
  };
  const getMilestones = async (status) => {
    const milestones =
      status === 'close'
        ? await service.getMilestones({ isClosed: TRUE })
        : await service.getMilestones({ isClosed: FALSE });
    milestoneListDispatch({ type: 'init', data: milestones.data });
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
        milestoneList={milestoneList.milestones}
        state={state}
        open={milestoneList.open}
        close={milestoneList.close}
        getMilestones={getMilestones}
        milestoneListDispatch={milestoneListDispatch}
      />
    </>
  );
};

MilestoneListPage.propTypes = {
  setNewButton: PropTypes.func.isRequired,
};

export default MilestoneListPage;
