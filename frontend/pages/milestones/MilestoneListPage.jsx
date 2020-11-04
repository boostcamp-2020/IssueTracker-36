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
  const [milestoneList, setMilestoneList] = useState([]);
  const yes = 1;
  const no = 0;
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
    const milestones = await service.getMilestones({ isClosed: no });
    setOpenMilestone(milestones.data);
  };
  const getClosed = async () => {
    const milestones = await service.getMilestones({ isClosed: yes });
    setClosedMilestone(milestones.data);
  };
  const getMilestones = async (status) => {
    const milestones =
      status === 'close'
        ? await service.getMilestones({ isClosed: yes })
        : await service.getMilestones({ isClosed: no });
    setMilestoneList(milestones.data);
  };
  useEffect(() => {
    getOpen();
    getClosed();
    getMilestones('open');
  }, []);
  return (
    <>
      <Mytable
        width='100%'
        header={() => {
          return (
            <MilestoneListHeader>
              <td colSpan='2'>
                <HeaderText>
                  <OpenBtn onClick={() => getMilestones('open')}>
                    <GoMilestone />
                    {open.length} Open
                  </OpenBtn>
                  <CloseBtn onClick={() => getMilestones('close')}>
                    <GoCheck />
                    {close.length} Closed
                  </CloseBtn>
                </HeaderText>
              </td>
            </MilestoneListHeader>
          );
        }}
        body={() => {
          return milestoneList.map((milestone) => {
            const { id, title, description, dueDate } = milestone;
            const year = dueDate.substring(0, 4);
            const month = dueDate.substring(5, 7);
            const day = dueDate.substring(8, 10);
            return (
              <TR key={id}>
                <TD align='left' padding='10px'>
                  <Title>{title}</Title>
                  <GoCalendar /> Due by {month},{day},{year}
                  <br />
                  {description}
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

const MilestoneListHeader = styled.tr`
  background-color: #eee;
  height: 60px;
  padding-left: 18px;
`;

const TR = styled.tr`
  border-bottom: 1px solid #eee;
`;
const OpenBtn = styled.button`
  color: ${(props) => props.theme.color.blackColor};
`;
const CloseBtn = styled(OpenBtn)`
  color: ${(props) => props.theme.color.blackColor};
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
const HeaderText = styled.p`
  color: ${(props) => props.theme.color.grayColor};
  font-size: ${(props) => props.theme.fontSize.md};
  padding-left: 20px;
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
export default MilestoneListPage;
