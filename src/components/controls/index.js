import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Modal from '../modal';
import {plural} from '../../utils'
import Cart from '../cart';

function Controls({ list, onDeleteItem, cartTotalQuantity, cartTotalPrice }) {
  const [isOpenModal, setIsModalOpen] = useState(false);

  return (
    <div className='Controls'>
      <div className='Controls-card'>
        В корзине:
        <b className={cartTotalQuantity ? 'Controls-card__info' : 'Controls-card__info Empty_cart'}>
          {cartTotalQuantity
            ? `${cartTotalQuantity} ${plural(cartTotalQuantity, {
                one: 'товар',
                few: 'товара',
                many: 'товаров',
              })}  / ${cartTotalPrice}`
            : 'пусто'}
        </b>
      </div>
      <button onClick={() => setIsModalOpen(true)}>Перейти</button>
      <Modal modalHeader='Корзина' isActive={isOpenModal} setIsActive={setIsModalOpen}>
        <Cart
          list={list}
          isCart={true}
          onDeleteItem={onDeleteItem}
          cartTotalPrice={cartTotalPrice}
        />
      </Modal>
    </div>
  );
}

Controls.propTypes = {
  list: PropTypes.array.isRequired,
  onDeleteItem: PropTypes.func,
  cartTotalQuantity: PropTypes.number,
  cartTotalPrice: PropTypes.number,
};

Controls.defaultProps = {
  onDeleteItem: () => {},
};

export default React.memo(Controls);
