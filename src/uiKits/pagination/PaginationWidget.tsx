import React, { FC } from 'react';
import { Pagination } from './Pagination';
import { usePagination, DOTS } from './UsePagination';
import { SectionPagination } from './style';

function PaginationWidget(props): any {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  const lastPage = paginationRange[paginationRange.length - 1];
  if (currentPage === 0 || paginationRange.length < 2) {
    return undefined;
  }

  const onNext = () => {
    if (currentPage < lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <SectionPagination>
      <ul>
        <li onClick={onPrevious} className={currentPage > 1 ? 'active' : ''}>
          <span className='arrow'>‹</span>
          <span>قبلی</span>
        </li>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return <li className='dots'>&#8230;</li>;
          }

          return (
            <li
              className={pageNumber === currentPage ? 'selected' : ''}
              onClick={() => onPageChange(pageNumber)}
              key={index}
            >
              {pageNumber}
            </li>
          );
        })}
        <li
          onClick={onNext}
          className={currentPage === lastPage ? '' : 'active'}
        >
          <span>بعدی</span>
          <span className='arrow'>›</span>
        </li>
      </ul>
    </SectionPagination>
  );
}

export default PaginationWidget;
