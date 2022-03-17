export namespace Pagination {
  export type IProps = {
    onPageChange: (pageIndex: number) => void;
    totalCount?: number;
    siblingCount?: number;
    currentPage?: number;
    pageSize?: number;
  };
}
