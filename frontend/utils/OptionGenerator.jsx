import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { GoCheck } from 'react-icons/go';
import { RiCloseLine } from 'react-icons/ri';
import { AiOutlineCalendar, AiOutlineWarning } from 'react-icons/ai';

const UserOption = ({ selected, nickName, clickAction }) => {
  const [isSelected, setIsSelected] = useState(selected);
  const onClick = () => {
    setIsSelected(!isSelected);
    clickAction();
  };

  return (
    <OptionWrapper onClick={onClick}>
      <CheckedWrapper>{isSelected && <GoCheck />}</CheckedWrapper>
      <p>{nickName}</p>
    </OptionWrapper>
  );
};

const users = ({ data }, selectedUser = [], clickAction) => {
  return data.reduce((acc, user) => {
    acc.push({
      id: user.id,
      div: (
        <UserOption
          selected={selectedUser.includes(user.id)}
          nickName={user.nickName}
          clickAction={() => {
            clickAction(user.id);
          }}
        />
      ),
    });
    return acc;
  }, []);
};

UserOption.propTypes = {
  selected: PropTypes.bool.isRequired,
  nickName: PropTypes.string.isRequired,
  clickAction: PropTypes.func.isRequired,
};

const LabelOption = ({ selected, label, clickAction }) => {
  const [isSelected, setIsSelected] = useState(selected);
  const onClick = () => {
    setIsSelected(!isSelected);
    clickAction();
  };

  return (
    <OptionWrapper key={label.id} onClick={onClick}>
      <CheckedWrapper>{isSelected && <GoCheck />}</CheckedWrapper>
      <LabelColor color={label.color} />
      <LabelInfoWrapper>
        <div>{label.title}</div>
        <LabelDescription>{label.description}</LabelDescription>
      </LabelInfoWrapper>
      <UnCheckWrapper>{isSelected && <RiCloseLine onClick={onClick} />}</UnCheckWrapper>
    </OptionWrapper>
  );
};

const labels = ({ data }, selectedLabels = [], clickAction = () => {}) => {
  return data.reduce((acc, label) => {
    acc.push({
      id: label.id,
      div: (
        <LabelOption
          selected={selectedLabels.includes(String(label.id))}
          label={label}
          clickAction={() => {
            clickAction(label.id);
          }}
        />
      ),
    });
    return acc;
  }, []);
};

const LabelColor = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const LabelInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 10px;
`;

const LabelDescription = styled.div`
  margin-top: 3px;
  color: gray;
  font-weight: lighter;
`;

const UnCheckWrapper = styled.div`
  width: 20px;
`;

LabelOption.propTypes = {
  selected: PropTypes.bool.isRequired,
  label: PropTypes.object.isRequired,
};

const MilestoneOption = ({ selected, dueDate, title, clickAction }) => {
  const [isSelected, setIsSelected] = useState(selected);
  const onClick = () => {
    setIsSelected(!isSelected);
    clickAction();
  };

  return (
    <OptionWrapper onClick={onClick}>
      <CheckedWrapper>{isSelected && <GoCheck />}</CheckedWrapper>
      <MilestoneBody>
        <MilestoneTitle>{title}</MilestoneTitle>
        {moment(dueDate).isAfter(new Date()) ? (
          <MilestoneDueInfo>
            <AiOutlineCalendar />
            <div>Milestone due by {moment(dueDate).format('YYYY/MM/DD')}</div>
          </MilestoneDueInfo>
        ) : (
          <MilestoneDueInfo style={{ color: 'red' }}>
            <AiOutlineWarning />
            <div>Past due by {moment(new Date()).diff(moment(dueDate), 'days') + 1} days</div>
          </MilestoneDueInfo>
        )}
      </MilestoneBody>
    </OptionWrapper>
  );
};

const milestones = ({ data }, selectedMilestone = [], clickAction = () => {}) => {
  return data.reduce((acc, milestone) => {
    acc.push({
      id: milestone.id,
      div: (
        <MilestoneOption
          selected={selectedMilestone[0] === milestone.id}
          title={milestone.title}
          dueDate={new Date(milestone.dueDate)}
          clickAction={() => {
            clickAction(milestone.id);
          }}
        />
      ),
    });
    return acc;
  }, []);
};

const MilestoneBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const MilestoneTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const MilestoneDueInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 7px;
  > svg {
    margin-right: 7px;
  }
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
`;

const CheckedWrapper = styled.div`
  width: 20px;
`;

const MarkAsOption = ({ type = '', clickAction = () => {} }) => {
  return (
    <OptionWrapper onClick={clickAction}>
      <p>{type}</p>
    </OptionWrapper>
  );
};

const markAs = (data, clickAction = () => {}) => {
  console.log(data);
  return data.reduce((acc, action) => {
    acc.push({
      id: action.id,
      div: (
        <MarkAsOption
          type={action.type}
          clickAction={() => {
            clickAction(action.type);
          }}
        />
      ),
    });
    return acc;
  }, []);
};
export default { users, labels, milestones, markAs };
