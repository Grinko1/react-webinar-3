import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { usePagination, DOTS } from '../../hooks/usePagination';
import PropTypes from 'prop-types';

const Pagination = ({ totalCount = 100, currentPage = 1, limit = 10, changePage }) => {
  const cn = bem('Pagination');

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    limit,
  });

  if (currentPage === 0 || paginationRange.length < 1) {
    return null;
  }

  return (
    <ul className={cn()}>
      {!!paginationRange &&
        paginationRange.map((pageNumber, i) => {
          if (pageNumber === DOTS) {
            return (
              <li className={cn('item', { dots: true })} key={i}>
                &#8230;
              </li>
            );
          }

          return (
            <li
              className={currentPage === pageNumber ? cn('item', { active: true }) : cn('item')}
              onClick={() => changePage(pageNumber)}
              key={i}>
              {pageNumber}
            </li>
          );
        })}
    </ul>
  );
};

Pagination.propTypes = {
  totalCount: PropTypes.number,
  currentPage: PropTypes.number,
  limit: PropTypes.number,
  changePage: PropTypes.func,
};

Pagination.defaultProps = {
  changePage: () => {},
};
export default Pagination;
