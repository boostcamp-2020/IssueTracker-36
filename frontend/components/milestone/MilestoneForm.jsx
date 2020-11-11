import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MilestoneAddForm = ({ title, dueDate, description, setIsTitleEmpty, defaultValue }) => {
  const onChangeTitle = (e) => {
    if (e.target.value.length) setIsTitleEmpty(false);
    else setIsTitleEmpty(true);
  };

  return (
    <Wrapper>
      <FormWrapper>
        <LabelWrapper>
          <span>Title</span>
        </LabelWrapper>
        <Input
          type='title'
          placeholder='Title'
          id='milestone_title'
          name='milestone[title]'
          className='input-box'
          onChange={onChangeTitle}
          ref={title}
          defaultValue={defaultValue.title}
        />
      </FormWrapper>
      <FormWrapper>
        <LabelWrapper>
          <span>Due date (optional)</span>
        </LabelWrapper>
        <Input
          type='date'
          pattern='\d\d\d\d-\d\d-\d\d'
          placeholder='yyyy-mm-dd'
          id='milestone_due_on'
          name='milestone[due_on]'
          className='input-box'
          ref={dueDate}
          defaultValue={defaultValue.dueDate}
        />
      </FormWrapper>
      <FormWrapper>
        <LabelWrapper>
          <span>Description</span>
        </LabelWrapper>
        <Textarea
          maxLength='8192'
          cols='40'
          rows='20'
          id='milestone_description'
          name='milestone[description]'
          className='input-box'
          ref={description}
          defaultValue={defaultValue.description}
        />
      </FormWrapper>
    </Wrapper>
  );
};

MilestoneAddForm.propTypes = {
  title: PropTypes.object.isRequired,
  dueDate: PropTypes.object.isRequired,
  description: PropTypes.object.isRequired,
  setIsTitleEmpty: PropTypes.func,
  defaultValue: PropTypes.object,
};

MilestoneAddForm.defaultProps = {
  setIsTitleEmpty: () => {},
  defaultValue: { title: '', dueDate: '', description: '' },
};

const LabelWrapper = styled.div`
  display: flex;
  margin: 0 0 6px;
  font-weight: 600;
  font-size: 14px;
`;
const Input = styled.input`
  width: 440px;
  max-width: 100%;
  margin-right: 5px;
`;
const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
  min-height: 200px;
  max-width: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.color.borderColor};
  margin-bottom: 16px;
`;

const FormWrapper = styled.div`
  width: 66.66667%;
  margin: 15px 0;
  > .input-box {
    max-width: 100%;
    margin-right: 5px;
    padding-top: 8px;
    padding-bottom: 8px;
    padding: 5px 12px;
    font-size: 14px;
    line-height: 20px;
    color: var(--color-text-primary);
    vertical-align: middle;
    background-color: ${({ theme }) => theme.color.shadeBgColor};
    background-repeat: no-repeat;
    background-position: right 8px center;
    border: 1px solid ${({ theme }) => theme.color.borderColor};
    border-radius: 6px;
    outline: none;
  }
`;

export default MilestoneAddForm;
