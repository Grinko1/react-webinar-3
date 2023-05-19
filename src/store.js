import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление нового товара в корзину
   * * @param product
   */
  addItemToCart(product) {
    const existingIndex = this.state.cartList.findIndex((item) => item.code === product.code);
    if (existingIndex >= 0) {
      this.setState({
        ...this.state,
        cartList: this.state.cartList.map((item) => {
          if (item.code === product.code) {
            return {
              ...item,
              cartQuantity: item.cartQuantity + 1,
            };
          }
          return item;
        }),
      });
    } else {
      this.setState({
        ...this.state,
        cartList: [...this.state.cartList, { ...product, cartQuantity: 1 }],
      });
    }
  }

  /**
   * Удаление из корзины
   * @param code
   */
  deleteItemFromCart(code) {
    this.setState({
      ...this.state,
      cartList: this.state.cartList.filter((item) => item.code !== code),
    });
  }

  /**
   * Получение общего кол-ва и цены в корзине
   */
  getTotals() {
    let { total, quantity } = this.state.cartList.reduce(
      (cartTotal, cartItem) => {
        const { price, cartQuantity } = cartItem;
        const itemTotal = price * cartQuantity;

        cartTotal.total += itemTotal;
        cartTotal.quantity += cartQuantity;
        return cartTotal;
      },
      {
        total: 0,
        quantity: 0,
      },
    );
    this.setState({
      ...this.state,
      cartTotalQuantity: quantity,
      cartTotalPrice: total,
    });
  }

  ///unused methods

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? { ...item, selected: false } : item;
      }),
    });
  }
}

export default Store;
