import React, { useCallback, useEffect } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cartList = store.getState().cartList;
  const cartTotalQuantity = store.getState().cartTotalQuantity;
  const cartTotalPrice = store.getState().cartTotalPrice;

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

  useEffect(() => {
    callbacks.onGetTotals();
  }, [cartList]);

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls
        onDeleteItem={callbacks.onDeleteItem}
        list={cartList}
        cartTotalQuantity={cartTotalQuantity}
        cartTotalPrice={cartTotalPrice}
      />
      <List list={list} onAddToCart={callbacks.onAddToCart} />
    </PageLayout>
  );
}

export default App;
