import { memo } from 'react';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import LocaleSelect from '../../containers/locale-select';
import UserCard from '../../components/user-card';
import LoginMenu from '../../containers/login-menu';
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';

function Profile() {
  const store = useStore();
  useInit(() => {
    store.actions.profile.getUserInfo();
  }, []);

  const select = useSelector((state) => ({
    waiting: state.profile.waiting,
    profile: state.profile.profile,
  }));

  const { t } = useTranslate();

  return (
    <PageLayout>
      <LoginMenu />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <UserCard user={select.profile} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
