import React, { useEffect, useState } from 'react';
import ProgressBar from '@components/common/ProgressBar';
import service from '@services';
import PropTypes from 'prop-types';

const MilestoneGraph = ({ id, graphDescription }) => {
  const [progress, setProgress] = useState(0);
  const [openNum, setOpenNum] = useState([]);
  const [closedNum, setClosedNum] = useState([]);
  const getProgress = async () => {
    const milestone = await service.getMilestone(id);
    const closed = milestone.data.issues.filter((value) => {
      return !value.isClosed;
    });
    const total = milestone.data.issues.length;
    const completed = Math.floor((closed.length / total) * 100) || 0;
    setProgress(completed);
    setClosedNum(closed.length);
    setOpenNum(total - closed.length);
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
  id: PropTypes.number.isRequired,
  graphDescription: PropTypes.bool,
};
MilestoneGraph.defaultProps = {
  graphDescription: false,
};
export default MilestoneGraph;
