import { cn as bem } from '@bem-react/classname';
import './style.css';
import PropTypes from 'prop-types';
import CommentForm from '../comment-form';
import dateFormat from '../../utils/date-format';

const CommentItem = ({ comment, setActiveComment, activeComment, ...props }) => {
  const isReplying = activeComment && activeComment.id === comment._id;

  const cn = bem('Comment');
  const isAuthor = props.username == comment.author;

  const marginForAnswear = comment.level * 30 > 600 ? 600 : comment.level * 30;

  return (
    <div className={cn()} style={{ marginLeft: `${marginForAnswear}px` }}>
      <div className={cn('info', { author: isAuthor })}>
        {comment.author}{' '}
        <span className={cn('info', { time: true })}>{dateFormat(comment.date)}</span>
      </div>
      <div className={cn('text')}>{comment.text}</div>
      <div className={cn('btn')}>
        <button
          onClick={() =>
            setActiveComment({ id: comment._id})
          }>
          Ответить
        </button>
      </div>

      {isReplying && (
        <CommentForm
          header='Новый ответ '
          isNew={false}
          isAuth={props.isAuth}
          path='/login'
          {...props}
          close={() => {
            setActiveComment(null);
          }}
        />
      )}
    </div>
  );
};
CommentItem.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
    author: PropTypes.string,
    level: PropTypes.number,
    date: PropTypes.string,
  }).isRequired,
  // comment: PropTypes.object,
  activeComment: PropTypes.object,
  setActiveComment: PropTypes.func,
};

CommentItem.defaultProps = {
  activeComment: PropTypes.null,
  setActiveComment: () => {},
};

export default CommentItem;
