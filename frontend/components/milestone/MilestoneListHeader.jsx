import React, { useContext } from 'react';
import styled from 'styled-components';
import { GoMilestone, GoCheck } from 'react-icons/go';
import PropTypes from 'prop-types';
import { MilestoneContext } from '@store/MilestoneProvider';

const MilestoneHeader = ({ state, onChangeOpenState }) => {
  const [milestones] = useContext(MilestoneContext);
  return (
    <>
      <MilestoneListHeader>
        <td colSpan='2'>
          <HeaderText>
            <Btn onClick={() => onChangeOpenState(true)} style={{ color: state ? 'black' : '' }}>
              <GoMilestone />
              {milestones.open.length} Open
            </Btn>
            <Btn onClick={() => onChangeOpenState(false)} style={{ color: !state ? 'black' : '' }}>
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
