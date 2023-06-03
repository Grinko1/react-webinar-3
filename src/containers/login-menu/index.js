import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import LoginTool from '../../components/login-tool/Index';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';

const LoginMenu = () => {
  const navigate = useNavigate();
  const store = useStore();

  useInit(() => {
    // получение информации о профиле 
    // (здесь тк в шапке нужно имя пользователя на всех страницах)
    store.actions.profile.getCurrentUserInfo();
  }, []);

  const select = useSelector((state) => ({
    waiting: state.auth.waiting,
    isAuth: state.auth.isAuth,
    error: state.auth.error,
    name: state.profile?.profile?.name,
  }));

  useEffect(() => {
    if (!select.isAuth) {
      store.actions.auth.loginByToken();
    }
  }, []);

  const callbacks = {
    logout: useCallback(() => store.actions.auth.logout(), [store]),
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
