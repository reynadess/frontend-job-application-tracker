import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ScrollArea } from "./ui/scroll-area";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
interface IFilterData {
  filterType: string;
  array: string[];
}

const filterData: IFilterData[] = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Chennai"],
  },
  {
    filterType: "Industry",
    array: [
      "Full Stack",
      "Frontend",
      "Backend",
      "DevOps",
      "Data Science",
      "Mobile Development",
      "Cybersecurity",
      "Cloud Computing",
      "Artificial Intelligence",
      "Game Development",
    ],
  },
  {
    filterType: "Job Type",
    array: [
      "Full Time",
      "Part Time",
      "Internship",
      "Project Work",
      "Volunteering",
    ],
  },
  {
    filterType: "Experience",
    array: ["Entry Level", "Intermediate", "Expert"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42k-1lakh", "1lakh to 5lakh"],
  },
];

const FilterPage = () => {
  return (
    <div className="hidden sm:block md:w-full p-3 rounded-md">
     <div className="flex items-center">
     <h1 className="font-bold text-lg">Filter Jobs</h1>
     <Button variant={"link"}>Clear All</Button>        
     </div>
      <hr />
      <RadioGroup>
        <ScrollArea className="h-[80vh]">
          {filterData.map((data, index) => (
            <div key={index}>
              <h1 className="font-bold text-lg">{data.filterType}</h1>
              {data.array.map((item, idx) => {
                const itemsId = `id${index}-${idx}`;
                return (
                  <div className="flex items-center space-x-2 my-2">
                    <RadioGroupItem value={item} id={itemsId} />
                    <Label htmlFor={itemsId}>{item}</Label>
                  </div>
                );
              })}
            </div>
          ))}
        </ScrollArea>
      </RadioGroup>
    </div>
  );
};

export default FilterPage;
