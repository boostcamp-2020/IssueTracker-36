import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import MainPageLayout from '@layouts/MainPageLayout';
import Button from '@components/common/Button';
import MilestoneForm from '@components/milestone/MilestoneForm';
import service from '@services';

const MilestoneAddPage = () => {
  const history = useHistory();
  const [isTitleEmpty, setIsTitleEmpty] = useState(true);
  const title = useRef('');
  const dueDate = useRef(undefined);
  const description = useRef('');

  const handleClickCreate = async () => {
    try {
      await service.addMilestone(title.current.value, dueDate.current.value, description.current.value);
      history.push('/milestones');
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
      <MilestoneForm
        title={title}
        dueDate={dueDate}
        description={description}
        setIsTitleEmpty={setIsTitleEmpty}
      />
      <ButtonWrapper>
        <Button
          size='large'
          type='primary'
          text=' Create Milestone'
          disabled={isTitleEmpty}
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

export default MilestoneAddPage;
