import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { GoCalendar } from 'react-icons/go';
import Moment from 'react-moment';
import MilestoneGraph from '@components/milestone/MilestoneGraph';

const Milestone = ({ milestone }) => {
  const clickEditBtn = async (id) => {
    // TODO:수정
    console.log(id);
  };
  const clickCloseBtn = async (id) => {
    // TODO: close
    console.log(id);
  };
  const clickDeleteBtn = async (id) => {
    // TODO:삭제
    console.log(id);
  };
  const { id, title, description, dueDate } = milestone;
  return (
    <TR>
      <TD align='left' padding='10px'>
        <Title>{title}</Title>
        <br />
        <GoCalendar /> Due by
        <Moment format='MM,DD,YYYY'>{dueDate}</Moment>
        <br />
        {description}
      </TD>
      <TD>
        <div>
          <MilestoneGraph id={id} graphDescription />
        </div>
        <br/>
        <BTN onClick={() => clickEditBtn(id)}>edit</BTN>
        <BTN onClick={() => clickCloseBtn(id)}>close</BTN>
        <DeleteBTN onClick={() => clickDeleteBtn(id)}>delete</DeleteBTN>
      </TD>
    </TR>
  );
};
Milestone.propTypes = {
  milestone: PropTypes.object.isRequired,
};

const TR = styled.tr`
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  &:hover {
    background-color: ${({ theme }) => theme.color.hoverBgColor};
  }
`;
const TD = styled.td`
  width: ${(props) => props.width || ''};
  text-align: ${(props) => props.align || 'center'};
  padding: ${(props) => props.padding || '5px'};
`;
const Title = styled.h1`
  font-size: 1.5em;
  color: ${(props) => props.theme.color.blackColor};
`;
const BTN = styled.button`
  width: ${(props) => props.width || ''};
  text-align: ${(props) => props.align || 'center'};
  padding: ${(props) => props.padding || '5px'};
  color: ${(props) => props.theme.color.blueColor};
  font-size: ${(props) => props.theme.fontSize.md};
  cursor: pointer;
  padding: 1px;
  display: inline-block;
`;
const DeleteBTN = styled(BTN)`
  color: ${(props) => props.theme.color.redColor};
`;

export default Milestone;
