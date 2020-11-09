import React from 'react';
import styled from 'styled-components';

const users = ({ data }) => {
  return data.reduce((acc, user) => {
    acc.push({
      id: user.id,
      div: <div>{user.nickName}</div>,
    });
    return acc;
  }, []);
};

const labels = ({ data }) => {
  return data.reduce((acc, label) => {
    acc.push({
      id: label.id,
      div: (
        <LabelOption key={label.id}>
          <LabelColor color={label.color} />
          <LabelInfoWrapper>
            <LabelTitle>{label.title}</LabelTitle>
            <LabelDescription>{label.description}</LabelDescription>
          </LabelInfoWrapper>
        </LabelOption>
      ),
    });
    return acc;
  }, []);
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

const LabelOption = styled.div`
  display: flex;
  flex-direction: row;
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
  margin-left: 10px;
`;

const LabelTitle = styled.div``;
const LabelDescription = styled.div`
  margin-top: 3px;
  color: gray;
  font-weight: lighter;
`;

export default { users, labels, milestones };
