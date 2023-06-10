import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentWrapper({head, qtt, children}) {

  const cn = bem('CommentWrapper');

  return (
    <div className={cn()}>
      <h2 className={cn('head')}>
        {head} ({qtt})
      </h2>
      <div className={cn('center')}>
        {children}
      </div>

    </div>
  );
}

CommentWrapper.propTypes = {
  head: PropTypes.string,
  qtt: PropTypes.number,
  children: PropTypes.node
}

export default memo(CommentWrapper);
