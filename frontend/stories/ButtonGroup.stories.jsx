import React from 'react';
import ButtonGroup from '@components/common/ButtonGroup';
import Button from '@components/common/Button';
import { AiOutlineTag } from 'react-icons/ai';
import { GoMilestone } from 'react-icons/go';

export default {
  title: 'ButtonGroup',
  component: ButtonGroup,
};

export const Examples = () => (
  <>
    <p>
      <ButtonGroup>
        <Button text='Button1' type='primary' />
        <Button text='Button2' type='primary' />
      </ButtonGroup>
    </p>
    <p>
      <ButtonGroup>
        <Button text='Button1' type='secondary' count={30} />
        <Button text='Button2' type='secondary' count={4} />
        <Button text='Button2' type='secondary' count={12} />
      </ButtonGroup>
    </p>
    <p>
      <ButtonGroup>
        <Button text='Button1' type='tertiary' icon={<AiOutlineTag />} />
        <Button text='Button2' type='tertiary' icon={<AiOutlineTag />} />
        <Button text='Button3' type='tertiary' icon={<AiOutlineTag />} />
        <Button text='Button4' type='tertiary' icon={<AiOutlineTag />} />
      </ButtonGroup>
    </p>
    <p>
      <ButtonGroup>
        <Button text='Labels' size='large' type='tertiary' icon={<AiOutlineTag />} />
        <Button text='Milestones' size='large' type='tertiary' icon={<GoMilestone />} />
      </ButtonGroup>
    </p>
  </>
);
