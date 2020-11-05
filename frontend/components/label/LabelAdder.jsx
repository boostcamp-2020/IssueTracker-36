import React, { useEffect, useState } from 'react';
import service from '@services';
import Label from '@components/common/label';
import fontColorContrast from 'font-color-contrast';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LabelAdder = ({ getData }) => {
  const [preview, setPreview] = useState({ title: 'Label Prieview', description: '', color: 'blue' });
  return (
    <>
      <Wrapper>
        adder
        <Label text={preview.title} bg={preview.color} color={fontColorContrast(preview.color)} />
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.color.shadeBgColor};
  border: 1px solid ${({ theme }) => theme.color.borderColor};
`;
export default LabelAdder;
