import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaRegSmile } from 'react-icons/fa';
import Dropdown from '@components/comment/Dropdown';
import Emoji from '@components/common/Emoji';

const reactions = {
  '+1': '0x1F44D',
  '-1': '0x1F44E',
  Laugh: '0x1F604',
  Hooray: '0x1F389',
  Confused: '0x1F615',
  Heart: '0x2764',
  Rocket: '0x1F680',
  eyes: '0x1F440',
};

/**
 * 리액션을 추가할 때 사용하는 리액션 버튼 컴포넌트입니다.
 * 버튼을 클릭하면 드롭다운이 열리며 리액션을 선택할 수 있습니다.
 */
const ReactionButton = ({ onClickReaction }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoverReaction, setHoverReaction] = useState(null);

  const openDropdown = () => setShowDropdown(true);
  const closeDropdown = () => setShowDropdown(false);
  const onClickEmoji = (label) => {
    closeDropdown();
    onClickReaction(reactions[label]);
  };

  return (
    <ButtonWrapper>
      <Button onClick={openDropdown} type='button'>
        <FaRegSmile />
      </Button>
      {showDropdown && (
        <Dropdown closeHandler={closeDropdown}>
          <Label>{hoverReaction || 'Pick your reaction'}</Label>
          <EmojiWrapper>
            {Object.entries(reactions).map(([label, hexCode]) => (
              <EmojiButton
                type='button'
                onMouseOver={() => setHoverReaction(label)}
                onMouseLeave={() => setHoverReaction(null)}
                onFocus={() => setHoverReaction(label)}
                onBlur={() => setHoverReaction(null)}
                onClick={() => onClickEmoji(label)}
                key={label}
              >
                <Emoji hexCode={hexCode} label={label} />
              </EmojiButton>
            ))}
          </EmojiWrapper>
        </Dropdown>
      )}
    </ButtonWrapper>
  );
};

ReactionButton.propTypes = {
  /** 리액션을 선택했을 때 호출되는 콜백함수. 해당 이모지의 유니코드가 파라미터로 전달됩니다. */
  onClickReaction: PropTypes.func.isRequired,
};

const ButtonWrapper = styled.span`
  display: inline-block;
  position: relative;
  color: ${({ theme }) => theme.color.secondaryTextColor};
  font-size: ${({ theme }) => theme.fontSize.md};

  &:hover {
    color: ${({ theme }) => theme.color.blueColor};
  }
`;

const Button = styled.button`
  display: inline-block;
  position: relative;
  padding: 8px 8px;
`;

const Label = styled.div`
  padding: 4px 8px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.color.borderColor};
  text-align: left;
`;

const EmojiWrapper = styled.div`
  padding: 4px 8px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const EmojiButton = styled.button`
  width: 25%;
  padding: 4px;
`;

export default ReactionButton;
