import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function Cart({ list, onDeleteItem, isCart = true, cartTotalPrice }) {
    const cn = bem('Cart');
  return (
    <>
      {list.length ? (
        <>
          <div className={cn()}>
            {list.map((item) => (
              <div key={item.code} className={cn('item')}>
                <Item item={item} onDelete={onDeleteItem} isCart={isCart} />
              </div>
            ))}
          </div>
          <div className={cn('total')}>
            Итого <span>{cartTotalPrice}</span>
          </div>
        </>
      ) : (
        <p className={cn('empty')}> Вы ещё ничего не добавили </p>
      )}
    </>
  );
}

Cart.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  isCart: PropTypes.bool,
  cartTotalPrice: PropTypes.number,
  onDeleteItem: PropTypes.func,
};

Cart.defaultProps = {
  onDeleteItem: () => {},
};

export default React.memo(Cart);
