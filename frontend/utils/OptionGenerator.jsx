import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GoCheck } from 'react-icons/go';
import { RiCloseLine } from 'react-icons/ri';

const UserOption = ({ selected, nickName }) => {
  const [isSelected, setIsSelected] = useState(selected);
  const onClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <UserOptionWrapper onClick={onClick}>
      <CheckedWrapper>{isSelected && <GoCheck />}</CheckedWrapper>
      <p>{nickName}</p>
    </UserOptionWrapper>
  );
};

const users = ({ data }, selectedUser = []) => {
  return data.reduce((acc, user) => {
    acc.push({
      id: user.id,
      div: <UserOption selected={selectedUser.indexOf(user.id) !== -1} nickName={user.nickName} />,
    });
    return acc;
  }, []);
};

const UserOptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

UserOption.propTypes = {
  selected: PropTypes.bool.isRequired,
  nickName: PropTypes.string.isRequired,
};

const LabelOption = ({ selected, label }) => {
  const [isSelected, setIsSelected] = useState(selected);
  const onClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <LabelOptionWrapper key={label.id} onClick={onClick}>
      <CheckedWrapper>{isSelected && <GoCheck />}</CheckedWrapper>
      <LabelColor color={label.color} />
      <LabelInfoWrapper>
        <div>{label.title}</div>
        <LabelDescription>{label.description}</LabelDescription>
      </LabelInfoWrapper>
      <UnCheckWrapper>{isSelected && <RiCloseLine onClick={onClick} />}</UnCheckWrapper>
    </LabelOptionWrapper>
  );
};

const labels = ({ data }, selectedLabels = []) => {
  return data.reduce((acc, label) => {
    acc.push({
      id: label.id,
      div: <LabelOption selected={selectedLabels.indexOf(label.id) !== -1} label={label} />,
    });
    return acc;
  }, []);
};

const LabelOptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const CheckedWrapper = styled.div`
  width: 20px;
`;

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

const milestones = ({ data }) => {
  return data.reduce((acc, milestone) => {
    acc.push({
      id: milestone.id,
      div: <div>{milestone.title}</div>,
    });
    return acc;
  }, []);
};

export default { users, labels, milestones };
