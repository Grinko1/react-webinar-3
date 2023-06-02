import { memo, useCallback, useMemo } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import LocaleSelect from '../../containers/locale-select';
import UserCard from '../../components/user-card';
import LoginMenu from '../../containers/login-menu';

function Profile() {
  const store = useStore();

  const location = useLocation();
  useInit(() => {
    // проверка на авторизацию через токен авторизовать
    store.actions.user.loginByToken();
  }, []);

  const select = useSelector((state) => ({
    waiting: state.user.waiting,
    user: state.user.userProfile,
    isAuth: state.user.isAuth,
  }));

  const { t } = useTranslate();

  // если нет токена редирект на логин
  if (select.isAuth === false) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return (
    <PageLayout>
      <LoginMenu />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <UserCard user={select.user} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
