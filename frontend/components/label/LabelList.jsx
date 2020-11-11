import React from 'react';
import Mytable from '@components/common/Table';
import service from '@services';
import Label from '@components/common/Label';
import fontColorContrast from 'font-color-contrast';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LabelList = ({ labels, onDeleteLabel }) => {
  const clickEditBtn = async () => {};
  const clickDeleteBtn = async (id) => {
    const { data: effectedRow } = await service.deleteLabel(id);
    if (effectedRow === 1) onDeleteLabel(id);
  };

  return (
    <>
      <Mytable
        width='100%'
        renderHeader={() => {
          return (
            <LabelListHeader>
              <TD colSpan='5' align='left'>
                <HeaderText>{labels.length} labels</HeaderText>{' '}
              </TD>
            </LabelListHeader>
          );
        }}
        renderBody={() => {
          return labels.map((label) => {
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
  labels: PropTypes.array.isRequired,
  onDeleteLabel: PropTypes.func.isRequired,
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
