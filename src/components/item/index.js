import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Button from '../button';
import { cn as bem } from '@bem-react/classname';

function Item(props) {
  const callbacks = {
    onDelete: () => {
      props.onDelete(props.item.code);
    },
    onAdd: () => {
      props.onAddToCart(props.item);
    },
  };

  const cn = bem('Item');
  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{props.item.price} </div>
      {props.isCart && <div className={cn('amount')}>{props.item.cartQuantity} шт</div>}
      <div className={cn('actions')}>
        {props.isCart ? (
          <Button onClick={callbacks.onDelete}>Удалить</Button>
        ) : (
          <Button onClick={callbacks.onAdd}>Добавить</Button>
        )}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
    cartQuantity: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func,
  isCart: PropTypes.bool,
};

Item.defaultProps = {
  onDelete: () => {},
  onAdd: () => {},
};

export default React.memo(Item);
