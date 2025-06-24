import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/shared/components/ui/pagination';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/components/ui/select';
import type { JobTablePagination } from '../types';
import { ROWS_PER_PAGE_OPTIONS } from '../constants';

interface TablePaginationProps {
    pagination: JobTablePagination;
    selectedCount: number;
    totalFilteredCount: number;
    onPaginationChange: (pagination: Partial<JobTablePagination>) => void;
}

export function TablePagination({
    pagination,
    selectedCount,
    totalFilteredCount,
    onPaginationChange,
}: TablePaginationProps) {
    const { currentPage, rowsPerPage, totalPages } = pagination;

    const handlePageChange = (page: number) => {
        onPaginationChange({ currentPage: page });
    };

    const handleRowsPerPageChange = (value: string) => {
        onPaginationChange({
            rowsPerPage: Number.parseInt(value),
            currentPage: 1,
        });
    };

    return (
        <div className="flex flex-col items-center justify-between gap-4 py-2 sm:flex-row">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div>
                    {selectedCount} of {totalFilteredCount} selected
                </div>
                <div className="flex items-center gap-1">
                    <span>Rows per page:</span>
                    <Select
                        value={rowsPerPage.toString()}
                        onValueChange={handleRowsPerPageChange}
                    >
                        <SelectTrigger className="h-8 w-16">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {ROWS_PER_PAGE_OPTIONS.map((option) => (
                                <SelectItem
                                    key={option}
                                    value={option.toString()}
                                >
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() =>
                                handlePageChange(Math.max(1, currentPage - 1))
                            }
                            className={
                                currentPage === 1
                                    ? 'pointer-events-none opacity-50'
                                    : ''
                            }
                        />
                    </PaginationItem>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNumber = i + 1;
                        return (
                            <PaginationItem key={pageNumber}>
                                <PaginationLink
                                    isActive={currentPage === pageNumber}
                                    onClick={() => handlePageChange(pageNumber)}
                                >
                                    {pageNumber}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}

                    {totalPages > 5 && (
                        <>
                            <PaginationItem>
                                <span className="pointer-events-none opacity-50">
                                    ...
                                </span>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink
                                    onClick={() => handlePageChange(totalPages)}
                                >
                                    {totalPages}
                                </PaginationLink>
                            </PaginationItem>
                        </>
                    )}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() =>
                                handlePageChange(
                                    Math.min(totalPages, currentPage + 1)
                                )
                            }
                            className={
                                currentPage === totalPages
                                    ? 'pointer-events-none opacity-50'
                                    : ''
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
