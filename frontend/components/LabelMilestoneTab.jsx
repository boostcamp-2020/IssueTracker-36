import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TabButton from '@components/TabButton';
import { AiOutlineTag } from 'react-icons/ai';
import { GoMilestone } from 'react-icons/go';

const LabelMilestoneTab = ({ currentPage, labelsNumber, milestonesNumber }) => {
  const infoGenerator = (name, image, number, url, isSelected) => ({
    name,
    image,
    number,
    url,
    isSelected,
  });
  const label = infoGenerator('Labels', AiOutlineTag, labelsNumber, '/labels', currentPage === 'labels');
  const milestone = infoGenerator(
    'Milestones',
    GoMilestone,
    milestonesNumber,
    '/milestones',
    currentPage === 'milestones',
  );
  const tabs = [label, milestone];

  return (
    <TabWrapper>
      {tabs.map((tab) => {
        return <TabButton currentPage={currentPage} info={tab} key={tab.name} />;
      })}
    </TabWrapper>
  );
};

const TabWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

LabelMilestoneTab.propTypes = {
  currentPage: PropTypes.string.isRequired,
  labelsNumber: PropTypes.number.isRequired,
  milestonesNumber: PropTypes.number.isRequired,
};

export default LabelMilestoneTab;
