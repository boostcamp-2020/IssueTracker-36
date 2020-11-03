import React from 'react';
import PropTypes from 'prop-types';
import TabEach from '@components/TabEach';
import { AiOutlineTag } from 'react-icons/ai';
import { GoMilestone } from 'react-icons/go';

const LabelMilesoneTab = ({ currentPage, labelsNumber, milestonesNumber }) => {
  const label = {
    name: 'Labels',
    image: AiOutlineTag,
    count: labelsNumber,
  };
  const milestone = {
    name: 'Milestones',
    image: GoMilestone,
    count: milestonesNumber,
  };
  const tabs = [label, milestone];

  return (
    <>
      {tabs.map((tab) => {
        return <TabEach currentPage={currentPage} info={tab} />;
      })}
    </>
  );
};

LabelMilesoneTab.propTypes = {
  currentPage: PropTypes.string.isRequired,
  labelsNumber: PropTypes.number.isRequired,
  milestonesNumber: PropTypes.number.isRequired,
};

export default LabelMilesoneTab;
