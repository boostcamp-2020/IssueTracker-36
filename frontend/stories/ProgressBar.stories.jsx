import React from 'react';
import ProgressBar from '@components/common/ProgressBar';

export default {
  title: 'ProgressBar',
  component: ProgressBar,
};

export const Examples = () => (
  <>
    <p style={{ width: '250px' }}>
      <ProgressBar progress={50} />
    </p>
    <p style={{ width: '350px' }}>
      <ProgressBar progress={50} />
    </p>
    <p style={{ width: '450px' }}>
      <ProgressBar progress={50} />
    </p>
    <p style={{ width: '550px' }}>
      <ProgressBar progress={50} />
    </p>
    <p style={{ width: '550px' }}>
      <ProgressBar progress={75} />
    </p>
    <p style={{ width: '550px' }}>
      <ProgressBar progress={100} />
    </p>
  </>
);
