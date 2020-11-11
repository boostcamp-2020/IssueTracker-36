import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { GoCalendar } from 'react-icons/go';
import Moment from 'react-moment';
import MilestoneGraph from '@components/milestone/MilestoneGraph';
import service from '@services';

const Milestone = ({ milestone, milestoneListDispatch }) => {
  const clickEditBtn = async (id) => {
    // TODO:수정
    console.log(id);
  };
  const clickCloseBtn = async (id, isClosed) => {
    // TODO: close
    console.log(id);
  };
  const clickDeleteBtn = async (id, isClosed) => {
    try {
      if (confirm('삭제하시겠습니까?')) {
        await service.deleteMilestone(id);
        milestoneListDispatch({ type: 'delete', id, isClosed });
      }
    } catch (e) {
      alert('오류가 발생했습니다');
    }
  };
  const { id, title, description, dueDate, isClosed, closedIssueNumber, openedIssueNumber } = milestone;
  return (
    <TR>
      <Info>
        <Title>{title}</Title>
        <br />
        <ContentWrapper>
          <GoCalendar />
          {dueDate ? (
            <>
              Due by
              <Moment format='MM,DD,YYYY'>{dueDate}</Moment>
            </>
          ) : (
            'No due date'
          )}
          <br />
          {description && description}
        </ContentWrapper>
      </Info>
      <TD>
        <div>
          <MilestoneGraph
            closedIssueNumber={closedIssueNumber}
            openedIssueNumber={openedIssueNumber}
            graphDescription
          />
        </div>
        <br />
        <BTN onClick={() => clickEditBtn(id)}>Edit</BTN>
        <BTN onClick={() => clickCloseBtn(id, isClosed)}>{isClosed ? 'Reopen' : 'Close'}</BTN>
        <DeleteBTN onClick={() => clickDeleteBtn(id, isClosed)}>Delete</DeleteBTN>
      </TD>
    </TR>
  );
};
Milestone.propTypes = {
  milestone: PropTypes.object.isRequired,
  milestoneListDispatch: PropTypes.func.isRequired,
};

const TR = styled.tr`
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  padding: 10px;
  &:hover {
    background-color: ${({ theme }) => theme.color.hoverBgColor};
  }
`;

const TD = styled.td`
  padding: 15px 20px;
`;
const Info = styled(TD)`
  width: 470px;
`;

const Title = styled.h1`
  font-size: 1.5em;
  color: ${(props) => props.theme.color.blackColor};
`;

const ContentWrapper = styled.div`
  color: ${({ theme }) => theme.color.secondaryTextColor};
  > svg {
    margin-right: 10px;
  }
`;

const BTN = styled.button`
  color: ${(props) => props.theme.color.blueColor};
  font-size: ${(props) => props.theme.fontSize.md};
  margin-right: 20px;
  cursor: pointer;
`;
const DeleteBTN = styled(BTN)`
  color: ${(props) => props.theme.color.redColor};
`;

export default Milestone;
