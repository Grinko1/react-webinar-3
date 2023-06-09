import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import CommentItem from '../comment-item';
import CommentForm from '../comment-form';

function CommentList({ comments , isAuth, ...props}) {

  return (
    <>
      {!!comments &&
        comments.map((item) => (
          <CommentItem
            key={item._id}
            activeComment={props.activeComment}
            setActiveComment={props.setActiveComment}
            comment={item}
            isAuth={isAuth}
            username={props.username}
            {...props}
          />
        ))}
      {props.activeComment === null && (
        <CommentForm header='Новый комментарий' isNew={true} isAuth={isAuth} {...props} />
      )}
    </>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ),
  isAuth: PropTypes.bool,
};

export default memo(CommentList);
