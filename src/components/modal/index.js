import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Modal = ({ isActive = false, setIsActive, modalHeader, children }) => {
  return (
    <div className={isActive ? 'Modal Modal-visible' : 'Modal'} onClick={() => setIsActive(false)}>
      <div className='Modal-content' onClick={(e) => e.stopPropagation()}>
        <div className='Modal-content__header'>
          <h1>{modalHeader}</h1>
          <button onClick={() => setIsActive(false)}>Закрыть</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  modalHeader: PropTypes.string,
  isActive: PropTypes.bool,
  setIsActive: PropTypes.func,
};

Modal.defaultProps = {
  setIsActive: () => {},
};

export default Modal;
