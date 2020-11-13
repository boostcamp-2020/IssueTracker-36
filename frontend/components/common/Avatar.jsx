import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * 사용자의 프로필 사진을 표현하는 아바타 컴포넌트입니다.
 */
const Avatar = ({ alt, src, size, shape }) => {
  return <Wrapper className={`${size}-avatar ${shape}-avatar`}>{src && <Img alt={alt} src={src} />}</Wrapper>;
};

Avatar.propTypes = {
  /** img 태그의 alt 속성값 */
  alt: PropTypes.string,
  /** img 태그의 src 속성값. 없으면 img 태그를 렌더링하지 않고 회색 박스만 렌더링합니다 */
  src: PropTypes.string,
  /** 컴포넌트의 크기 */
  size: PropTypes.oneOf(['large', 'small']),
  /** 컴포넌트의 모양 */
  shape: PropTypes.oneOf(['circle', 'sqare']),
};

Avatar.defaultProps = {
  alt: '',
  src: '',
  size: 'large',
  shape: 'circle',
};

const Wrapper = styled.div`
  display: inline-block;
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.borderColor};

  &.large-avatar {
    width: 40px;
    height: 40px;
  }
  &.small-avatar {
    width: 20px;
    height: 20px;
  }

  &.circle-avatar {
    border-radius: 50%;
  }
  &.sqare-avatar {
    border-radius: 0;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

export default Avatar;
