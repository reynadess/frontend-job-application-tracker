import React from "react";
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
} from "lucide-react";
import { format } from "date-fns";
import { JobApplicationSheet } from "../JobApplicationSheet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// Helper function to capitalize first letter
export function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export const columns = [
  { name: "COMPANY", uid: "company", sortable: true },
  { name: "POSITION", uid: "position", sortable: true },
  { name: "SALARY", uid: "salary", sortable: true },
  { name: "APPLIED DATE", uid: "appliedDate", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const statusOptions = [
  { name: "Applied", uid: "applied" },
  { name: "Interview", uid: "interview" },
  { name: "Offer", uid: "offer" },
  { name: "Rejected", uid: "rejected" },
  { name: "Accepted", uid: "accepted" },
];

export const jobs = [
  {
    id: 1,
    company: "Google",
    companyLogo:
      "https://img.icons8.com/color/512/google-logo.png",
    position: "Frontend Developer",
    salary: "$85,000",
    appliedDate: "2025-02-15",
    status: "interview",
    location: "Remote",
    description: "Frontend developer role focusing on React and TypeScript.",
    notes: "Technical interview scheduled for next week.",
  },
  {
    id: 2,
    company: "MicroSoft",
    companyLogo:
      "https://static.vecteezy.com/system/resources/previews/027/127/473/non_2x/microsoft-logo-microsoft-icon-transparent-free-png.png",
    position: "Full Stack Engineer",
    salary: "$120,000",
    appliedDate: "2025-03-01",
    status: "applied",
    location: "New York, NY",
    description: "Full stack role with Node.js and React.",
    notes: "Waiting for initial screening.",
  },
  {
    id: 3,
    company: "Atlassian",
    companyLogo:
      "https://w7.pngwing.com/pngs/660/290/png-transparent-atlassian-logo-thumbnail-tech-companies-thumbnail.png",
    position: "UI/UX Designer",
    salary: "$95,000",
    appliedDate: "2025-02-20",
    status: "offer",
    location: "San Francisco, CA",
    description: "UI/UX designer position with focus on product design.",
    notes: "Offer received, negotiating terms.",
  },
  {
    id: 4,
    company: "Amazon",
    companyLogo:
      "https://w7.pngwing.com/pngs/489/527/png-transparent-amazon-logo-amazon-com-retail-customer-service-walmart-amazon-logo-thumbnail.png",
    position: "Data Analyst",
    salary: "$78,000",
    appliedDate: "2025-03-10",
    status: "applied",
    location: "Boston, MA",
    description: "Data analyst role with SQL and Python requirements.",
    notes: "Application submitted via company website.",
  },
  {
    id: 5,
    company: "Netflix",
    companyLogo:
      "https://image.similarpng.com/file/similarpng/very-thumbnail/2021/01/Netflix-logo-on-transparent-background-PNG.png",
    position: "DevOps Engineer",
    salary: "$115,000",
    appliedDate: "2025-02-25",
    status: "rejected",
    location: "Seattle, WA",
    description: "DevOps position with focus on AWS and Kubernetes.",
    notes: "Application rejected after technical assessment.",
  },
  {
    id: 6,
    company: "Apple",
    companyLogo:
      "https://cdn-icons-png.flaticon.com/512/0/747.png",
    position: "Product Manager",
    salary: "$130,000",
    appliedDate: "2025-03-05",
    status: "interview",
    location: "Austin, TX",
    description: "Product manager role for SaaS products.",
    notes: "Second interview scheduled for next Monday.",
  },
  {
    id: 7,
    company: "Facebook",
    companyLogo:
      "https://img.freepik.com/premium-psd/facebook-social-media-icon-3d_466778-4384.jpg?semt=ais_hybrid&w=740",
    position: "Security Analyst",
    salary: "$95,000",
    appliedDate: "2025-03-08",
    status: "applied",
    location: "Denver, CO",
    description: "Information security role with focus on threat detection.",
    notes: "Waiting for response after application submission.",
  },
  {
    id: 8,
    company: "Meta",
    companyLogo:
      "https://w7.pngwing.com/pngs/36/959/png-transparent-meta-logo-facebook-social-media-chat-message-communication-icon-thumbnail.png",
    position: "React Developer",
    salary: "$90,000",
    appliedDate: "2025-02-18",
    status: "accepted",
    location: "Chicago, IL",
    description: "React developer role for educational platform.",
    notes: "Offer accepted, starting next month.",
  },
];

const statusColorMap: Record<string, string> = {
  applied: "blue",
  interview: "yellow",
  offer: "purple",
  rejected: "destructive",
  accepted: "success",
};

// const statusIconMap: Record<string, React.ReactNode> = {
//   applied: <Clock className="mr-2 h-3 w-3" />,
//   interview: <Calendar className="mr-2 h-3 w-3" />,
//   offer: <BadgeDollarSign className="mr-2 h-3 w-3" />,
//   rejected: <X className="mr-2 h-3 w-3" />,
//   accepted: <Check className="mr-2 h-3 w-3" />,
// };

type Job = (typeof jobs)[0];

export default function JobTrackingTable() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedJobs, setSelectedJobs] = React.useState<number[]>([]);
  const [visibleColumns, setVisibleColumns] = React.useState<string[]>([
    "company",
    "position",
    "salary",
    "appliedDate",
    "status",
    "actions",
  ]);
  const [statusFilter, setStatusFilter] = React.useState<string[]>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortColumn, setSortColumn] = React.useState("appliedDate");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "desc"
  );

  // Filter jobs based on search and status
  const filteredJobs = React.useMemo(() => {
    let filtered = [...jobs];

    if (filterValue) {
      filtered = filtered.filter(
        (job) =>
          job.company.toLowerCase().includes(filterValue.toLowerCase()) ||
          job.position.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (statusFilter.length > 0) {
      filtered = filtered.filter((job) => statusFilter.includes(job.status));
    }

    // Sort jobs
    filtered.sort((a, b) => {
      const aValue = a[sortColumn as keyof Job];
      const bValue = b[sortColumn as keyof Job];

      // Special handling for dates
      if (sortColumn === "appliedDate") {
        const dateA = new Date(a.appliedDate);
        const dateB = new Date(b.appliedDate);
        return sortDirection === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }

      // Special handling for salary
      if (sortColumn === "salary") {
        const numA = parseInt(a.salary.replace(/[$,]/g, ""));
        const numB = parseInt(b.salary.replace(/[$,]/g, ""));
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
  }, [filterValue, statusFilter, sortColumn, sortDirection]);

  // Paginate jobs
  const paginatedJobs = React.useMemo(() => {
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
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy");
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

          <JobApplicationSheet />
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
                    checked={selectedJobs.length === paginatedJobs.length && paginatedJobs.length > 0}
                    onCheckedChange={toggleAllJobs}
                    aria-label="Select all"
                  />
                </TableHead>
                {visibleColumns.includes("company") && (
                  <TableHead className="w-[140px] px-2 whitespace-nowrap sticky left-[40px] bg-background z-20">
                    <button className="flex items-center gap-1" onClick={() => handleSort("company")}>
                      <Building2 className="h-4 w-4 mr-1 hidden lg:block" />
                      Company
                      {sortColumn === "company" && (
                        <ChevronDown className={`h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                      )}
                    </button>
                  </TableHead>
                )}
                {visibleColumns.includes("position") && (
                  <TableHead className="w-[180px] px-2 whitespace-nowrap">
                    <button
                      className="flex items-center gap-1"
                      onClick={() => handleSort("position")}
                    >
                      <Briefcase className="h-4 w-4 mr-1 hidden sm:block" />
                      Position
                      {sortColumn === "position" && (
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
                    No jobs found
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
                                src={job.companyLogo}
                                alt="@shadcn"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="font-medium truncate max-w-[100px]">
                            {job.company}
                          </div>
                        </div>
                      </TableCell>
                    )}
                    {visibleColumns.includes("position") && (
                      <TableCell className="px-2 sm:px-4">
                        <div className="flex flex-col">
                          <span className="font-medium truncate">
                            {job.position}
                          </span>
                          <span className="text-xs text-muted-foreground hidden sm:block">
                            {job.location}
                          </span>
                        </div>
                      </TableCell>
                    )}
                    {visibleColumns.includes("salary") && (
                      <TableCell className="hidden md:table-cell">
                        <span className="font-medium">{job.salary}</span>
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
                          {job.status === "applied" && (
                            <Clock className="mr-1 h-3 w-3" />
                          )}
                          {job.status === "interview" && (
                            <Calendar className="mr-1 h-3 w-3" />
                          )}
                          {job.status === "offer" && (
                            <BadgeDollarSign className="mr-1 h-3 w-3" />
                          )}
                          {job.status === "rejected" && (
                            <X className="mr-1 h-3 w-3" />
                          )}
                          {job.status === "accepted" && (
                            <Check className="mr-1 h-3 w-3" />
                          )}
                          {capitalize(job.status)}
                        </Badge>
                      </TableCell>
                    )}
                    {visibleColumns.includes("actions") && (
                      <TableCell className="hidden md:table-cell text-right">
                        <DropdownMenu>
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
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Delete
                            </DropdownMenuItem>
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
    </div>
  );
}
