import React from 'react';
import styled from 'styled-components';
import { GoMilestone, GoCheck } from 'react-icons/go';
import PropTypes from 'prop-types';

const MilestoneHeader = ({ state, open, close, getMilestones }) => {
  return (
    <>
      <MilestoneListHeader>
        <td colSpan='2'>
          <HeaderText>
            <Btn onClick={() => getMilestones('open')} style={{ color: state === 'open' ? 'black' : '' }}>
              <GoMilestone />
              {open.length} Open
            </Btn>
            <Btn onClick={() => getMilestones('close')} style={{ color: state === 'close' ? 'black' : '' }}>
              <GoCheck />
              {close.length} Closed
            </Btn>
          </HeaderText>
        </td>
      </MilestoneListHeader>
    </>
  );
};
MilestoneHeader.propTypes = {
  state: PropTypes.string.isRequired,
  open: PropTypes.array.isRequired,
  close: PropTypes.array.isRequired,
  getMilestones: PropTypes.func.isRequired,
};

const MilestoneListHeader = styled.tr`
  background-color: #eee;
  height: 60px;
  padding-left: 18px;
`;
const Btn = styled.button`
  color: ${(props) => props.theme.color.grayColor};
`;
const HeaderText = styled.p`
  color: ${(props) => props.theme.color.grayColor};
  font-size: ${(props) => props.theme.fontSize.md};
  padding-left: 20px;
`;
export default MilestoneHeader;
