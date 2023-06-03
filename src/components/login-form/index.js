import { cn as bem } from '@bem-react/classname';
import './style.css';
import PropTypes from 'prop-types';

const LoginForm = ({ values, setValues, handleLogin, error }) => {
  const cn = bem('LoginForm');
  return (
    <div className={cn()}>
      <h2>Вход</h2>
      <form className={cn('form')}>
        <label>Логин</label>
        <input
          className={cn('form', { input: true })}
          value={values.login}
          onChange={(e) => setValues({ ...values, login: e.target.value })}
        />
        <label>Пароль</label>
        <input
          className={cn('form', { input: true })}
          type='password'
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
        />

        {error && <span className={cn('form', { error: true })}>{error}</span>}
        <button onClick={handleLogin}>Войти</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  values: PropTypes.object,
  handleLogin: PropTypes.func,
  setValues: PropTypes.func,
  error: PropTypes.string
};

LoginForm.defaultProps = {
  handleLogin:  () => {},
  setValues:  () => {},

};
export default LoginForm;
