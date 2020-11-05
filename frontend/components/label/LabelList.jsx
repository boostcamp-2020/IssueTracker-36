import React from 'react';
import Mytable from '@components/common/table';
import service from '@services';
import Label from '@components/common/label';
import fontColorContrast from 'font-color-contrast';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LabelList = ({ data, getData }) => {
  const clickEditBtn = async () => {};
  const clickDeleteBtn = async (id) => {
    await service.deleteLabel(id);
    await getData();
  };

  return (
    <>
      <Mytable
        width='100%'
        renderHeader={() => {
          return (
            <LabelListHeader>
              <TD colSpan='5' align='left'>
                <HeaderText>{data.length} labels</HeaderText>{' '}
              </TD>
            </LabelListHeader>
          );
        }}
        renderBody={() => {
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
LabelList.propTypes = {
  data: PropTypes.array.isRequired,
  getData: PropTypes.func.isRequired,
};

const LabelListHeader = styled.tr`
  line-height: 60px;
  height: 60px;
  padding-left: 18px;
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
  margin: auto;
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
export default LabelList;
