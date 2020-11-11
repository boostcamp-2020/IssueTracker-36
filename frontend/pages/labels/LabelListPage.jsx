import React, { useEffect, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import LabelList from '@components/label/LabelList';
import LabelAdder from '@components/label/LabelAdder';
import { LabelContext } from '@store/LabelProvider';
import { labelActions } from '@store/actions';
import Button from '@components/common/Button';
import service from '@services';

const reducer = (state, action) => {
  return !state;
};

const LabelListPage = ({ setNewButton }) => {
  const [labels, dispatch] = useContext(LabelContext);
  const [showLabelAdder, showLabelAdderDispatch] = useReducer(reducer, false);
  const onAddLabel = async (debouncedPreview) => {
    const { data } = await service.addLabel(debouncedPreview);
    dispatch({
      type: labelActions.ADD_LABEL,
      payload: data,
    });
  };
  const onDeleteLabel = async (id) =>
    dispatch({
      type: labelActions.DELETE_LABEL,
      payload: id,
    });

  useEffect(() => {
    const NewLabelButton = <Button text='New label' size='large' onClick={showLabelAdderDispatch} />;
    setNewButton(NewLabelButton);
  }, []);

  return (
    <>
      {showLabelAdder && (
        <LabelAdder onConfirm={onAddLabel} onCancel={showLabelAdderDispatch} confirmText='Create label' />
      )}
      <LabelList labels={labels} onDeleteLabel={onDeleteLabel} />
    </>
  );
};

LabelListPage.propTypes = {
  setNewButton: PropTypes.func.isRequired,
};

export default LabelListPage;
