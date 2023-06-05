import { Navigate, useLocation } from 'react-router';
import useInit from '../hooks/use-init';
import useSelector from '../hooks/use-selector';
import useStore from '../hooks/use-store';

const RequireAuth = ({ children }) => {
  const store = useStore();
  const location = useLocation();

  useInit(() => {
    // проверка на авторизацию через токен
    store.actions.auth.loginByToken();
  }, []);

  const select = useSelector((state) => ({
    isAuth: state.auth.isAuth,
    waiting: state.auth.waiting,
    errorAuth: state.auth.errorAuth,
  }));

  if (!select.waiting && !select.isAuth && select.errorAuth !== null) {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;
