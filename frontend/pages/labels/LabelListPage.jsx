import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import LabelList from '@components/label/LabelList';
import LabelForm from '@components/label/LabelForm';
import { LabelContext } from '@store/LabelProvider';
import { labelActions } from '@store/actions';
import service from '@services';
import Button from '@components/common/Button';

const LabelListPage = () => {
  const [labels, dispatch] = useContext(LabelContext);
  const [isAdding, setIsAdding] = useState(false);

  const onAddLabel = (label) => {
    setIsAdding(false);
    service
      .addLabel(label)
      .then(({ data: createdLabel }) =>
        dispatch({
          type: labelActions.ADD_LABEL,
          payload: createdLabel,
        }),
      )
      .catch(console.error);
  };
  const onDeleteLabel = (id) =>
    dispatch({
      type: labelActions.DELETE_LABEL,
      payload: id,
    });
  const onUpdateLabel = (label) =>
    service
      .updateLabel(label)
      .then(({ data: updatedLabel }) =>
        dispatch({
          type: labelActions.UPDATE_LABEL,
          payload: updatedLabel,
        }),
      )
      .catch(console.error);
  const onEditStart = (id) =>
    dispatch({
      type: labelActions.START_EDIT_LABEL,
      payload: id,
    });
  const onEditEnd = (id) =>
    dispatch({
      type: labelActions.END_EDIT_LABEL,
      payload: id,
    });
  return (
    <>
      <ButtonRow>
        <ButtonWrapper>
          <Button text='New label' size='large' onClick={() => setIsAdding(true)} />
        </ButtonWrapper>
      </ButtonRow>
      {isAdding && (
        <LabelForm onSave={onAddLabel} onCancel={() => setIsAdding(false)} saveButtonText='Create label' />
      )}
      <LabelList
        labels={labels}
        onSave={onUpdateLabel}
        onDeleteLabel={onDeleteLabel}
        onEditStart={onEditStart}
        onEditEnd={onEditEnd}
        onUpdate={onUpdateLabel}
      />
    </>
  );
};

const ButtonRow = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  text-align: right;
  position: absolute;
  top: -32px;
`;

export default LabelListPage;
