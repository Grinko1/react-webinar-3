import { cn as bem } from '@bem-react/classname';
import './style.css';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';


const CommentForm = ({ header, isNew, isAuth, path, close, text, setText, handleAddComment,isDisabled,t, ...props }) => {
  const cn = bem('CommentForm');
const location = useLocation();

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
              <button disabled={isDisabled} onClick={(e) => handleAddComment(e)}>
                {t('comments.send')}
              </button>
              {!isNew && <button onClick={closeForm}> {t('comments.canсel')}</button>}
            </div>
          </form>
        </>
      ) : (
        <>
          {isNew ? (
            <p className={cn('unauthorize')}>
              <Link to={path} state={{ back: location }}>
                {t('comments.login')}
              </Link>
              , {t('comments.loginToComment')}
            </p>
          ) : (
            <p className={cn('unauthorize')}>
              <Link to={path} state={{ back: location }}>
                {t('comments.login')}
              </Link>
              , {t('comments.loginToReply')}.{' '}
              <span className={cn('cancel')} onClick={close}>
                {' '}
                {t('comments.canсel')}
              </span>
            </p>
          )}
        </>
      )}
    </div>
  );
};
CommentForm.propTypes = {
  header: PropTypes.string,
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
