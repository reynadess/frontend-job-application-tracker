import React from "react";
import PaginationSelection from "./PaginationSelection";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, ArrowBigRight, ArrowLeft, ArrowRight } from "lucide-react";

const PaginationArea = () => {
  return (
    <div
      className={`relative w-full overflow-hidden flex justify-between items-center mt-2`}
    >
      <span className="text-slate-600 text-sm">0 of 36 row(s) selected.</span>
      <div className="flex items-center gap-14">
        <PaginationSelection />
        <div className="flex gap-6 items-center">
          <span className="text-sm font-medium">
            {/* page {pagination.pageindex + 1}  of {table.getPageCount}*/}
            Page 1 of 4
          </span>
          <div className="flex items-center justify-end space-x-2">
            {/* first page button */}
            <Button
              variant={"outline"}
              className="size-9 w-12"
              size={"sm"}
              //onClick = {() =>table.setPageIndex(0)}
              //disabled={!table.getCanPreviousPage()}
            >
              <ArrowBigLeft />
            </Button>
            {/* previous page button */}
            <Button
              variant={"outline"}
              className="size-9 w-12"
              size={"sm"}
              //onClick = {() =>table.previousPage()}
              //disabled={!table.getCanPreviousPage()}
            >
              <ArrowLeft />
            </Button>
            {/* next page button */}
            <Button className="size-9 w-12" variant={"outline"} size={"sm"}
            //onClick = {() =>table.nextPage()}
            //disabled={!table.getCanNextPage()}
            >
                <ArrowRight />
            </Button>
            {/* last page button */}
            <Button className="size-9 w-12" variant={"outline"} size={"sm"}
            //onClick = {() =>table.setPageIndex(table.getPageCount()-1)}
            //disabled={!table.getCanNextPage()}
            >
                <ArrowBigRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginationArea;
