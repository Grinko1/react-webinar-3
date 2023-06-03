import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import LocaleSelect from '../../containers/locale-select';
import LoginForm from '../../components/login-form';
import LoginMenu from '../../containers/login-menu';

function Login() {
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';

  const callbacks = {
    login: useCallback((data) => store.actions.auth.login(data), [store]),
  };

  const [values, setValues] = useState({
    login: '',
    password: '',
  });

  const select = useSelector((state) => ({
    waiting: state.auth.waiting,
    error: state.auth.error,
    isAuth: state.auth.isAuth,
  }));


  const [err, setErr] = useState(select.error);

  function handleLogin(e) {
    e.preventDefault();
    if (!values.login.length || !values.password.length) {
      setErr('Заполните все поля!');
    }
    callbacks.login(values);

    setValues({
      login: '',
      password: '',
    });
  }

  useEffect(() => {
    if (select.isAuth) {
      navigate(fromPage);
    }
  }, [select.isAuth]);

  const { t } = useTranslate();

  return (
    <PageLayout>
      <LoginMenu />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <LoginForm
          values={values}
          setValues={setValues}
          handleLogin={handleLogin}
          error={select.error}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);
