import React, { useState, useContext } from 'react';
import Mytable from '@components/common/Table';
import service from '@services';
import { LabelContext } from '@store/LabelProvider';
import { labelActions } from '@store/actions';
import Label from '@components/common/Label';
import LabelAdder from '@components/label/LabelAdder';
import fontColorContrast from 'font-color-contrast';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LabelList = ({ labels, onDeleteLabel }) => {
  const [, dispatch] = useContext(LabelContext);
  const [editingLabel, setEdittingLabel] = useState({ id: undefined, title: '', description: '', color: '' });

  const clickEditBtn = (label) => {
    setEdittingLabel({
      id: label.id,
      title: label.title,
      description: label.description,
      color: label.color,
    });
  };
  const clickDeleteBtn = async (id) => {
    if (confirm('삭제하시겠습니까?')) {
      const { data: effectedRow } = await service.deleteLabel(id);
      if (effectedRow === 1) onDeleteLabel(id);
    }
  };
  const clearEditing = () => {
    setEdittingLabel({ id: undefined, title: '', description: '', color: '' });
  };
  const confirmEdit = async (updatingInfo) => {
    const { data } = await service.updateLabel(editingLabel.id, updatingInfo);
    if (data[0] === 1) {
      dispatch({
        type: labelActions.UPDATE_LABEL,
        payload: updatingInfo,
      });
      clearEditing();
    } else alert('오류가 발생했습니다');
  };

  return (
    <Wrapper>
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
            return editingLabel.id === label.id ? (
              <TR key={label.id}>
                <TD colSpan='5' padding='0;'>
                  <LabelAdder
                    onConfirm={confirmEdit}
                    onCancel={clearEditing}
                    defaultValue={editingLabel}
                    confirmText='Edit label'
                  />
                </TD>
              </TR>
            ) : (
              <TR key={label.id}>
                <TD width='200px;' align='left' padding='10px 30px'>
                  <Label text={label.title} bg={label.color} color={fontColorContrast(label.color)} />
                </TD>
                <TD align='left'>{label.description}</TD>
                <TD width='100px;' align='left'>
                  <BTN onClick={() => clickEditBtn(label)}>edit</BTN>
                </TD>
                <TD width='100px;' align='left'>
                  <BTN onClick={() => clickDeleteBtn(label.id)}>delete</BTN>
                </TD>
              </TR>
            );
          });
        }}
      />
    </Wrapper>
  );
};
LabelList.propTypes = {
  labels: PropTypes.array.isRequired,
  onDeleteLabel: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
  margin-top: 20px;
`;

const LabelListHeader = styled.tr`
  line-height: 50px;
  padding-left: 18px;
`;

const TR = styled.tr`
  border-bottom: 1px solid #eee;
`;

const TD = styled.td`
  width: ${(props) => props.width || ''};
  text-align: ${(props) => props.align || 'center'};
  padding: ${(props) => props.padding || '5px'};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const HeaderText = styled.p`
  color: gray;
  padding-left: 30px;
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
  &:hover {
    color: ${({ theme }) => theme.color.blueColor};
    text-decoration: underline;
  }
`;
export default LabelList;
