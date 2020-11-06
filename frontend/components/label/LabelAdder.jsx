import React, { useEffect, useState } from 'react';
import service from '@services';
import Label from '@components/common/label';
import fontColorContrast from 'font-color-contrast';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import debounceHook from '@utils/debounceHook';

const LabelAdder = ({ getData }) => {
  const [preview, setPreview] = useState({ title: 'Label Prieview', description: '', color: '#0366d6' });
  const debouncedPreview = debounceHook(preview, 1000);
  const resetForm = () => {
    setPreview({ title: 'Label Prieview', description: '', color: '#0366d6' });
  };
  const handleChangeTitle = (e) => {
    setPreview({
      ...preview,
      title: e.target.value,
    });
  };
  const handleChangeDescription = (e) => {
    setPreview({
      ...preview,
      description: e.target.value,
    });
    debouncedPreview.description = e.target.value;
  };
  const handleChangeColor = (e) => {
    setPreview({
      ...preview,
      color: e.target.value,
    });
  };
  const handleClickCreate = async () => {
    await service.addLabel(debouncedPreview);
    getData();
    resetForm();
  };
  return (
    <>
      <AdderForm>
        <PreviewBox>
          <Label
            text={debouncedPreview.title}
            bg={debouncedPreview.color}
            color={fontColorContrast(debouncedPreview.color)}
          />
        </PreviewBox>
        <FlexBox>
          <FormGroup>
            <LabelBox>
              <label htmlFor='label-name'>Label name</label>
            </LabelBox>
            <Input placeholder='이름' value={preview.title} onChange={(e) => handleChangeTitle(e)} />
          </FormGroup>
          <FormGroup>
            <LabelBox>
              <label htmlFor='label-description'>Description</label>
            </LabelBox>
            <Input
              placeholder='Description (optional)'
              value={preview.description}
              onChange={(e) => handleChangeDescription(e)}
            />
          </FormGroup>
          <FormGroup>
            <LabelBox>
              <label htmlFor='label-color'>Color</label>
            </LabelBox>
            <Input placeholder='color' value={preview.color} onChange={(e) => handleChangeColor(e)} />
          </FormGroup>
          <FormGroup>
            <BtnBox>
              <button type='button'>cancel</button>
              <button type='button' onClick={(e) => handleClickCreate(e)}>
                Create Label
              </button>
            </BtnBox>
          </FormGroup>
        </FlexBox>
      </AdderForm>
    </>
  );
};
LabelAdder.propTypes = {
  getData: PropTypes.func.isRequired,
};
const AdderForm = styled.form`
  width: 100%;
  background-color: ${({ theme }) => theme.color.shadeBgColor};
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 16px !important;
`;
const PreviewBox = styled.div`
  width: 100%;

  display: block;
  margin-bottom: 8px !important;
`;
const FlexBox = styled.div`
  display: flex;
  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
  }
`;
const LabelBox = styled.div`
  display: flex;
  margin: 0 0 6px;
  align-items: center;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.md};
`;
const BtnBox = styled.div`
  display: flex;
  margin-top: 25px;
  align-items: flex-end;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.md};
`;

const FormGroup = styled.dl`
  padding-right: 16px !important;
  margin-top: 16px !important;
  margin-bottom: 16px !important;
  width: 25%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Input = styled.input`
  margin-right: 5px;
  background-color: ${({ theme }) => theme.color.inputContrast};
  padding: 5px 12px;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.color.textColor};
  vertical-align: middle;
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  border-radius: 6px;
  outline: none;
  width: 100%;
`;

export default LabelAdder;
