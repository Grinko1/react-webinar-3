import { memo, useCallback } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useTranslate } from '../../hooks/useTranslate';

function Basket() {
  const store = useStore();
  const select = useSelector((state) => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.currentLanguage,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback((_id) => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };
  const handleCloseModal = () => {
    callbacks.closeModal();
  };

  const translate = useTranslate();

  const renders = {
    itemBasket: useCallback(
      (item) => {
        return (
          <ItemBasket
            item={item}
            onRemove={callbacks.removeFromBasket}
            handleCloseModal={handleCloseModal}
            lang={select.lang}
          />
        );
      },
      [callbacks.removeFromBasket],
    ),
  };

  return (
    <ModalLayout title={translate.cart} onClose={callbacks.closeModal} translate={translate}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} translate={translate} />
    </ModalLayout>
  );
}

export default memo(Basket);
