import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MilestoneContext } from '@store/MilestoneProvider';
import { GoMilestone, GoCheck } from 'react-icons/go';

const MilestoneHeader = ({ state, onChangeOpenState }) => {
  const [milestones] = useContext(MilestoneContext);
  return (
    <>
      <MilestoneListHeader>
        <td colSpan='2'>
          <HeaderText>
            <Btn onClick={() => onChangeOpenState(true)} selected={state === 'open'}>
              <GoMilestone />
              {milestones.open.length} Open
            </Btn>
            <Btn onClick={() => onChangeOpenState(false)} selected={state === 'close'}>
              <GoCheck />
              {milestones.close.length} Closed
            </Btn>
          </HeaderText>
        </td>
      </MilestoneListHeader>
    </>
  );
};
MilestoneHeader.propTypes = {
  state: PropTypes.bool.isRequired,
  onChangeOpenState: PropTypes.func.isRequired,
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
  height: 50px;
  padding-left: 40px;
  color: ${(props) => props.theme.color.grayColor};
  font-size: ${(props) => props.theme.fontSize.md};
`;
export default MilestoneHeader;
