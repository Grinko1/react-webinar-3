import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Button = ({ children, ...props }) => {
  return (
    <button {...props} className='Button-default'>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
};
export default Button;
