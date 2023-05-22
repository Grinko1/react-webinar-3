import React, { useCallback, useEffect, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cartList, cartTotalPrice, cartLength } = store.getState();

  const [isOpenModal, setIsModalOpen] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback(
      (code) => {
        store.deleteItemFromCart(code);
      },
      [store],
    ),
    onAddToCart: useCallback(
      (code) => {
        store.addItemToCart(code);
      },
      [store],
    ),
    onGetTotals: useCallback(() => {
      store.getTotals();
    }, [store]),
    getCartLength: useCallback(() => {
      store.getCartLength();
    }, [store]),
  };

  // Следит за обновлением корзины
  useEffect(() => {
    callbacks.onGetTotals();
    callbacks.getCartLength();
  }, [cartList]);

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls
        quantityUniqProduct={cartLength}
        cartTotalPrice={cartTotalPrice}
        setIsModalOpen={setIsModalOpen}
      />
      <List list={list} handleAction={callbacks.onAddToCart} />
      <Modal title='Корзина' isActive={isOpenModal} setIsActive={setIsModalOpen}>
        <List
          list={cartList}
          isCart={true}
          cartTotalPrice={cartTotalPrice}
          handleAction={callbacks.onDeleteItem}
        />
      </Modal>
    </PageLayout>
  );
}

export default App;
