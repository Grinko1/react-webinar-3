import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      totalCount: 0,
      product: {},
      currentPage: 1,
      limit: 10,
    };
  }

  async load() {
    const skip = this.getState().currentPage < 2 ? 0 : (this.getState().currentPage - 1) * 10;
    const limit = this.getState().limit;
    const response = await fetch(
      `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`,
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        totalCount: json.result.count,
      },
      'Загружены товары из АПИ',
    );
  }
  async loadProduct(id) {
    const response = await fetch(
      `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        product: json.result,
      },
      'Загружен товар из АПИ',
    );
  }
  pageSwitch(page) {
    this.setState(
      {
        ...this.getState(),
        currentPage: page,
      },
      'Переключилась страница',
    );

  }
}

export default Catalog;
