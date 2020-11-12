import React, { useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import LabelList from '@components/label/LabelList';
import LabelForm from '@components/label/LabelForm';
import { LabelContext } from '@store/LabelProvider';
import { labelActions } from '@store/actions';
import service from '@services';
import Button from '@components/common/Button';

const isAddingReducer = (state) => {
  return !state;
};

const LabelListPage = ({ setNewButton }) => {
  const [labels, dispatch] = useContext(LabelContext);
  const [isAdding, isAddingDispatch] = useReducer(isAddingReducer, false);

  const onAddLabel = (label) => {
    isAddingDispatch();
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

  useEffect(() => {
    setNewButton(<Button text='New label' size='large' onClick={isAddingDispatch} />);
  }, []);

  return (
    <>
      {isAdding && (
        <LabelForm onSave={onAddLabel} onCancel={isAddingDispatch} saveButtonText='Create label' />
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

LabelListPage.propTypes = {
  setNewButton: PropTypes.func.isRequired,
};

export default LabelListPage;
