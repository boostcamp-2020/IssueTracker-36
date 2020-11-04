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
  const label = infoGenerator(
    'Labels',
    AiOutlineTag,
    labelsNumber,
    '/labels',
    currentPage.startsWith('/labels'),
  );
  const milestone = infoGenerator(
    'Milestones',
    GoMilestone,
    milestonesNumber,
    '/milestones',
    currentPage.startsWith('/milestones'),
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
  currentPage: PropTypes.string,
  labelsNumber: PropTypes.number,
  milestonesNumber: PropTypes.number,
};

LabelMilestoneTab.defaultProps = {
  currentPage: '',
  labelsNumber: 0,
  milestonesNumber: 0,
};

export default LabelMilestoneTab;
