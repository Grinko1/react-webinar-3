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
  const list = store.getState().list;
  const cartList = store.getState().cartList;
  const cartTotalPrice = store.getState().cartTotalPrice;

  const [isOpenModal, setIsModalOpen] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback(
      (code) => {
        store.deleteItemFromCart(code);
      },
      [store],
    ),
    onAddToCart: useCallback(
      (product) => {
        store.addItemToCart(product);
      },
      [store],
    ),
    onGetTotals: useCallback(() => {
      store.getTotals();
    }, [store]),
  };

  // Следит за обновлением корзины
  useEffect(() => {
    callbacks.onGetTotals();
  }, [cartList]);

  // К-во уникальных товаров в корзине
  const quantityUniqProduct = cartList.length;

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls
        quantityUniqProduct={quantityUniqProduct}
        cartTotalPrice={cartTotalPrice}
        setIsModalOpen={setIsModalOpen}
      />
      <List list={list} onAddToCart={callbacks.onAddToCart} />
      <Modal title='Корзина' isActive={isOpenModal} setIsActive={setIsModalOpen}>
        <List
          list={cartList}
          isCart={true}
          onDeleteItem={callbacks.onDeleteItem}
          cartTotalPrice={cartTotalPrice}
        />
      </Modal>
   
    </PageLayout>
  );
}

export default App;
