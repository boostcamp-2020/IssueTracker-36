import React, { useContext } from 'react';
import LabelList from '@components/label/LabelList';
import LabelAdder from '@components/label/LabelAdder';
import { LabelContext } from '@store/LabelProvider';
import { labelActions } from '@store/actions';

const LabelListPage = () => {
  const [labels, dispatch] = useContext(LabelContext);
  const onAddLabel = (label) =>
    dispatch({
      type: labelActions.ADD_LABEL,
      payload: label,
    });
  const onDeleteLabel = (id) =>
    dispatch({
      type: labelActions.DELETE_LABEL,
      payload: id,
    });

  return (
    <>
      <LabelAdder onAddLabel={onAddLabel} />
      <LabelList labels={labels} onDeleteLabel={onDeleteLabel} />
    </>
  );
};

export default LabelListPage;
