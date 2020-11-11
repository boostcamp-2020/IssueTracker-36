import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { MilestoneContext } from '@store/MilestoneProvider';
import { milestoneActions } from '@store/actions';
import MilestoneGraph from '@components/milestone/MilestoneGraph';
import service from '@services';
import { GoCalendar } from 'react-icons/go';

const Milestone = ({ milestone }) => {
  const history = useHistory();
  const [, dispatch] = useContext(MilestoneContext);
  const { id, title, isClosed, description, dueDate, closedIssueNumber, openedIssueNumber } = milestone;

  const clickEditBtn = () => {
    history.push(`/milestones/${id}/edit`);
  };
  const clickCloseBtn = async () => {
    try {
      await service.changeClosed(id, !isClosed);
      //TODO: status 변경 이후 작업
    } catch (e) {
      alert('오류가 발생했습니다');
    }
  };

  const clickDeleteBtn = async () => {
    try {
      if (confirm('삭제하시겠습니까?')) {
        await service.deleteMilestone(id, isClosed);
        dispatch({
          type: milestoneActions.DELETE_MILESTONE,
          payload: id,
        });
      }
    } catch (e) {
      alert('오류가 발생했습니다');
    }
  };

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
        <BTN onClick={() => clickEditBtn()}>Edit</BTN>
        <BTN onClick={() => clickCloseBtn()}>{isClosed ? 'Reopen' : 'Close'}</BTN>
        <DeleteBTN onClick={() => clickDeleteBtn()}>Delete</DeleteBTN>
      </TD>
    </TR>
  );
};
Milestone.propTypes = {
  milestone: PropTypes.object.isRequired,
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
