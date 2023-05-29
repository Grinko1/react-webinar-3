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
      currentPage: 1,
      limit: 10,
      loading: false
    };
  }

  async load(page) {
     this.setState(
       {
         ...this.getState(),
         loading:true,
         currentPage:page
       }
     );
    const skip = page < 2 ? 0 : (page - 1) * 10;
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
        loading:false
      },
      'Загружены товары из АПИ',
    );
  }

}

export default Catalog;
