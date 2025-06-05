import type React from "react"

import { TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, Building2, Briefcase, BadgeDollarSign, CalendarIcon } from "lucide-react"
import type { JobTableSort } from "../types"

interface TableHeaderProps {
  visibleColumns: string[]
  sort: JobTableSort
  onSort: (column: string) => void
  selectedCount: number
  totalCount: number
  onToggleAll: () => void
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
    column: string
    children: React.ReactNode
    icon?: React.ReactNode
  }) => (
    <button className="flex items-center gap-1" onClick={() => onSort(column)}>
      {icon}
      {children}
      {sort.column === column && <ChevronDown className={`h-4 w-4 ${sort.direction === "desc" ? "rotate-180" : ""}`} />}
    </button>
  )

  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[40px] px-2 whitespace-nowrap sticky left-0 bg-background z-20">
          <Checkbox
            checked={selectedCount === totalCount && totalCount > 0}
            onCheckedChange={onToggleAll}
            aria-label="Select all"
          />
        </TableHead>

        {visibleColumns.includes("company") && (
          <TableHead className="w-[140px] px-2 whitespace-nowrap sticky left-[40px] bg-background z-20">
            <SortButton column="company" icon={<Building2 className="h-4 w-4 mr-1 hidden lg:block" />}>
              Company
            </SortButton>
          </TableHead>
        )}

        {visibleColumns.includes("role") && (
          <TableHead className="w-[180px] px-2 whitespace-nowrap">
            <SortButton column="role" icon={<Briefcase className="h-4 w-4 mr-1 hidden sm:block" />}>
              Position
            </SortButton>
          </TableHead>
        )}

        {visibleColumns.includes("salary") && (
          <TableHead className="hidden md:table-cell w-[100px] whitespace-nowrap">
            <SortButton column="salary" icon={<BadgeDollarSign className="h-4 w-4 mr-1" />}>
              Salary
            </SortButton>
          </TableHead>
        )}

        {visibleColumns.includes("appliedDate") && (
          <TableHead className="hidden md:table-cell w-[120px] whitespace-nowrap">
            <SortButton column="appliedDate" icon={<CalendarIcon className="h-4 w-4 mr-1" />}>
              Applied Date
            </SortButton>
          </TableHead>
        )}

        {visibleColumns.includes("status") && (
          <TableHead className="hidden md:table-cell w-[120px] whitespace-nowrap">
            <SortButton column="status">Status</SortButton>
          </TableHead>
        )}

        {visibleColumns.includes("actions") && (
          <TableHead className="hidden md:table-cell w-[80px] text-right whitespace-nowrap">Actions</TableHead>
        )}
      </TableRow>
    </TableHeader>
  )
}
