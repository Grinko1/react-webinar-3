import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const UserCard = ({ user }) => {
  const cn = bem('UserCard');
  return (
    <div className={cn()}>
      <h2>Профиль</h2>
      {!!user && (
        <>
          <div className={cn('prop')}>
            <div className={cn('label')}>Имя:</div>
            <div className={cn('value')}>{user.name}</div>
          </div>
          <div className={cn('prop')}>
            <div className={cn('label')}>Телефон:</div>
            <div className={cn('value')}>{user.phone}</div>
          </div>
          <div className={cn('prop')}>
            <div className={cn('label')}>email:</div>
            <div className={cn('value')}>{user.email}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserCard;
