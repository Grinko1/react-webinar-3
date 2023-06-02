import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import LoginTool from '../../components/login-tool/Index';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';

const LoginMenu = () => {
  const navigate = useNavigate();
  const store = useStore();

  const select = useSelector((state) => ({
    waiting: state.user.waiting,
    isAuth: state.user.isAuth,
    name: state.user?.userProfile?.name,
    error: state.user.error,
  }));

  useEffect(() => {
    if (!select.isAuth) {
      store.actions.user.loginByToken();
    }
  }, []);

  const callbacks = {
    logout: useCallback(() => store.actions.user.logout(), [store]),
  };

  const redirectToLogin = () => {
    if (select.isAuth) {
      callbacks.logout();
    } else {
      navigate('/login');
    }
  };

  return (
    <LoginTool
      handleRedirect={redirectToLogin}
      isAuth={select.isAuth}
      link='/profile'
      name={select.name}
    />
  );
};

export default LoginMenu;
