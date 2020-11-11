import React, { useEffect, useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import { MilestoneContext } from '@store/MilestoneProvider';
import { milestoneActions } from '@store/actions';
import Milestoneform from '@components/milestone/MilestoneForm';
import Button from '@components/common/Button';
import service from '@services';

const MilestoneEditPage = ({ match }) => {
  const {
    params: { id },
  } = match;
  const [, dispatch] = useContext(MilestoneContext);
  const [prevContents, setPrevContents] = useState({
    title: '',
    dueDate: '',
    description: '',
  });
  const title = useRef('');
  const dueDate = useRef('');
  const description = useRef('');
  const history = useHistory();

  const cancelAction = () => {
    history.push('/milestones');
  };
  const updateAction = async () => {
    try {
      const titleContent = title.current.value;
      const dueDateContent = dueDate.current.value;
      const descriptionContent = description.current.value;
      if (
        titleContent === prevContents.title &&
        dueDateContent === prevContents.dueDate &&
        descriptionContent === prevContents.description
      )
        alert('변경된 내용이 없습니다');
      else {
        const updatedContents = {};
        if (titleContent !== prevContents.title) updatedContents.title = titleContent;
        if (dueDateContent !== prevContents.dueDate) updatedContents.dueDate = dueDateContent;
        if (descriptionContent !== prevContents.description) updatedContents.description = descriptionContent;
        const { data } = await service.updateMilestone(id, updatedContents);
        dispatch({
          type: milestoneActions.UPDATE_MILESTONE,
          payload: data,
        });
        history.push('/milestones');
      }
    } catch (e) {
      alert('오류가 발생했습니다');
    }
  };

  useEffect(async () => {
    const { data } = await service.getMilestone(id);
    setPrevContents({
      title: data.title,
      dueDate: moment(data.dueDate).format('YYYY-MM-DD'),
      description: data.description,
    });
  }, []);

  return (
    <>
      <Title>Edit milestone</Title>
      <Milestoneform title={title} dueDate={dueDate} description={description} defaultValue={prevContents} />
      <ButtonArea>
        <ButtonWrapper>
          <Button text='Cancel' type='secondary' size='large' onClick={cancelAction} />
        </ButtonWrapper>
        <ButtonWrapper>
          <Button text='Edit milestone' size='large' onClick={updateAction} />
        </ButtonWrapper>
      </ButtonArea>
    </>
  );
};

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  padding: 15px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.grayColor};
`;

const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const ButtonWrapper = styled.div`
  margin-left: 10px;
`;

MilestoneEditPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default MilestoneEditPage;
