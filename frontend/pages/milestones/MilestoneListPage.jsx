import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MilestoneContext } from '@store/MilestoneProvider';
import MilestoneList from '@components/milestone/MilestoneList';
import Button from '@components/common/Button';

const MilestoneListPage = ({ setNewButton }) => {
  const history = useHistory();
  const [milestones] = useContext(MilestoneContext);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
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
        milestoneList={isOpen ? milestones.open : milestones.close}
        state={isOpen}
        onChangeOpenState={setIsOpen}
      />
    </>
  );
};

MilestoneListPage.propTypes = {
  setNewButton: PropTypes.func.isRequired,
};

export default MilestoneListPage;
