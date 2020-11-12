import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MilestoneContext } from '@store/MilestoneProvider';
import { LabelContext } from '@store/LabelProvider';
import Dropdown from '@components/common/Dropdown';
import Label from '@components/common/Label';
import ProgressBar from '@components/common/ProgressBar';
import optionGenerator from '@utils/OptionGenerator';
import service from '@services';
import { RiSettings4Line } from 'react-icons/ri';

const SidebarTab = ({
  dropdown,
  type,
  onClick,
  title,
  dropdownTitle,
  options,
  toggleDropdown,
  defaultSelect,
  chageSelect,
  selectedItems,
  allowMultiple,
}) => {
  return (
    <>
      <Wrapper>
        <Title onClick={onClick}>
          <p>{title}</p>
          <RiSettings4Line />
        </Title>
        {dropdown === type && (
          <Dropdown
            title={dropdownTitle}
            toggleDropdown={toggleDropdown}
            width='100%'
            options={options}
            defaultSelect={defaultSelect}
            onChange={(selected) => {
              chageSelect({ type, newSelection: selected });
            }}
            allowMultiple={allowMultiple}
          />
        )}
        {selectedItems()}
      </Wrapper>
    </>
  );
};

const IssueSidebar = ({ currentSelect, chageSelect }) => {
  const [milestones] = useContext(MilestoneContext);
  const [labels] = useContext(LabelContext);
  const [users, setUsers] = useState([]);
  const [dropdown, setDropdown] = useState('');
  const [options, setOptions] = useState([]);

  const toggleDropdown = () => {
    setDropdown('');
    setOptions([]);
  };

  const onClick = async (tabName) => {
    setDropdown(tabName);
    if (tabName === 'assignee') {
      setOptions(optionGenerator.users({ data: users }, currentSelect.assignees));
    } else if (tabName === 'label') {
      setOptions(optionGenerator.labels({ data: labels }, currentSelect.labels));
    } else if (tabName === 'milestone') {
      setOptions(optionGenerator.milestones({ data: milestones.open }, currentSelect.milestone));
    }
  };

  useEffect(async () => {
    const { data } = await service.getUsers();
    setUsers(data);
  }, []);

  return (
    <>
      <SidebarTab
        dropdown={dropdown}
        type='assignee'
        onClick={() => {
          onClick('assignee');
        }}
        title='Assignee'
        dropdownTitle='Assign up to 10 people to this issue'
        options={options}
        toggleDropdown={toggleDropdown}
        defaultSelect={currentSelect.assignees}
        chageSelect={chageSelect}
        allowMultiple
        selectedItems={() => {
          if (!currentSelect.assignees.length) return <div>No one</div>;
          return (
            users.length &&
            currentSelect.assignees.map((assignee) => {
              return (
                <SelectedUser key={assignee}>
                  {users.find((user) => user.id === assignee).nickName}
                </SelectedUser>
              );
            })
          );
        }}
      />
      <SidebarTab
        dropdown={dropdown}
        type='label'
        onClick={() => {
          onClick('label');
        }}
        title='Label'
        dropdownTitle='Apply labels to this issue'
        options={options}
        toggleDropdown={toggleDropdown}
        defaultSelect={currentSelect.labels}
        chageSelect={chageSelect}
        allowMultiple
        selectedItems={() => {
          if (!currentSelect.labels.length) return <div>None yet</div>;
          return (
            labels.length &&
            currentSelect.labels.map((labelId) => {
              const currentLabel = labels.find((label) => label.id === labelId);
              return <Label key={labelId} text={currentLabel.title} bg={currentLabel.color} />;
            })
          );
        }}
      />
      <SidebarTab
        dropdown={dropdown}
        type='milestone'
        onClick={() => {
          onClick('milestone');
        }}
        title='Milestone'
        dropdownTitle='Set milestone'
        options={options}
        toggleDropdown={toggleDropdown}
        defaultSelect={currentSelect.milestone}
        chageSelect={({ type, newSelection }) => {
          chageSelect({ type, newSelection });
          if (newSelection.length && newSelection[0] !== currentSelect.milestone[0]) toggleDropdown();
        }}
        allowMultiple={false}
        selectedItems={() => {
          if (!currentSelect.milestone.length) return <div>No milestone</div>;
          const selectedMilestone =
            milestones.open.find((milestone) => milestone.id === currentSelect.milestone[0]) ||
            milestones.close.find((milestone) => milestone.id === currentSelect.milestone[0]);
          return (
            selectedMilestone && (
              <div>
                <ProgressBar
                  progress={
                    ((selectedMilestone?.closedIssueNumber || 0) * 100) /
                    (selectedMilestone?.closedIssueNumber + selectedMilestone?.openedIssueNumber)
                  }
                />
                {selectedMilestone?.title}
              </div>
            )
          );
        }}
      />
    </>
  );
};

const Wrapper = styled.div`
  position: relative;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.borderColor};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.blueColor};
  }
`;

const SelectedUser = styled.div`
  padding: 5px;
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

IssueSidebar.propTypes = {
  currentSelect: PropTypes.object.isRequired,
  chageSelect: PropTypes.func.isRequired,
};

export default IssueSidebar;
