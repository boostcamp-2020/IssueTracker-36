import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dropdown from '@components/common/Dropdown';
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
  noSelection,
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
          />
        )}
        {selectedItems?.length
          ? selectedItems.map((selectedItem) => <div key={selectedItem}>{selectedItem}</div>)
          : noSelection}
      </Wrapper>
    </>
  );
};

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
        selectedItems={currentSelect.assignees}
        noSelection='No one'
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
        selectedItems={currentSelect.labels}
        noSelection='None yet'
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
        chageSelect={chageSelect}
        selectedItems={currentSelect.milestone}
        noSelection='No milestone'
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

IssueSidebar.propTypes = {
  currentSelect: PropTypes.object.isRequired,
  chageSelect: PropTypes.func.isRequired,
};

export default IssueSidebar;
