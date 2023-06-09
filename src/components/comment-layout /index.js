import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentLayout({head, qtt, children}) {

  const cn = bem('CommentLayout');

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

CommentLayout.propTypes = {
  head: PropTypes.string,
  qtt: PropTypes.number,
  children: PropTypes.node
}

export default memo(CommentLayout);
