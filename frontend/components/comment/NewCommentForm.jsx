import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from '@components/common/Avatar';
import WritingArea from '@components/common/WritingArea';
import Button from '@components/common/Button';
import { GoIssueClosed } from 'react-icons/go';

const CommentItem = ({ user, buttonText, onClickButton, isClosed }) => {
  return (
    <ItemWrapper>
      <AvatarWrapper>
        <Avatar alt={`${user.nickName} profile image`} />
      </AvatarWrapper>
      <CommentWrapper>
        <WritingArea
          type='comment'
          renderButton={(text) => {
            return (
              <>
                {isClosed ? (
                  <Button
                    size='large'
                    text={buttonText}
                    type='secondary'
                    icon={
                      <GoIssueClosed
                        onClick={() => {
                          onClickButton();
                        }}
                      />
                    }
                  />
                ) : (
                  <Button
                    size='large'
                    text={buttonText}
                    type='secondary'
                    onClick={() => {
                       onClickButton();
                  }}/>
                )}
                <Button
                  size='large'
                  text='Comment'
                  onClick={() => {
                    onClickButton();
                  }}
                  disabled={!text.length}
                />
              </>
            );
          }}
        />
      </CommentWrapper>
    </ItemWrapper>);
};

CommentItem.propTypes = {
  user: PropTypes.object.isRequired,
  isClosed: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
  onClickButton: PropTypes.func.isRequired,
};

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const AvatarWrapper = styled.div`
  margin-right: 20px;
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