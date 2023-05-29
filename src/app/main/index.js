import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import { useTranslate } from '../../hooks/use-translate';
import NavBar from '../../components/nav-bar';
import NavLinks from '../../components/nav-links';
import Loader from '../../components/loader';

function Main() {
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    loading: state.catalog.loading,
    // данные для пагинации
    currentPage: state.catalog.currentPage,
    limit: state.catalog.limit,
    totalCount: state.catalog.totalCount,

    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.currentLanguage,
  }));

  const getProductsByPage = (page = 1) => {
    store.actions.catalog.load(page);
  };

  useEffect(() => {
    getProductsByPage();
  }, []);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    //изменение языка
    toggleLanguage: useCallback((ln) => store.actions.language.changeLanguage(ln), [store]),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} route={`product`} />;
      },
      [callbacks.addToBasket],
    ),
  };
  const translate = useTranslate();

  return (
    <PageLayout>
      <Head
        title={translate.name}
        toggleLanguage={callbacks.toggleLanguage}
        language={select.lang}
      />
      <NavBar>
        <NavLinks title={translate?.main} />

        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          translate={translate}
          lang={select.lang}
        />
      </NavBar>

      {select.loading ? (
        <Loader />
      ) : (
        <>
          <List list={select.list} renderItem={renders.item} />
          <Pagination
            currentPage={select.currentPage}
            limit={select.limit}
            changePage={getProductsByPage}
            totalCount={select.totalCount}
          />
        </>
      )}
    </PageLayout>
  );
}

export default memo(Main);
