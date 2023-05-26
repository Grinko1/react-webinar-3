import { memo, useCallback, useEffect, useState } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import { useTranslate } from '../../hooks/useTranslate';

function Main() {
  const store = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const skip = currentPage < 2 ? 0 : (currentPage - 1) * 10;
    store.actions.catalog.load(skip);
  }, [currentPage]);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    totalCount: state.catalog.totalCount,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.currentLanguage,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    //переключение страниц
    changePage: useCallback((page) => setCurrentPage(page), []),
    //изменение языка
    toggleLanguage: useCallback((ln) => store.actions.language.changeLanguage(ln), []),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
  };
  const translate = useTranslate();

  return (
    <PageLayout>
      <Head title={translate.name} toggleLanguage={callbacks.toggleLanguage} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        translate={translate}
        lang={select.lang}
      />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        currentPage={currentPage}
        limit={limit}
        changePage={callbacks.changePage}
        totalCount={select.totalCount}
      />
    </PageLayout>
  );
}

export default memo(Main);
