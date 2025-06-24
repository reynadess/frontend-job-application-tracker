import type { ApplicationsType } from '@/shared/types/applications.types';
import type { JobTableSort } from './types';

export function capitalize(s: string): string {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : '';
}

export function formatDate(date: string | Date | undefined): string {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toISOString().split('T')[0];
}

export function sortApplications(
    applications: ApplicationsType[],
    sort: JobTableSort
): ApplicationsType[] {
    return [...applications].sort((a, b) => {
        const { column, direction } = sort;
        const aValue = a[column as keyof ApplicationsType];
        const bValue = b[column as keyof ApplicationsType];

        // Special handling for dates
        if (column === 'appliedDate') {
            const dateA = new Date(a.appliedDate as Date | string);
            const dateB = new Date(b.appliedDate as Date | string);
            return direction === 'asc'
                ? dateA.getTime() - dateB.getTime()
                : dateB.getTime() - dateA.getTime();
        }

        // Special handling for salary
        if (column === 'salary') {
            const numA = a.ctcOffered ?? 0;
            const numB = b.ctcOffered ?? 0;
            return direction === 'asc' ? numA - numB : numB - numA;
        }

        // Default string comparison
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return direction === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }

        return 0;
    });
}

export function filterApplications(
    applications: ApplicationsType[],
    searchTerm: string,
    statusFilters: string[]
): ApplicationsType[] {
    let filtered = [...applications];

    if (searchTerm) {
        filtered = filtered.filter(
            (job) =>
                job?.company
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                job?.role?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    if (statusFilters.length > 0) {
        filtered = filtered.filter((job) => statusFilters.includes(job.status));
    }

    return filtered;
}

export function paginateData<T>(
    data: T[],
    currentPage: number,
    rowsPerPage: number
): T[] {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return data.slice(start, end);
}
