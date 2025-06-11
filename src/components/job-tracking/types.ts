export interface JobTableColumn {
  name: string;
  uid: string;
  sortable?: boolean;
}

export interface JobTableFilters {
  search: string;
  status: string[];
  visibleColumns: string[];
}

export interface JobTableSort {
  column: string;
  direction: 'asc' | 'desc';
}

export interface JobTablePagination {
  currentPage: number;
  rowsPerPage: number;
  totalPages: number;
}
