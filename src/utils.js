/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}


/**
 * Пагинация
 * @param totalCount {Number}
 * @param limit {Number}
 * @param currentPage {Number}
 * @returns {Array}
 */


export const DOTS = '...';

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export function pageGenerator ({ totalCount, limit, currentPage }) {
  const totalPageCount = Math.ceil(totalCount / limit);
  if (totalPageCount <= 1) {
    return range(1, totalPageCount);
  }

  // индекс соседних элементов
  const leftNeighbourIndex = Math.max(currentPage - 1, 1);
  const rightNeighbourIndex = Math.min(currentPage + 1, totalPageCount);

  // По индексу соседних элементов определяем нужно ли показывать точки
  const shouldShowLeftDots = leftNeighbourIndex > 2;
  const shouldShowRightDots = rightNeighbourIndex < totalPageCount - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPageCount;

  //  по индексу текущей страницы определям сколько страниц должно отображаться
  //  слева/справа от текущей страницы
  if (!shouldShowLeftDots && shouldShowRightDots) {
    let leftItemCount = currentPage <= 2 ? 3 : 4;
    let leftRange = range(1, leftItemCount);
    return [...leftRange, DOTS, totalPageCount];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    let rightItemCount = currentPage >= totalPageCount - 1 ? 3 : 4;
    let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
    return [firstPageIndex, DOTS, ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    let middleRange = range(leftNeighbourIndex, rightNeighbourIndex);
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }

  return pageGenerator;
};
