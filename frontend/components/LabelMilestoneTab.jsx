import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TabEach from '@components/TabEach';
import { AiOutlineTag } from 'react-icons/ai';
import { GoMilestone } from 'react-icons/go';

const LabelMilesoneTab = ({ currentPage, labelsNumber, milestonesNumber }) => {
  const label = {
    name: 'Labels',
    image: AiOutlineTag,
    number: labelsNumber,
  };
  const milestone = {
    name: 'Milestones',
    image: GoMilestone,
    number: milestonesNumber,
  };
  const tabs = [label, milestone];

  return (
    <TabWrapper>
      {tabs.map((tab) => {
        return <TabEach currentPage={currentPage} info={tab} key={tab.name} />;
      })}
    </TabWrapper>
  );
};

const TabWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

LabelMilesoneTab.propTypes = {
  currentPage: PropTypes.string.isRequired,
  labelsNumber: PropTypes.number.isRequired,
  milestonesNumber: PropTypes.number.isRequired,
};

export default LabelMilesoneTab;
