import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const PaginationSelection = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Rows per Page</span>
      <Select
      // value={pagination.pageSize.toString()}
      //onValueChange={(value) => setPagination((prevState) => ({ ...prevState, pageSize: Number(value) }))}
      >
        <SelectTrigger className="w-[90px]">
            <SelectValue placeholder="4"/>
        </SelectTrigger>
        <SelectContent>
            {
                [4, 8, 12, 16, 20].map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                        {size}
                    </SelectItem>
                ))
            }
        </SelectContent>
      </Select>
    </div>
  );
};

export default PaginationSelection;
