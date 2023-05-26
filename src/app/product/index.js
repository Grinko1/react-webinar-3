import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import BasketTool from '../../components/basket-tool';
import ProductInfo from '../../components/product-info';
import { useTranslate } from '../../hooks/useTranslate';

function Product() {
  const store = useStore();
  const { id } = useParams();
  useEffect(() => {
    store.actions.catalog.loadProduct(id);
  }, []);
  const select = useSelector((state) => ({
    product: state.catalog.product,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.currentLanguage,
  }));
  const translate = useTranslate();
  const callbacks = {
    addToBasket: useCallback((id) => store.actions.basket.addToBasket(id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    toggleLanguage: useCallback((ln) => store.actions.language.changeLanguage(ln), []),
  };

  return (
    <PageLayout>
      <Head title={select.product.title} toggleLanguage={callbacks.toggleLanguage} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        translate={translate}
        lang={select.lang}
      />
      <ProductInfo
        product={select.product}
        addToBasket={callbacks.addToBasket}
        translate={translate}
      />
    </PageLayout>
  );
}

export default Product;
