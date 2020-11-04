import React, { useEffect, useState } from 'react';
import Mytable from '@components/common/table';
// 마일스톤 리스트 테이블
import service from '@services';
// 마일스톤 데이터
import styled from 'styled-components';
// import MainPageLayout from '@layouts/MainPageLayout';
import { GoMilestone, GoCheck, GoCalendar } from 'react-icons/go';

const MilestoneListPage = () => {
  const [open, setOpenMilestone] = useState([]);
  const [close, setClosedMilestone] = useState([]);
  const [data, setData] = useState([]);
  const clickEditBtn = async () => {
    // 수정버튼
  };
  const clickCloseBtn = async () => {
    // close버튼
  };
  const clickDeleteBtn = async () => {
    // dekete 버튼
  };
  const getOpen = async () => {
    const milestones = await service.getOpenMilestones();
    setOpenMilestone(milestones.data);
  };
  const getClosed = async () => {
    const milestones = await service.getClosedMilestones();
    setClosedMilestone(milestones.data);
  };
  const getData = async (status) => {
    const milestones =
      status === 'close' ? await service.getClosedMilestones() : await service.getOpenMilestones();
    setData(milestones.data);
  };
  useEffect(() => {
    getOpen();
    getClosed();
    getData();
  }, []);
  return (
    <>
      <Mytable
        width='100%'
        header={() => {
          return (
            <LabelListHeader>
              <td colSpan='2'>
                <HeaderText>
                  <OpenBtn onClick={() => getData('open')}>
                    <GoMilestone />
                    {open.length} Open
                  </OpenBtn>
                  <CloseBtn onClick={() => getData('close')}>
                    <GoCheck />
                    {close.length} Closed
                  </CloseBtn>
                </HeaderText>
              </td>
            </LabelListHeader>
          );
        }}
        body={() => {
          return data.map((milestone) => {
            return (
              <TR key={milestone.id}>
                <TD align='left' padding='10px'>
                  <Title>{milestone.title}</Title>
                  <GoCalendar /> Due by {milestone.dueDate.substring(5, 7)},
                  {milestone.dueDate.substring(8, 10)},{milestone.dueDate.substring(0, 4)}
                  <br />
                  {milestone.description}
                </TD>
                <TD>
                  <div>그래프</div>
                  <br />
                  <div>그래프설명</div>
                  <br />
                  <BTN onClick={() => clickEditBtn()}>edit</BTN>
                  <BTN onClick={() => clickCloseBtn()}>close</BTN>
                  <DeleteBTN onClick={() => clickDeleteBtn()}>delete</DeleteBTN>
                </TD>
              </TR>
            );
          });
        }}
      />
    </>
  );
};

const LabelListHeader = styled.tr`
  background-color: #eee;
  /* display: flex; */
  /* justify-content: center; */
  height: 60px;
  padding-left: 18px;
  /* align-items: center; */
`;

const TR = styled.tr`
  border-bottom: 1px solid #eee;
`;
const OpenBtn = styled.button`
  color: black;
  &:visited {
    color: red;
  }
`;
const CloseBtn = styled(OpenBtn)`
  color: black;
`;
const TD = styled.td`
  width: ${(props) => props.width || ''};
  text-align: ${(props) => props.align || 'center'};
  padding: ${(props) => props.padding || '5px'};
`;
const Title = styled.h1`
  font-size: 1.5em;
  color: black;
`;
const HeaderText = styled.p`
  color: gray;
  padding-left: 20px;
  font-size: 14px;
`;

const BTN = styled.button`
  width: ${(props) => props.width || ''};
  text-align: ${(props) => props.align || 'center'};
  padding: ${(props) => props.padding || '5px'};
  border: none;
  cursor: pointer;
  background: none;
  color: blue;
  padding: 1px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
`;
const DeleteBTN = styled(BTN)`
  color: red;
`;
export default MilestoneListPage;
