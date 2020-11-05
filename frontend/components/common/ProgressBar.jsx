import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ProgressBar = ({ progress }) => {
  return (
    <Wrapper>
      <Background>
        <Bar progress={progress} />
      </Background>
    </Wrapper>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

const Wrapper = styled.span`
  display: inline-block;
  position: relative;
  width: 100%;
  height: 0;
  overflow: hidden;
  padding-bottom: 2.5%;
`;

const Background = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.secondaryBorderColor};
  border-radius: 10rem;
  overflow: hidden;
`;

const Bar = styled.span`
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ progress }) => progress}%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.lightGreenColor};
`;

export default ProgressBar;
