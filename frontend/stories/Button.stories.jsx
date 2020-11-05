import React from 'react';
import Button from '@components/common/Button';
import { AiOutlineTag } from 'react-icons/ai';

export default {
  title: 'Button',
  component: Button,
};

export const Examples = () => (
  <>
    <Button text='Button' size='small' />
    <Button text='Button' size='large' />
    <br />
    <br />
    <Button text='Button' size='small' type='secondary' />
    <Button text='Button' size='large' type='secondary' />
    <br />
    <br />
    <Button text='Button' icon={<AiOutlineTag />} />
    <Button text='Button' icon={<AiOutlineTag />} size='large' />
    <Button text='Button' type='secondary' icon={<AiOutlineTag />} />
    <Button text='Button' type='secondary' icon={<AiOutlineTag />} size='large' />
    <br />
    <br />
    <Button text='Button' count={12} />
    <Button text='Button' count={12} size='large' />
    <Button text='Button' type='secondary' count={6} />
    <Button text='Button' type='secondary' count={6} size='large' />
    <br />
    <br />
    <Button text='Button' icon={<AiOutlineTag />} count={12} />
    <Button text='Button' icon={<AiOutlineTag />} count={12} size='large' />
    <Button text='Button' icon={<AiOutlineTag />} type='secondary' count={6} />
    <Button text='Button' icon={<AiOutlineTag />} type='secondary' count={6} size='large' />
  </>
);
