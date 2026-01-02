import { useMemo } from "react";

export const usePagination = (currentPage, totalPage, siblingCount = 1) => {


  const paginationRangeMemoized = useMemo(() => {
    const firstPageNumber = 1;
    const lastPageNumber = totalPage;

    // - Multiplying 'siblingCount' by 2 ensures siblings on both left and right sides.
    // - Adding 5 ensures firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount * 2 + 5;

    // Check if all pages can be displayed without dots
    if (totalPageNumbers >= lastPageNumber) {
      return getPageNumberRange(firstPageNumber, lastPageNumber);
    }

    const leftSiblingPageNumber = Math.max(
      firstPageNumber,
      currentPage - siblingCount
    );
    const rightSiblingPageNumber = Math.min(
      lastPageNumber,
      currentPage + siblingCount
    );

    const hasLeftDots = leftSiblingPageNumber > 3;
    const hasRightDots = rightSiblingPageNumber < lastPageNumber - 2;

    // - Multiplying 'siblingCount' by 2 ensures siblings on both the left and right sides.
    // - Adding 3 ensures there are firstPage/lastPage +  currentPage + DOTS
    if (!hasLeftDots && hasRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftPageRange = getPageNumberRange(firstPageNumber, leftItemCount);
      return [...leftPageRange, DOTS, lastPageNumber];
    }

    if (hasLeftDots && !hasRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightPageRange = getPageNumberRange(
        lastPageNumber - rightItemCount + 1,
        lastPageNumber
      );
      return [firstPageNumber, DOTS, ...rightPageRange];
    }

    if (hasLeftDots && hasRightDots) {
      const middlePageRange = getPageNumberRange(
        leftSiblingPageNumber,
        rightSiblingPageNumber
      );
      return [firstPageNumber, DOTS, ...middlePageRange, DOTS, lastPageNumber];
    }
  }, [currentPage, totalPage, siblingCount]);

  return paginationRangeMemoized;

};

export const DOTS = "...";

const getPageNumberRange = (start, end) => {
  const pageRangeLength = end - start + 1;
  return Array.from({ length: pageRangeLength }, (_, index) => index + start);
};
