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
            <Btn onClick={() => getMilestones('open')} selected={state === 'open'}>
              <GoMilestone />
              {open.length} Open
            </Btn>
            <Btn onClick={() => getMilestones('close')} selected={state === 'close'}>
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
`;
const Btn = styled.button`
  margin-right: 15px;
  color: ${(props) => (props.selected ? 'black' : props.theme.color.grayColor)};
  font-weight: ${(props) => props.selected && 'bold'};
  > svg {
    margin-right: 5px;
  }
`;
const HeaderText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60px;
  padding-left: 40px;
  color: ${(props) => props.theme.color.grayColor};
  font-size: ${(props) => props.theme.fontSize.md};
`;
export default MilestoneHeader;
