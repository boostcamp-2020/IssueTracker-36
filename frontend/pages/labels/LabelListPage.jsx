import React, { useContext } from 'react';
import LabelList from '@components/label/LabelList';
import LabelAdder from '@components/label/LabelAdder';
import { LabelContext } from '@store/LabelProvider';

const LabelListPage = () => {
  const [data, dispatch] = useContext(LabelContext);
  const getData = () => {};

  return (
    <>
      <LabelAdder getData={getData} />
      <LabelList data={data} getData={getData} />
    </>
  );
};

export default LabelListPage;
