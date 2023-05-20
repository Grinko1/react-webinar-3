import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { formatCurrency, plural } from '../../utils';
import Button from '../button';
import { cn as bem } from '@bem-react/classname';

function Controls({ quantityUniqProduct, cartTotalPrice, setIsModalOpen }) {
  const cn = bem('Controls');

  // функция склонения, вынесла для лучшей читаемости
  const getDeclination = (count) => {
    return plural(count, {
      one: 'товар',
      few: 'товара',
      many: 'товаров',
    });
  };

  return (
    <div className={cn()}>
      <div className={cn('cart')}>
        В корзине:
        <b className={cn('cart', { info: true })}>
          {quantityUniqProduct
            ? `${quantityUniqProduct} ${getDeclination(quantityUniqProduct)} / ${formatCurrency(cartTotalPrice)}`
            : 'пусто'}
        </b>
      </div>
      <Button onClick={() => setIsModalOpen(true)}>Перейти</Button>
    </div>
  );
}

Controls.propTypes = {
  quantityUniqProduct: PropTypes.number.isRequired,
  cartTotalPrice: PropTypes.number,
  setIsModalOpen: PropTypes.func,
};

Controls.defaultProps = {
  setIsModalOpen: () => {},
};

export default React.memo(Controls);
