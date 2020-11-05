import React, { useEffect, useState } from 'react';
import LabelList from '@components/label/LabelList';
import service from '@services';

const LabelListPage = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await service.getLabels();
    setData(res.data);
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
      <LabelList data={data} getData={getData} />
    </>
  );
};

export default LabelListPage;
