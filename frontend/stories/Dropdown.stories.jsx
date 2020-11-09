import React from 'react';
import Dropdown from '@components/common/Dropdown';
import { text, array, boolean } from '@storybook/addon-knobs';

export default {
  title: 'Dropdown',
  component: Dropdown,
};

const data = ['이름1', '이름2'];

export const exampleDropdown = () => (
  <Dropdown
    title={text('dropdown 이름', '유저 목록')}
    isInputExist={boolean('input 유무', true)}
    dataInDiv={array('보여줄 목록', data)}
  />
);
