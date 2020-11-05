import React from 'react';
import AuthPageLayout from '@layouts/AuthPageLayout';
import styled from 'styled-components';

const NotFoundPage = () => (
  <AuthPageLayout>
    <Message>Page Not Found :(</Message>
  </AuthPageLayout>
);

const Message = styled.h1`
  text-align: center;
  font-size: ${(props) => props.theme.fontSize.xl};
`;

export default NotFoundPage;
