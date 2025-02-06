import { JobApplication } from "@/DummyData/Data";
import {
  ColumnDef,
  FilterFn,
  flexRender,
  Table,
} from "@tanstack/react-table";

import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

declare module "@tanstack/react-table" {
  interface FilterFns {
    titleFilter: FilterFn<JobApplication>;
    priorityFilter: FilterFn<JobApplication>;
    statusFilter: FilterFn<JobApplication>;
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  table: Table<JobApplication>;
}

const TaskTable = <TData extends JobApplication, TValue>({
  columns,
  table,
}: DataTableProps<TData, TValue>) => {
  return (
    <div>
      <ShadcnTable>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </ShadcnTable>
    </div>
  );
};

export  {TaskTable};