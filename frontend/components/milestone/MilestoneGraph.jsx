import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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
      {graphDescription && (
        <InfoWrapper>
          <Info>
            <Number>{progress}%&nbsp;</Number>Completed
          </Info>
          <Info>
            <Number>{openNum}&nbsp;</Number>Open
          </Info>
          <Info>
            <Number>{closedNum}&nbsp;</Number> Closed
          </Info>
        </InfoWrapper>
      )}
    </>
  );
};

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
`;

const Info = styled.span`
  display: flex;
  flex-direction: row;
  padding-right: 20px;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const Number = styled.p`
  /* margin-right: 5px; */
  font-weight: bold;
`;

MilestoneGraph.propTypes = {
  closedIssueNumber: PropTypes.number.isRequired,
  openedIssueNumber: PropTypes.number.isRequired,
  graphDescription: PropTypes.bool,
};
MilestoneGraph.defaultProps = {
  graphDescription: false,
};
export default MilestoneGraph;
