import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    if(currentPage!==Math.round(totalCount/pageSize)){
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if(currentPage-1!==0){
      onPageChange(currentPage - 1);
    }
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames('pagination m-0 ms-auto', { [className]: className })}
    >
      <li
        className={classnames('page-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
       <span className="page-link" tabIndex="-1" aria-disabled="true"><svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><polyline points="15 6 9 12 15 18"></polyline></svg></span>
      </li>
      {paginationRange.map((pageNumber,idx) => {
        if (pageNumber === DOTS) {
          return <li key={idx} className="page-item dots">&#8230;</li>;
        }

        return (
          <li key={idx}
            className={classnames('page-item', {
              active: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            <span className="page-link">{pageNumber}</span>
          </li>
        );
      })}
      <li
        className={classnames('page-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
       <span className="page-link"><svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><polyline points="9 6 15 12 9 18"></polyline></svg></span>
      </li>
    </ul>
  );
};

export default Pagination;
