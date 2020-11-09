import React, { useState } from 'react';
import styled from 'styled-components';
import Dropdown from '@components/common/Dropdown';
import optionGenerator from '@utils/OptionGenerator';
import service from '@services';
import { RiSettings4Line } from 'react-icons/ri';

const IssueSidebar = ({ currentSelect, chageSelect }) => {
  const [dropdown, setDropdown] = useState('');
  const [options, setOptions] = useState([]);
  const toggleDropdown = () => {
    setDropdown('');
    setOptions([]);
  };

  const onClick = async (tabName) => {
    setDropdown(tabName);
    switch (tabName) {
      case 'assignee':
        setOptions(optionGenerator.users(await service.getUsers(), currentSelect.assignees));
        break;
      case 'label':
        setOptions(optionGenerator.labels(await service.getLabels()));
        break;
      case 'milestone':
        setOptions(optionGenerator.milestones(await service.getMilestones({})));
        break;
      default:
        setOptions([]);
    }
  };

  return (
    <>
      <Wrapper>
        <Title
          onClick={() => {
            onClick('assignee');
          }}
        >
          <p>Assignee</p>
          <RiSettings4Line />
        </Title>
        {dropdown === 'assignee' && (
          <Dropdown
            title='Assign up to 10 people to this issue'
            toggleDropdown={toggleDropdown}
            width='100%'
            options={options}
            defaultSelect={currentSelect.assignees}
            onChange={(selected) => {
              chageSelect({ type: 'assignee', newSelection: selected });
            }}
          />
        )}
        {currentSelect.assignees.length
          ? currentSelect.assignees.map((selectedAssignee) => (
              <div key={selectedAssignee}>{selectedAssignee}</div>
            ))
          : 'No one'}
      </Wrapper>
      <Wrapper>
        <Title
          onClick={() => {
            onClick('label');
          }}
        >
          <p>Label</p>
          <RiSettings4Line />
        </Title>
        {dropdown === 'label' && (
          <Dropdown
            title='Apply labels to this issue'
            toggleDropdown={toggleDropdown}
            width='100%'
            options={options}
            defaultSelect={currentSelect.labels}
            onChange={(selected) => {
              chageSelect({ type: 'label', newSelection: selected });
            }}
          />
        )}
        {currentSelect.labels.length
          ? currentSelect.labels.map((selectedLabel) => <div key={selectedLabel}>{selectedLabel}</div>)
          : 'None yet'}
      </Wrapper>
      <Wrapper>
        <Title
          onClick={() => {
            onClick('milestone');
          }}
        >
          <p>Milestone</p>
          <RiSettings4Line />
        </Title>
        {dropdown === 'milestone' && (
          <Dropdown title='Set milestone' toggleDropdown={toggleDropdown} width='100%' options={options} />
        )}
        {currentSelect.milestone ? '' : 'No milestone'}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: relative;
  padding: 20px 0;
  border-bottom: 1px solid gray;
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

export default IssueSidebar;
