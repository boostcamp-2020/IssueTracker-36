import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
  const [dropdown, setDropdown] = useState('');
  const [options, setOptions] = useState([]);
  const [data, setData] = useState({
    users: [],
    labels: [],
    milestones: [],
  });
  const toggleDropdown = () => {
    setDropdown('');
    setOptions([]);
  };

  const onClick = async (tabName) => {
    setDropdown(tabName);
    if (tabName === 'assignee') {
      const users = await service.getUsers();
      setData({ ...data, users });
      setOptions(optionGenerator.users(users, currentSelect.assignees));
    } else if (tabName === 'label') {
      const labels = await service.getLabels();
      setData({ ...data, labels });
      setOptions(optionGenerator.labels(labels, currentSelect.labels));
    } else if (tabName === 'milestone') {
      const milestones = await service.getMilestones({});
      setData({ ...data, milestones });
      setOptions(optionGenerator.milestones(milestones, currentSelect.milestone));
    }
  };

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
          return currentSelect.assignees.map((assignee) => {
            return (
              <SelectedUser key={assignee}>
                {data.users.data.find((user) => user.id === assignee).nickName}
              </SelectedUser>
            );
          });
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
          return currentSelect.labels.map((labelId) => {
            const currentLabel = data.labels.data.find((label) => label.id === labelId);
            return <Label key={labelId} text={currentLabel.title} bg={currentLabel.color} />;
          });
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
          const selectedMilestone = data.milestones.data.find(
            (milestone) => milestone.id === currentSelect.milestone[0],
          );
          return (
            <div>
              <ProgressBar
                progress={
                  ((selectedMilestone?.closedIssueNumber || 0) * 100) /
                  (selectedMilestone?.closedIssueNumber + selectedMilestone?.openedIssueNumber)
                }
              />
              {selectedMilestone?.title}
            </div>
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
