import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Checkbox } from '@/shared/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Search, ChevronDown, X, Plus } from 'lucide-react';
import { Status_Options } from '@/shared/types/applications.types';
import { DEFAULT_VISIBLE_COLUMNS, TABLE_COLUMNS } from '../constants';
import type { JobTableFilters } from '../types';

interface TableControlsProps {
    filters: JobTableFilters;
    onFilterChange: (filters: Partial<JobTableFilters>) => void;
    onAddJob: () => void;
    onReset: () => void;
}

export function TableControls({
    filters,
    onFilterChange,
    onAddJob,
    onReset,
}: TableControlsProps) {
    const handleStatusFilter = (status: string) => {
        const newStatusFilters = filters.status.includes(status)
            ? filters.status.filter((s) => s !== status)
            : [...filters.status, status];

        onFilterChange({ status: newStatusFilters });
    };

    const handleColumnToggle = (columnUid: string) => {
        const newVisibleColumns = filters.visibleColumns.includes(columnUid)
            ? filters.visibleColumns.filter((c) => c !== columnUid)
            : [...filters.visibleColumns, columnUid];

        onFilterChange({ visibleColumns: newVisibleColumns });
    };

    const hasActiveFilters = () => {
        return (
            filters.search !== '' ||
            filters.status.length > 0 ||
            JSON.stringify(filters.visibleColumns) !==
                JSON.stringify(DEFAULT_VISIBLE_COLUMNS)
        );
    };

    return (
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-72">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search jobs..."
                    className="pl-8"
                    value={filters.search}
                    onChange={(e) => onFilterChange({ search: e.target.value })}
                />
            </div>

            <div className="flex flex-wrap items-center gap-2">
                {hasActiveFilters() && (
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8"
                        onClick={onReset}
                    >
                        Reset <X className="ml-2 h-4 w-4" />
                    </Button>
                )}

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8">
                            Status <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                        {Status_Options.map((status) => (
                            <DropdownMenuItem
                                key={status.uid}
                                className="flex items-center gap-2"
                                onSelect={(e) => {
                                    e.preventDefault();
                                    handleStatusFilter(status.uid);
                                }}
                            >
                                <Checkbox
                                    checked={filters.status.includes(
                                        status.uid
                                    )}
                                    className="h-4 w-4"
                                />
                                <span>{status.name}</span>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                        {TABLE_COLUMNS.map((column) => (
                            <DropdownMenuItem
                                key={column.uid}
                                className="flex items-center gap-2"
                                onSelect={(e) => {
                                    e.preventDefault();
                                    handleColumnToggle(column.uid);
                                }}
                            >
                                <Checkbox
                                    checked={filters.visibleColumns.includes(
                                        column.uid
                                    )}
                                    className="h-4 w-4"
                                />
                                <span>{column.name}</span>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button onClick={onAddJob}>
                    <Plus height={16} width={16} /> Add Job
                </Button>
            </div>
        </div>
    );
}
