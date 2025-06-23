import type React from 'react';

import { TableHead, TableHeader, TableRow } from '@/shared/components/ui/table';
import { Checkbox } from '@/shared/components/ui/checkbox';
import {
    ChevronDown,
    Building2,
    Briefcase,
    BadgeDollarSign,
    CalendarIcon,
} from 'lucide-react';
import type { JobTableSort } from '../types';

interface TableHeaderProps {
    visibleColumns: string[];
    sort: JobTableSort;
    onSort: (column: string) => void;
    selectedCount: number;
    totalCount: number;
    onToggleAll: () => void;
}

export function JobTableHeader({
    visibleColumns,
    sort,
    onSort,
    selectedCount,
    totalCount,
    onToggleAll,
}: TableHeaderProps) {
    const SortButton = ({
        column,
        children,
        icon,
    }: {
        column: string;
        children: React.ReactNode;
        icon?: React.ReactNode;
    }) => (
        <button
            className="flex items-center gap-1"
            onClick={() => onSort(column)}
        >
            {icon}
            {children}
            {sort.column === column && (
                <ChevronDown
                    className={`h-4 w-4 ${sort.direction === 'desc' ? 'rotate-180' : ''}`}
                />
            )}
        </button>
    );

    return (
        <TableHeader>
            <TableRow>
                <TableHead className="sticky left-0 z-20 w-[40px] whitespace-nowrap bg-background px-2">
                    <Checkbox
                        checked={selectedCount === totalCount && totalCount > 0}
                        onCheckedChange={onToggleAll}
                        aria-label="Select all"
                    />
                </TableHead>

                {visibleColumns.includes('company') && (
                    <TableHead className="sticky left-[40px] z-20 w-[140px] whitespace-nowrap bg-background px-2">
                        <SortButton
                            column="company"
                            icon={
                                <Building2 className="mr-1 hidden h-4 w-4 lg:block" />
                            }
                        >
                            Company
                        </SortButton>
                    </TableHead>
                )}

                {visibleColumns.includes('role') && (
                    <TableHead className="w-[180px] whitespace-nowrap px-2">
                        <SortButton
                            column="role"
                            icon={
                                <Briefcase className="mr-1 hidden h-4 w-4 sm:block" />
                            }
                        >
                            Position
                        </SortButton>
                    </TableHead>
                )}

                {visibleColumns.includes('salary') && (
                    <TableHead className="hidden w-[100px] whitespace-nowrap md:table-cell">
                        <SortButton
                            column="salary"
                            icon={<BadgeDollarSign className="mr-1 h-4 w-4" />}
                        >
                            Salary
                        </SortButton>
                    </TableHead>
                )}

                {visibleColumns.includes('appliedDate') && (
                    <TableHead className="hidden w-[120px] whitespace-nowrap md:table-cell">
                        <SortButton
                            column="appliedDate"
                            icon={<CalendarIcon className="mr-1 h-4 w-4" />}
                        >
                            Applied Date
                        </SortButton>
                    </TableHead>
                )}

                {visibleColumns.includes('status') && (
                    <TableHead className="hidden w-[120px] whitespace-nowrap md:table-cell">
                        <SortButton column="status">Status</SortButton>
                    </TableHead>
                )}

                {visibleColumns.includes('actions') && (
                    <TableHead className="hidden w-[80px] whitespace-nowrap text-right md:table-cell">
                        Actions
                    </TableHead>
                )}
            </TableRow>
        </TableHeader>
    );
}
