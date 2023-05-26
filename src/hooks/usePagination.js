import React from 'react';
import { useMemo } from 'react';

export const DOTS = '...';

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({ totalCount, limit = 10, currentPage }) => {
  
  const paginationRange = useMemo(() => {
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
  }, [totalCount, limit, currentPage]);

  return paginationRange;
};
