import React, { useEffect, useState } from 'react';
import Mytable from '@components/common/table';
import service from '@services';
import Label from '@components/common/label';
import fontColorContrast from 'font-color-contrast';
import styled from 'styled-components';

const LabelListPage = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await service.getLabels();
    setData(res.data);
  };
  const clickEditBtn = async (label) => {
    console.log(label);
  };
  const clickDeleteBtn = async (id) => {
    await service.deleteLabel(id);
    await getData();
  };

  useEffect(() => {
    getData();
    // console.log(data);
  }, []);

  return (
    <>
      <div>
        <h1>리스트 페이지 입니다</h1>
      </div>
      <Mytable
        width='100%'
        header={() => {
          return (
            <LabelListHeader>
              <td colSpan='5'>
                <HeaderText>{data.length}labels</HeaderText>{' '}
              </td>
            </LabelListHeader>
          );
        }}
        body={() => {
          return data.map((label) => {
            return (
              <TR key={label.id}>
                <TD width='200px;' align='left' padding='10px'>
                  <Label text={label.title} bg={label.color} color={fontColorContrast(label.color)} />
                </TD>
                <TD align='left'>{label.description}</TD>

                <TD>
                  <BTN onClick={() => clickEditBtn(label)}>edit</BTN>
                </TD>
                <TD>
                  <BTN onClick={() => clickDeleteBtn(label.id)}>delete</BTN>
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

const TD = styled.td`
  width: ${(props) => props.width || ''};
  text-align: ${(props) => props.align || 'center'};
  padding: ${(props) => props.padding || '5px'};
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
  color: grey;
  padding: 1px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
`;
export default LabelListPage;
