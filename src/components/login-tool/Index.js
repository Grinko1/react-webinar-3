import './style.css';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';

const LoginTool = ({ handleRedirect, isAuth, link , name}) => {


  const cn = bem('Login');

  return (
    <div className={cn()}>
      {isAuth ? (
        <div>
          <Link to={link} className={cn('user')}>
            {name && name}
          </Link>
          <button onClick={handleRedirect} className={cn('button')}>
            Выход
          </button>
        </div>
      ) : (
        <button onClick={handleRedirect} className={cn('button')}>
          Вход
        </button>
      )}
    </div>
  );
};

export default LoginTool;
