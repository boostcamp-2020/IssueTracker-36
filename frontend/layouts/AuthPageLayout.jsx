import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AuthPageLayout = ({ children }) => {
  return (
    <Container>
      <Main>{children}</Main>
    </Container>
  );
};

AuthPageLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.shadeBgColor};
`;

const Main = styled.main`
  width: 100%;
  max-width: 22rem;
  margin-bottom: 5rem;
`;

export default AuthPageLayout;
