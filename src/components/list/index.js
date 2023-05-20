import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import CartItem from '../cart-item';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { formatCurrency } from '../../utils';

function List({ list, onAddToCart, isCart = false, onDeleteItem, cartTotalPrice }) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      <>
        {list.map((item) => (
          <div key={item.code} className={isCart ? cn('item', { cart: true }) : cn('item')}>
            {isCart ? (
              <CartItem item={item} onDelete={onDeleteItem} />
            ) : (
              <Item item={item} onAddToCart={onAddToCart} />
            )}
          </div>
        ))}

        {!!list.length && isCart && (
          <div className={cn('cart', { total: true })}>
            Итого <span>{formatCurrency(cartTotalPrice)}</span>
          </div>
        )}
      </>

      {!list.length && isCart && (
        <p className={cn('cart', { empty: true })}> Вы ещё ничего не добавили </p>
      )}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onAddToCart: PropTypes.func,
  isCart: PropTypes.bool,
  cartTotalPrice: PropTypes.number,
  onDeleteItem: PropTypes.func,
};

List.defaultProps = {
  onAddToCart: () => {},
  onDeleteItem: () => {},
};

export default React.memo(List);
