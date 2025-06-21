import type { JobTableColumn } from './types';

export const TABLE_COLUMNS: JobTableColumn[] = [
    { name: 'COMPANY', uid: 'company', sortable: true },
    { name: 'ROLE', uid: 'role', sortable: true },
    { name: 'SALARY', uid: 'salary', sortable: true },
    { name: 'APPLIED DATE', uid: 'appliedDate', sortable: true },
    { name: 'STATUS', uid: 'status', sortable: true },
    { name: 'ACTIONS', uid: 'actions' },
];

export const STATUS_COLOR_MAP: Record<string, string> = {
    Applied: 'blue',
    Offered: 'purple',
    Rejected: 'destructive',
    Accepted: 'success',
    Apply: 'orange',
    InProgress: 'gray',
};

export const DEFAULT_VISIBLE_COLUMNS = [
    'company',
    'role',
    'salary',
    'appliedDate',
    'status',
    'actions',
];

export const ROWS_PER_PAGE_OPTIONS = [5, 10, 15];
