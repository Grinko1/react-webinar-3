import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css'

const NavBar = ({children}) => {
      const cn = bem('Navbar');
    return (
        <div className={cn()}>
            {children}
        </div>
    );
};

export default NavBar;