import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Button from '../button';
import { cn as bem } from '@bem-react/classname';
import { formatCurrency } from '../../utils';

function Item(props) {
  const callbacks = {
    onAdd: () => {
      props.handleAction(props.item);
    },
  };
  const cn = bem('Item');
  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{formatCurrency(props.item.price)} </div>
      <div className={cn('actions')}>
        <Button onClick={callbacks.onAdd}>Добавить</Button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Item);
