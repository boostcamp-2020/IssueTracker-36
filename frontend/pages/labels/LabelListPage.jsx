import React, { useEffect, useState } from 'react';
import LabelList from '@components/label/LabelList';
import LabelAdder from '@components/label/LabelAdder';
import service from '@services';

const LabelListPage = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await service.getLabels();
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>
        <h1>리스트 페이지 입니다</h1>
      </div>
      <LabelAdder />
      <LabelList data={data} getData={getData} />
    </>
  );
};

export default LabelListPage;
