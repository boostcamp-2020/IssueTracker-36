import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Header from '@components/Header';

const MainPageLayout = ({ children }) => {
  return (
    <Container>
      <Header />
      <Main>{children}</Main>
    </Container>
  );
};

MainPageLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.color.whiteColor};
`;
const Main = styled.main`
  width: 100%;
  max-width: 1024px;
  margin: 3rem 0;
`;

export default MainPageLayout;
