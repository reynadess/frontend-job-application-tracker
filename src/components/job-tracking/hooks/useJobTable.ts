import { useState, useMemo, useEffect } from 'react';
import { useApplicationsStore } from '@/hooks/zustand/store/useApplicationsStore';
import type { ApplicationsType } from '@/types/applications.types';
import type {
  JobTableFilters,
  JobTableSort,
  JobTablePagination,
} from '../types';
import { DEFAULT_VISIBLE_COLUMNS } from '../constants';
import { filterApplications, sortApplications, paginateData } from '../utils';

export function useJobTable() {
  const [filters, setFilters] = useState<JobTableFilters>({
    search: '',
    status: [],
    visibleColumns: DEFAULT_VISIBLE_COLUMNS,
  });

  const [sort, setSort] = useState<JobTableSort>({
    column: 'appliedDate',
    direction: 'desc',
  });

  const [pagination, setPagination] = useState<JobTablePagination>({
    currentPage: 1,
    rowsPerPage: 5,
    totalPages: 0,
  });

  const [selectedJobs, setSelectedJobs] = useState<number[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [selectedApplication, setSelectedApplication] =
    useState<ApplicationsType | null>(null);

  const Applications = useApplicationsStore((state) => state.Applications);
  const getAllUserApplications = useApplicationsStore(
    (state) => state.getAllUserApplications
  );
  const deleteApplicationById = useApplicationsStore(
    (state) => state.deleteApplicationById
  );

  useEffect(() => {
    getAllUserApplications();
  }, [getAllUserApplications]);

  const filteredAndSortedJobs = useMemo(() => {
    const filtered = filterApplications(
      Applications,
      filters.search,
      filters.status
    );
    return sortApplications(filtered, sort);
  }, [Applications, filters.search, filters.status, sort]);

  const paginatedJobs = useMemo(() => {
    return paginateData(
      filteredAndSortedJobs,
      pagination.currentPage,
      pagination.rowsPerPage
    );
  }, [filteredAndSortedJobs, pagination.currentPage, pagination.rowsPerPage]);

  const totalPages = Math.ceil(
    filteredAndSortedJobs.length / pagination.rowsPerPage
  );

  useEffect(() => {
    setPagination((prev) => ({ ...prev, totalPages }));
  }, [totalPages]);

  const handleSort = (column: string) => {
    setSort((prev) => ({
      column,
      direction:
        prev.column === column && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleFilterChange = (newFilters: Partial<JobTableFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handlePaginationChange = (
    newPagination: Partial<JobTablePagination>
  ) => {
    setPagination((prev) => ({ ...prev, ...newPagination }));
  };

  const toggleJobSelection = (jobId: number) => {
    setSelectedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const toggleAllJobs = () => {
    setSelectedJobs(
      selectedJobs.length === paginatedJobs.length
        ? []
        : paginatedJobs.map((job) => job.id)
    );
  };

  const handleApplicationDelete = async (id: number) => {
    try {
      await deleteApplicationById(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditApplication = (application: ApplicationsType) => {
    setSelectedApplication({ ...application });
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setSelectedApplication(null);
  };

  const handleOpenSheet = () => {
    setIsSheetOpen(true);
  };

  const handleReset = () => {
    //TODO : here
    // Reset all filters to their default values
    console.log('Bhai aa gaya yaha');
    setFilters({
      search: '',
      status: [],
      visibleColumns: DEFAULT_VISIBLE_COLUMNS,
    });

    // Reset sorting to default
    setSort({
      column: 'appliedDate',
      direction: 'desc',
    });

    // Reset pagination
    setPagination((prev) => ({
      ...prev,
      currentPage: 1,
    }));

    // Clear selected jobs
    setSelectedJobs([]);
  };

  return {
    // Data
    applications: Applications,
    filteredAndSortedJobs,
    paginatedJobs,

    // State
    filters,
    sort,
    pagination,
    selectedJobs,
    isSheetOpen,
    selectedApplication,

    // Actions
    handleSort,
    handleFilterChange,
    handlePaginationChange,
    toggleJobSelection,
    toggleAllJobs,
    handleApplicationDelete,
    handleEditApplication,
    handleCloseSheet,
    handleOpenSheet,
    handleReset,
  };
}
