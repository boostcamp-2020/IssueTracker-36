import React, { useEffect, useState } from 'react';
import ProgressBar from '@components/common/ProgressBar';
import PropTypes from 'prop-types';

const MilestoneGraph = ({ closedIssueNumber, openedIssueNumber, graphDescription }) => {
  const [progress, setProgress] = useState(0);
  const [openNum, setOpenNum] = useState([]);
  const [closedNum, setClosedNum] = useState([]);
  const getProgress = () => {
    const completed = Math.floor((closedIssueNumber / (closedIssueNumber + openedIssueNumber)) * 100) || 0;
    setProgress(completed);
    setClosedNum(closedIssueNumber);
    setOpenNum(openedIssueNumber);
  };
  useEffect(() => {
    getProgress();
  }, []);
  return (
    <>
      <ProgressBar progress={progress} />
      {graphDescription && <div>{`${progress}% Completed ${openNum} Open ${closedNum} Closed`}</div>}
    </>
  );
};

MilestoneGraph.propTypes = {
  closedIssueNumber: PropTypes.number.isRequired,
  openedIssueNumber: PropTypes.number.isRequired,
  graphDescription: PropTypes.bool,
};
MilestoneGraph.defaultProps = {
  graphDescription: false,
};
export default MilestoneGraph;
