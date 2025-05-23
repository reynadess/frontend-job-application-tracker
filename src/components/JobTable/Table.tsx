import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";

import {
  MoreVertical,
  Search,
  ChevronDown,
  CalendarIcon,
  Building2,
  Briefcase,
  BadgeDollarSign,
  Clock,
  Calendar,
  Check,
  X,
  Plus,
} from "lucide-react";
import { JobApplicationSheet } from "../JobApplicationSheet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SHEETS } from "@/lib/constants/Profile.constant";
import SheetWrapper from "../profile/sheets/SheetWrapper";
import {
  ApplicationStatus,
  ApplicationsType,
} from "@/types/applications.types";
import { useApplicationsStore } from "@/hooks/zustand/store/useApplicationsStore";
import JobApplicationDetailsPopup from "./JobApplicationDetailsPopup";

// Helper function to capitalize first letter
export function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export const columns = [
  { name: "COMPANY", uid: "company", sortable: true },
  { name: "ROLE", uid: "role", sortable: true },
  { name: "SALARY", uid: "salary", sortable: true },
  { name: "APPLIED DATE", uid: "appliedDate", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const statusOptions = [
  { name: "Applied", uid: "Applied" },
  { name: "Interview", uid: "Interview" },
  { name: "Offered", uid: "Offered" },
  { name: "Rejected", uid: "Rejected" },
  { name: "Accepted", uid: "Accepted" },
  { name: "Apply", uid: "Apply" },
  { name: "InProgress", uid: "InProgress" },
];

const statusColorMap: Record<string, string> = {
  Applied: "blue",
  Interview: "yellow",
  Offered: "purple",
  Rejected: "destructive",
  Accepted: "success",
  Apply: "orange",
  InProgress: "gray",
};

export default function JobTrackingTable() {
  const [filterValue, setFilterValue] = useState("");
  const [selectedJobs, setSelectedJobs] = useState<number[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "company",
    "role",
    "salary",
    "appliedDate",
    "status",
    "actions",
  ]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("appliedDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    "desc"
  );

  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [selectedApplication, setSelectedApplication] =
    useState<ApplicationsType | null>(null);

  const Applications = useApplicationsStore((state) => state.Applications);
  const getAllUserApplications = useApplicationsStore(
    (state) => state.getAllUserApplications
  );


  // fetch once when component loads
  useEffect(() => {
    getAllUserApplications();
  }, [getAllUserApplications]);

  const handleClose = () => {
    setIsSheetOpen(false);
    setSelectedApplication(null);
  };

  const handleOpen = () => {
    setIsSheetOpen(true);
  };

  //FIXME :Application types
  const handleEditClick = (
    event: React.MouseEvent<HTMLDivElement>,
    application: ApplicationsType
  ) => {
    event.preventDefault();
    setSelectedApplication({ ...application });
    setIsSheetOpen(true);
  };

  const title = selectedApplication
    ? SHEETS.jobApplication.title.replace("Add", "Edit")
    : SHEETS.jobApplication.title;

  // Filter jobs based on search and status
  const filteredJobs = useMemo(() => {
    let filtered = [...Applications];

    if (filterValue) {
      filtered = filtered.filter(
        (job) =>
          job?.company?.toLowerCase().includes(filterValue.toLowerCase()) ||
          job?.role?.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (statusFilter.length > 0) {
      filtered = filtered.filter((job) => statusFilter.includes(job.status));
    }

    // Sort jobs
    filtered.sort((a, b) => {
      const aValue = a[sortColumn as keyof ApplicationsType];
      const bValue = b[sortColumn as keyof ApplicationsType];

      // Special handling for dates
      if (sortColumn === "appliedDate") {
        const dateA = new Date(a.appliedDate as Date | string);
        const dateB = new Date(b.appliedDate as Date | string);
        return sortDirection === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }

      // Special handling for salary
      if (sortColumn === "salary") {
        const numA = a.salary ? parseInt(a.salary.replace(/[$,]/g, "")) : 0;
        const numB = b.salary ? parseInt(b.salary.replace(/[$,]/g, "")) : 0;
        return sortDirection === "asc" ? numA - numB : numB - numA;
      }

      // Default string comparison
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });

    return filtered;
  }, [filterValue, statusFilter, sortColumn, sortDirection, Applications]);

  // Paginate jobs
  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredJobs.slice(start, end);
  }, [filteredJobs, currentPage, rowsPerPage]);

  // Total pages
  const totalPages = Math.ceil(filteredJobs.length / rowsPerPage);

  // Toggle job selection
  const toggleJobSelection = (jobId: number) => {
    setSelectedJobs((prev) => {
      if (prev.includes(jobId)) {
        return prev.filter((id) => id !== jobId);
      } else {
        return [...prev, jobId];
      }
    });
  };

  // Toggle all jobs selection
  const toggleAllJobs = () => {
    if (selectedJobs.length === paginatedJobs.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(paginatedJobs.map((job) => job.id));
    }
  };

  // Handle sort
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Handle status filter
  const handleStatusFilter = (status: string) => {
    setStatusFilter((prev) => {
      if (prev.includes(status)) {
        return prev.filter((s) => s !== status);
      } else {
        return [...prev, status];
      }
    });
  };

  // Format date
  const formatDate = (date: string | Date | undefined): string => {
    if (!date) return "";

    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toISOString().split("T")[0]; // Retur
  };

  return (
    <div className="space-y-4 m-auto w-[96%]">
      {/* Table controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            className="pl-8"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div>
            {/* TODO: reset button updation */}
            <Button variant="outline" size="sm" className="h-8">
              Reset <X />
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                Status <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {statusOptions.map((status) => (
                <DropdownMenuItem
                  key={status.uid}
                  className="flex items-center gap-2"
                  onSelect={(e) => {
                    e.preventDefault();
                    handleStatusFilter(status.uid);
                  }}
                >
                  <Checkbox
                    checked={statusFilter.includes(status.uid)}
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
              {columns.map((column) => (
                <DropdownMenuItem
                  key={column.uid}
                  className="flex items-center gap-2"
                  onSelect={(e) => {
                    e.preventDefault();
                    setVisibleColumns((prev) => {
                      if (prev.includes(column.uid)) {
                        return prev.filter((c) => c !== column.uid);
                      } else {
                        return [...prev, column.uid];
                      }
                    });
                  }}
                >
                  <Checkbox
                    checked={visibleColumns.includes(column.uid)}
                    className="h-4 w-4"
                  />
                  <span>{column.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={handleOpen}>
            <Plus height={16} width={16} /> Add Job
          </Button>
          {/* <JobApplicationSheet  /> */}
        </div>
      </div>

      {/* Update table container */}
      <div className="relative border rounded-md overflow-hidden">
        <div className="w-full overflow-x-auto scrollbar-thin">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px] px-2 whitespace-nowrap sticky left-0 bg-background z-20">
                  <Checkbox
                    checked={
                      selectedJobs.length === paginatedJobs.length &&
                      paginatedJobs.length > 0
                    }
                    onCheckedChange={toggleAllJobs}
                    aria-label="Select all"
                  />
                </TableHead>
                {visibleColumns.includes("company") && (
                  <TableHead className="w-[140px] px-2 whitespace-nowrap sticky left-[40px] bg-background z-20">
                    <button
                      className="flex items-center gap-1"
                      onClick={() => handleSort("company")}
                    >
                      <Building2 className="h-4 w-4 mr-1 hidden lg:block" />
                      Company
                      {sortColumn === "company" && (
                        <ChevronDown
                          className={`h-4 w-4 ${
                            sortDirection === "desc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>
                  </TableHead>
                )}
                {visibleColumns.includes("role") && (
                  <TableHead className="w-[180px] px-2 whitespace-nowrap">
                    <button
                      className="flex items-center gap-1"
                      onClick={() => handleSort("role")}
                    >
                      <Briefcase className="h-4 w-4 mr-1 hidden sm:block" />
                      Position
                      {sortColumn === "role" && (
                        <ChevronDown
                          className={`h-4 w-4 ${
                            sortDirection === "desc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>
                  </TableHead>
                )}
                {visibleColumns.includes("salary") && (
                  <TableHead className="hidden md:table-cell w-[100px] whitespace-nowrap">
                    <button
                      className="flex items-center gap-1"
                      onClick={() => handleSort("salary")}
                    >
                      <BadgeDollarSign className="h-4 w-4 mr-1" />
                      Salary
                      {sortColumn === "salary" && (
                        <ChevronDown
                          className={`h-4 w-4 ${
                            sortDirection === "desc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>
                  </TableHead>
                )}
                {visibleColumns.includes("appliedDate") && (
                  <TableHead className="hidden md:table-cell w-[120px] whitespace-nowrap">
                    <button
                      className="flex items-center gap-1"
                      onClick={() => handleSort("appliedDate")}
                    >
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      Applied Date
                      {sortColumn === "appliedDate" && (
                        <ChevronDown
                          className={`h-4 w-4 ${
                            sortDirection === "desc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>
                  </TableHead>
                )}
                {visibleColumns.includes("status") && (
                  <TableHead className="hidden md:table-cell w-[120px] whitespace-nowrap">
                    <button
                      className="flex items-center gap-1"
                      onClick={() => handleSort("status")}
                    >
                      Status
                      {sortColumn === "status" && (
                        <ChevronDown
                          className={`h-4 w-4 ${
                            sortDirection === "desc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>
                  </TableHead>
                )}
                {visibleColumns.includes("actions") && (
                  <TableHead className="hidden md:table-cell w-[80px] text-right whitespace-nowrap">
                    Actions
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedJobs.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={visibleColumns.length + 1}
                    className="h-24 text-center"
                  >
                    job applications not found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="px-2 sticky left-0 bg-background z-20">
                      <Checkbox
                        checked={selectedJobs.includes(job.id)}
                        onCheckedChange={() => toggleJobSelection(job.id)}
                        aria-label={`Select job at ${job.company}`}
                      />
                    </TableCell>
                    {visibleColumns.includes("company") && (
                      <TableCell className="px-2 sticky left-[40px] bg-background z-20">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="hidden lg:flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                            <Avatar>
                              <AvatarImage
                                src={
                                  "https://imgs.search.brave.com/KXIQDgZs6Cs98mfa4pLMtF1oVpNgpmgIpSjvVUIyImM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZWdp/c3RyeS5ucG1taXJy/b3IuY29tL0Bsb2Jl/aHViL2ljb25zLXN0/YXRpYy1wbmcvbGF0/ZXN0L2ZpbGVzL2Rh/cmsvZ29vZ2xlLWNv/bG9yLnBuZw"
                                }
                                alt="@shadcn"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="font-medium truncate max-w-[100px]">
                            {job.company || "N/A"}
                          </div>
                        </div>
                      </TableCell>
                    )}
                    {visibleColumns.includes("role") && (
                      <TableCell className="px-2 sm:px-4">
                        <div className="flex flex-col">
                          <span className="font-medium truncate">
                            {job.role || "N/A"}
                          </span>
                          <span className="text-xs text-muted-foreground hidden sm:block">
                            {job.city}
                          </span>
                        </div>
                      </TableCell>
                    )}
                    {visibleColumns.includes("salary") && (
                      <TableCell className="hidden md:table-cell">
                        <span className="font-medium">
                          {job.salary || "N/A"}
                        </span>
                      </TableCell>
                    )}
                    {visibleColumns.includes("appliedDate") && (
                      <TableCell className="hidden md:table-cell">
                        <span>{formatDate(job.appliedDate)}</span>
                      </TableCell>
                    )}
                    {visibleColumns.includes("status") && (
                      <TableCell className="hidden md:table-cell">
                        <Badge
                          variant={
                            statusColorMap[job.status] === "success"
                              ? "default"
                              : "outline"
                          }
                          className={` ${
                            statusColorMap[job.status] === "success"
                              ? ""
                              : statusColorMap[job.status] === "destructive"
                              ? "bg-red-100 text-red-800"
                              : statusColorMap[job.status] === "yellow"
                              ? "bg-yellow-100 text-yellow-800"
                              : statusColorMap[job.status] === "blue"
                              ? "bg-blue-100 text-blue-800"
                              : statusColorMap[job.status] === "purple"
                              ? "bg-purple-100 text-purple-800"
                              : ""
                          } capitalize w-fit inline-flex items-center`}
                        >
                          {job.status === ApplicationStatus.Applied && (
                            <Clock className="mr-1 h-3 w-3" />
                          )}
                          {job.status === ApplicationStatus.InProgress && (
                            <Calendar className="mr-1 h-3 w-3" />
                          )}
                          {job.status === ApplicationStatus.Offered && (
                            <BadgeDollarSign className="mr-1 h-3 w-3" />
                          )}
                          {job.status === ApplicationStatus.Rejected && (
                            <X className="mr-1 h-3 w-3" />
                          )}
                          {job.status === ApplicationStatus.Accepted && (
                            <Check className="mr-1 h-3 w-3" />
                          )}
                          {job.status === ApplicationStatus.Interview && (
                            <Check className="mr-1 h-3 w-3" />
                          )}
                          {capitalize(job.status)}
                        </Badge>
                      </TableCell>
                    )}
                    {visibleColumns.includes("actions") && (
                      <TableCell className="hidden md:table-cell text-right">
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
                            <DropdownMenuItem
                              onClick={(e) => {
                                handleEditClick(e, job);
                              }}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
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
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div>
            {selectedJobs.length} of {filteredJobs.length} selected
          </div>
          <div className="flex items-center gap-1">
            <span>Rows per page:</span>
            <Select
              value={rowsPerPage.toString()}
              onValueChange={(value) => {
                setRowsPerPage(parseInt(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-8 w-16">
                <SelectValue placeholder="5" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNumber = i + 1;
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    isActive={currentPage === pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            {totalPages > 5 && (
              <>
                <PaginationItem>
                  <span className="pointer-events-none opacity-50">...</span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink onClick={() => setCurrentPage(totalPages)}>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      {isSheetOpen && (
        <SheetWrapper
          isOpen={isSheetOpen}
          handleClose={handleClose}
          title={title}
          description={SHEETS.jobApplication.description}
        >
          <JobApplicationSheet
            handleClose={handleClose}
            selectedApplication={selectedApplication}
            key={selectedApplication?.id}
          />
        </SheetWrapper>
      )}
    </div>
  );
}
