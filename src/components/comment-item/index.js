import { cn as bem } from '@bem-react/classname';
import './style.css';
import PropTypes from 'prop-types';
import CommentForm from '../comment-form';
import dateFormat from '../../utils/date-format';


const CommentItem = ({
  comment,
  setActiveComment,
  activeComment,
  isDisabled,
  placeIdForForm,
  formRef,
  t,
  ...props
}) => {

  const isReplying = placeIdForForm === comment._id;
  const cn = bem('Comment');
  const isAuthor = props.username == comment.author;

  const marginForAnswear = comment.level * 30 > 600 ? 600 : comment.level * 30;
  const marginForForm = (activeComment?.level + 1) * 30;

  const handleReply = () => {
    setActiveComment({ id: comment._id, level: comment.level });
  };

  return (
    <>
      <div className={cn()} style={{ marginLeft: `${marginForAnswear}px` }}>
        <div className={cn('info', { author: isAuthor })}>
          {comment.author}{' '}
          <span className={cn('info', { time: true })}>{dateFormat(comment.date)}</span>
        </div>
        <div className={cn('text')}>{comment.text}</div>
        <div className={cn('btn')}>
          <button onClick={handleReply}>{t('comments.reply')}</button>
        </div>
      </div>
      {isReplying && (
        <div style={{ marginLeft: `${marginForForm}px` }} ref={formRef}>
          <CommentForm
            header={t('comments.newaswear')}
            isNew={false}
            isAuth={props.isAuth}
            path='/login'
            isDisabled={isDisabled}
            t={t}
            {...props}
            close={() => {
              setActiveComment(null);
            }}
          />
        </div>
      )}
    </>
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
  activeComment: PropTypes.object,
  setActiveComment: PropTypes.func,
};

CommentItem.defaultProps = {
  activeComment: PropTypes.null,
  setActiveComment: () => {},
};

export default CommentItem;
