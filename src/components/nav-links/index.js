import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css';

/* компонент для меню навигации */
const NavLinks = ({ title }) => {
  const cn = bem('Nav');
  return (
    <div className={cn()}>
      <Link className={cn('link')} to='/'>
        {title}
      </Link>
    </div>
  );
};
NavLinks.propTypes = {
  path: PropTypes.string,
  title: PropTypes.string,
};

export default NavLinks;
