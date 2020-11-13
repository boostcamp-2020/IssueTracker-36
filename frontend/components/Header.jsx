import React, { useContext } from 'react';
import styled from 'styled-components';
import tokenStorage from '@utils/tokenStorage';
import { useHistory, Link } from 'react-router-dom';
import { UserContext } from '@store/UserProvider';
import { userActions } from '@store/actions';
import { AiFillGithub } from 'react-icons/ai';

const Header = () => {
  const [, dispatch] = useContext(UserContext);
  const history = useHistory();
  const onClickLogout = () => {
    tokenStorage.clearToken();
    tokenStorage.clearUser();
    dispatch({
      type: userActions.LOGOUT,
    });
    history.push('/');
  };

  return (
    <Component>
      <Link to='/issues?isClosed=false'>
        <AiFillGithub size={42} style={{ color: 'white' }} />
      </Link>
      <IssueButton type='button'>
        <Link to='/issues?isClosed=false'>Issue Tracker</Link>
      </IssueButton>
      <LogoutButton type='button' onClick={onClickLogout}>
        로그아웃
      </LogoutButton>
    </Component>
  );
};

const Component = styled.header`
  width: 100%;
  height: 72px;
  min-height: 72px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${(props) => props.theme.color.headerBgColor};
`;

const IssueButton = styled.button`
  color: ${(props) => props.theme.color.whiteColor};
  font-size: ${(props) => props.theme.fontSize.xl};
  border: ${(props) => props.theme.color.borderColor};
  border-radius: 4px;
`;

const LogoutButton = styled.button`
  font-weight: 600;
  display: block;
  padding: 8px 12px;
  font-size: ${(props) => props.theme.fontSize.md};
  color: ${(props) => props.theme.color.textColor};
  background-color: ${(props) => props.theme.color.shadeBgColor};
  border-radius: 4px;
  &:hover {
    background-color: ${(props) => props.theme.color.hoverBgColor};
    color: ${(props) => props.theme.color.blueColor};
  }
`;

export default Header;
