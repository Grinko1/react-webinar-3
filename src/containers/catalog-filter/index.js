import { memo, useCallback, useMemo } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import { categoryTree } from '../../utils';

function CatalogFilter() {
  const store = useStore();

  const select = useSelector((state) => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    categories: state.categories.categories,
    category: state.catalog.params.category,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback((sort) => store.actions.catalog.setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback((query) => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    // Сортировка по категории
    onCategorySelect: useCallback(
      (category) => store.actions.catalog.setParams({ category, page: 1 }),
      [store],
    ),
  };

  const sortedCategory = categoryTree(select.categories);


  const getOptions = (arr) => {
    let options = [{ value: '', title: 'Все' }];

     arr.forEach((item) => {
       let count = 0;
       getOptionRecursive(item, count);
     });
     
    function getOptionRecursive (item, count) {
      let prefix = '- '.repeat(count);
      options.push({ value: item._id, title: prefix + item.title });
      if (item.children) {
        item.children.forEach((child) => getOptionRecursive(child, count + 1));
      }
    };
   
    return options;
  };
 

  const options = {
    sort: useMemo(
      () => [
        { value: 'order', title: 'По порядку' },
        { value: 'title.ru', title: 'По именованию' },
        { value: '-price', title: 'Сначала дорогие' },
        { value: 'edition', title: 'Древние' },
      ],
      [],
    ),
    category: useMemo(() => getOptions(sortedCategory), [sortedCategory]),
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding='medium'>
      <Select
        options={options.category}
        value={select.category}
        onChange={callbacks.onCategorySelect}
      />
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={'Поиск'}
        delay={1000}
        theme='big'
      />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
