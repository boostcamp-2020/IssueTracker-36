import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import MainPageLayout from '@layouts/MainPageLayout';
import Button from '@components/common/Button';
import service from '@services';

const MilestoneAddPage = () => {
  const history = useHistory();
  const title = useRef(undefined);
  const dueDate = useRef(undefined);
  const description = useRef(undefined);

  const handleClickCreate = async () => {
    try {
      //   await service.addMisestone(title, dueDate, description);
      console.log(title.current.value, dueDate.current.value, description.current.value);
      //   history.push('/milestones');
    } catch (e) {
      alert('오류가 발생했습니다');
    }
  };

  return (
    <MainPageLayout>
      <HeaderWrapper>
        <Title>New Milestone</Title>
        <SubHeader>
          Create a new milestone to help organize your issues and pull requests. Learn more about
          <a href='https://guides.github.com/features/issues/'> milestones and issues</a>
        </SubHeader>
      </HeaderWrapper>
      <br />

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
            ref={title}
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
          />
        </FormWrapper>
      </Wrapper>
      <ButtonWrapper>
        <Button
          size='large'
          type='primary'
          text=' Create Milestone'
          disabled={title === ''}
          onClick={handleClickCreate}
        />
      </ButtonWrapper>
    </MainPageLayout>
  );
};
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const HeaderWrapper = styled.div`
  padding-bottom: 0;
  flex-wrap: wrap-reverse;
  justify-content: flex-end;
  display: flex;
  padding-bottom: 8px;
  margin-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.borderColor};
  flex-flow: row wrap;
`;
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

const Title = styled.h1`
  margin-bottom: 8px;

  font-size: 24px;
  font-weight: 400;
  flex: 1 1 auto;
`;
const SubHeader = styled.div`
  margin-top: -8px;
  margin-bottom: 16px;
  font-size: 14px;
  color: ${({ theme }) => theme.color.secondaryTextColor};
  flex: 1 100%;
  > a {
    color: ${({ theme }) => theme.color.lightBlueColor};
  }
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

export default MilestoneAddPage;
