import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Button from '../button';
import { cn as bem } from '@bem-react/classname';
import { formatCurrency } from '../../utils';

function CartItem(props) {
  const callbacks = {
    onDelete: () => {
      props.onDelete(props.item.code);
    },
  };

  const cn = bem('Item');
  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{formatCurrency(props.item.price)} </div>
      <div className={cn('amount')}>{props.item.cartQuantity} шт</div>
      <div className={cn('actions')}>
        <Button onClick={callbacks.onDelete}>Удалить</Button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    cartQuantity: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
};

CartItem.defaultProps = {
  onDelete: () => {},
};

export default React.memo(CartItem);
