import type React from 'react';

import { TableCell, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    MoreVertical,
    Clock,
    Calendar,
    BadgeDollarSign,
    Check,
    X,
} from 'lucide-react';
import {
    type ApplicationsType,
    ApplicationStatus,
} from '@/types/applications.types';
import { STATUS_COLOR_MAP } from '../constants';
import { capitalize, formatDate } from '../utils';
import JobApplicationDetailsPopup from './JobApplicationDetailsPopup';

interface JobTableRowProps {
    job: ApplicationsType;
    visibleColumns: string[];
    isSelected: boolean;
    onToggleSelection: (jobId: number) => void;
    onEdit: (job: ApplicationsType) => void;
    onDelete: (jobId: number) => void;
}

export function JobTableRow({
    job,
    visibleColumns,
    isSelected,
    onToggleSelection,
    onEdit,
    onDelete,
}: JobTableRowProps) {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case ApplicationStatus.Applied:
                return <Clock className="mr-1 h-3 w-3" />;
            case ApplicationStatus.InProgress:
                return <Calendar className="mr-1 h-3 w-3" />;
            case ApplicationStatus.Offered:
                return <BadgeDollarSign className="mr-1 h-3 w-3" />;
            case ApplicationStatus.Rejected:
                return <X className="mr-1 h-3 w-3" />;
            case ApplicationStatus.Accepted:
                return <Check className="mr-1 h-3 w-3" />;
            default:
                return null;
        }
    };

    const getStatusBadgeClass = (status: string) => {
        const colorMap = STATUS_COLOR_MAP[status];
        if (colorMap === 'success') return '';
        if (colorMap === 'destructive') return 'bg-red-100 text-red-800';
        if (colorMap === 'yellow') return 'bg-yellow-100 text-yellow-800';
        if (colorMap === 'blue') return 'bg-blue-100 text-blue-800';
        if (colorMap === 'purple') return 'bg-purple-100 text-purple-800';
        return '';
    };

    const handleEditClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        onEdit(job);
    };

    return (
        <TableRow key={job.id}>
            <TableCell className="sticky left-0 z-20 bg-background px-2">
                <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => onToggleSelection(job.id)}
                    aria-label={`Select job at ${job.company}`}
                />
            </TableCell>

            {visibleColumns.includes('company') && (
                <TableCell className="sticky left-[40px] z-20 bg-background px-2">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="hidden h-8 w-8 items-center justify-center rounded-full bg-muted lg:flex">
                            <Avatar>
                                <AvatarImage
                                    src="https://imgs.search.brave.com/KXIQDgZs6Cs98mfa4pLMtF1oVpNgpmgIpSjvVUIyImM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZWdp/c3RyeS5ucG1taXJy/b3IuY29tL0Bsb2Jl/aHViL2ljb25zLXN0/YXRpYy1wbmcvbGF0/ZXN0L2ZpbGVzL2Rh/cmsvZ29vZ2xlLWNv/bG9yLnBuZw"
                                    alt="Company logo"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="max-w-[100px] truncate font-medium">
                            {job.company || 'N/A'}
                        </div>
                    </div>
                </TableCell>
            )}

            {visibleColumns.includes('role') && (
                <TableCell className="px-2 sm:px-4">
                    <div className="flex flex-col">
                        <span className="truncate font-medium">
                            {job.role || 'N/A'}
                        </span>
                        <span className="hidden text-xs text-muted-foreground sm:block">
                            {job.city}
                        </span>
                    </div>
                </TableCell>
            )}

            {visibleColumns.includes('salary') && (
                <TableCell className="hidden md:table-cell">
                    <span className="font-medium">
                        {job.ctcOffered || 'N/A'}
                    </span>
                </TableCell>
            )}

            {visibleColumns.includes('appliedDate') && (
                <TableCell className="hidden md:table-cell">
                    <span>{formatDate(job.appliedDate)}</span>
                </TableCell>
            )}

            {visibleColumns.includes('status') && (
                <TableCell className="hidden md:table-cell">
                    <Badge
                        variant={
                            STATUS_COLOR_MAP[job.status] === 'success'
                                ? 'default'
                                : 'outline'
                        }
                        className={`${getStatusBadgeClass(job.status)} inline-flex w-fit items-center capitalize`}
                    >
                        {getStatusIcon(job.status)}
                        {capitalize(job.status)}
                    </Badge>
                </TableCell>
            )}

            {visibleColumns.includes('actions') && (
                <TableCell className="hidden text-right md:table-cell">
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                            >
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={handleEditClick}>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onDelete(job.id)}
                                className="text-destructive"
                            >
                                Delete
                            </DropdownMenuItem>
                            <div className="border-t">
                                <JobApplicationDetailsPopup
                                    selectedApplication={job}
                                />
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            )}
        </TableRow>
    );
}
