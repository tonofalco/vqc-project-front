
interface TableProps {
  currentPage: number;
  itemsPerPage: number;
  setPage: (page: number) => void;
  events: Array<any>;
}