import StoreModule from '../module';

/**
 *  Список категорий
 */
class CategoryState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
    };
  }

  async loadCategories() {
    const response = await fetch(`/api/v1/categories?fields=*&limit=*`);
    const { result } = await response.json();
    this.setState(
      {
        ...this.getState(),
        categories: result.items,
      },
      'Загружены список категорий из АПИ',
    );
  }
}

export default CategoryState;
