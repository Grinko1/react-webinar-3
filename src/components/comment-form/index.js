import { cn as bem } from '@bem-react/classname';
import './style.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const CommentForm = ({ header, isNew, isAuth, path, close, text, setText, handleAddComment }) => {
  const cn = bem('CommentForm');

  const closeForm = (e) => {
    e.preventDefault();
    close(false);
  };

  return (
    <div className={cn()}>
      {isAuth ? (
        <>
          <span className={cn('header')}>{header}</span>
          <form className={cn('form')}>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
            <div className={cn('buttons')}>
              <button onClick={(e) => handleAddComment(e)}>Отправить</button>
              {!isNew && <button onClick={closeForm}>Отмена</button>}
            </div>
          </form>
        </>
      ) : (
        <>
          {isNew ? (
            <p className={cn('unauthorize')}>
              <Link to={path}>Войдите</Link>, чтобы иметь возможность комментировать
            </p>
          ) : (
            <p className={cn('unauthorize')}>
              <Link to={path}>Войдите</Link>, чтобы иметь возможность ответить.{' '}
              <span className={cn('cancel')} onClick={close}>
                {' '}
                Отмена
              </span>
            </p>
          )}
        </>
      )}
    </div>
  );
};
CommentForm.propTypes = {
  header: PropTypes.oneOf(['Новый комментарий', 'Новый ответ ']),
  isNew: PropTypes.bool,
  isAuth: PropTypes.bool,
  path: PropTypes.string,
  close: PropTypes.func,
  text: PropTypes.string,
  setText: PropTypes.func,
  handleAddComment: PropTypes.func,
};

CommentForm.defaultProps = {
  header: 'Новый комментарий',
  isNew: false,
  path: '/login',
  close: () => {},
  setText: () => {},
  handleAddComment: () => {},
};

export default CommentForm;
