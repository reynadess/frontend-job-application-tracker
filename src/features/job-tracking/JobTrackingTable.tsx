import { Table, TableBody, TableCell, TableRow } from '@/shared/components/ui/table';
import { TableControls } from './ui/TableControls';
import { JobTableHeader } from './ui/TableHeader';
import { JobTableRow } from './ui/TableRow';
import { TablePagination } from './ui/TablePagination';
import { useJobTable } from './hooks/useJobTable';
import { JobApplicationSheet } from './ui/JobApplicationSheet';
import SheetWrapper from '@/shared/components/sheets/SheetWrapper';
import { SHEETS } from '@/lib/constants/Profile.constant';

export default function JobTrackingTable() {
    const {
        filteredAndSortedJobs,
        paginatedJobs,
        filters,
        sort,
        pagination,
        selectedJobs,
        isSheetOpen,
        selectedApplication,
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
    } = useJobTable();

    const title = selectedApplication
        ? SHEETS.jobApplication.title.replace('Add', 'Edit')
        : SHEETS.jobApplication.title;

    return (
        <div className="m-auto w-[96%] space-y-4">
            <TableControls
                filters={filters}
                onFilterChange={handleFilterChange}
                onAddJob={handleOpenSheet}
                onReset={handleReset}
            />

            <div className="relative overflow-hidden rounded-md border">
                <div className="scrollbar-thin w-full overflow-x-auto">
                    <Table>
                        <JobTableHeader
                            visibleColumns={filters.visibleColumns}
                            sort={sort}
                            onSort={handleSort}
                            selectedCount={selectedJobs.length}
                            totalCount={paginatedJobs.length}
                            onToggleAll={toggleAllJobs}
                        />
                        <TableBody>
                            {paginatedJobs.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={
                                            filters.visibleColumns.length + 1
                                        }
                                        className="h-24 text-center"
                                    >
                                        Job applications not found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedJobs.map((job) => (
                                    <JobTableRow
                                        key={job.id}
                                        job={job}
                                        visibleColumns={filters.visibleColumns}
                                        isSelected={selectedJobs.includes(
                                            job.id
                                        )}
                                        onToggleSelection={toggleJobSelection}
                                        onEdit={handleEditApplication}
                                        onDelete={handleApplicationDelete}
                                    />
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <TablePagination
                pagination={pagination}
                selectedCount={selectedJobs.length}
                totalFilteredCount={filteredAndSortedJobs.length}
                onPaginationChange={handlePaginationChange}
            />

            {isSheetOpen && (
                <SheetWrapper
                    isOpen={isSheetOpen}
                    handleClose={handleCloseSheet}
                    title={title}
                    description={SHEETS.jobApplication.description}
                >
                    <JobApplicationSheet
                        handleClose={handleCloseSheet}
                        selectedApplication={selectedApplication}
                        key={selectedApplication?.id}
                    />
                </SheetWrapper>
            )}
        </div>
    );
}
