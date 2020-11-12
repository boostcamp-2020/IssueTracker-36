import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import WritingArea from '@components/common/WritingArea';
import Button from '@components/common/Button';

const CommentItem = ({ onClickLeftBtn, onClickRightBtn, initValue }) => {
  const clickButton = (content) => {
    onClickRightBtn(content);
  };
  return (
    <ItemWrapper>
      <CommentWrapper>
        <WritingArea
          initValue={initValue}
          type='comment'
          renderButton={(text) => {
            return (
              <>
                <Button
                  size='large'
                  text='cancel'
                  type='secondary'
                  onClick={() => {
                    onClickLeftBtn(0);
                  }}
                />
                <Button
                  size='large'
                  text='update comment'
                  onClick={() => {
                    clickButton(text);
                  }}
                  disabled={!text.length}
                />
              </>
            );
          }}
        />
      </CommentWrapper>
    </ItemWrapper>
  );
};

CommentItem.propTypes = {
  onClickLeftBtn: PropTypes.func.isRequired,
  onClickRightBtn: PropTypes.func.isRequired,
  initValue: PropTypes.string.isRequired,
};

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const CommentWrapper = styled.article`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  color: ${({ theme }) => theme.color.textColor};
  background-color: ${({ theme }) => theme.color.whiteColor};
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  border-radius: 6px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  width: 100%;
  &:before {
    width: 0;
    height: 0;
    pointer-events: none;
    content: ' ';
    border-color: transparent;
    border-style: solid solid outset;
    display: block;
    border-width: 8px;
    border-right-color: ${({ theme }) => theme.color.borderColor};
    position: absolute;
    top: 11px;
    right: 100%;
    left: -16px;
  }
  &:after {
    width: 0;
    height: 0;
    pointer-events: none;
    content: ' ';
    border-color: transparent;
    border-style: solid solid outset;
    display: block;
    margin-top: 1px;
    margin-left: 2px;
    border-width: 7px;
    border-right-color: ${({ theme }) => theme.color.shadeBgColor};
    position: absolute;
    top: 11px;
    right: 100%;
    left: -16px;
  }
`;

export default CommentItem;
