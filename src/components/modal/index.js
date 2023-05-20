import React from 'react';
import PropTypes from 'prop-types';
import Head from '../head'
import './style.css';
import Button from '../button';

const Modal = ({ isActive = false, setIsActive, title, children }) => {
  return (
    <div className={isActive ? 'Modal Modal-visible' : 'Modal'} onClick={() => setIsActive(false)}>
      <div className='Modal-content' onClick={(e) => e.stopPropagation()}>
        <div className='Modal-content__header'>
          <Head title={title} />
          <Button onClick={() => setIsActive(false)}>Закрыть</Button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  isActive: PropTypes.bool,
  setIsActive: PropTypes.func,
};

Modal.defaultProps = {
  setIsActive: () => {},
};

export default Modal;
