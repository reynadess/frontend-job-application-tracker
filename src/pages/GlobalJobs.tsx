import FilterPage from "@/components/FilterPage";
import Job from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { dummyJobs } from "@/DummyData/Jobs";
import { Separator } from "@radix-ui/react-separator";
import { Map, Search, StarsIcon } from "lucide-react";
import React from "react";

const GlobalJobs: React.FC = () => {
  return (
    <>
      <div className=" border w-full mt-7 flex-1 p-3 rounded-md">
        <div className=" p-1 pb-7">
          <h1 className="flex text-2xl font-medium gap-1">
            Find Your Dream Job Here <StarsIcon className="text-yellow-500" />
          </h1>
          <div className="py-3 flex mt-5 items-center justify-between border rounded-full px-6">
            <div className="relative flex  items-center gap-1 w-full">
              <Search className="absolute inset-x-2  text-gray-500" />
              <Input
                className="border-none outline-none  px-10 shadow-none focus-visible:ring-transparent "
                placeholder="Job Titile or keyword"
              />
            </div>
            <Separator orientation="vertical" className="h-[50px] border" />
            <div className="ml-3 relative flex w-full items-center">
              <Map className="absolute inset-x-2  text-gray-500" />
              <Input
                className="border-none  outline-none px-10 shadow-none focus-visible:ring-transparent"
                placeholder="Add country or city"
              />
            </div>
            <Button
              type="submit"
              className="border-none outline-none  px-5 rounded-full"
            >
              Search{" "}
            </Button>
          </div>
        </div>
        <div className=" p-3 rounded-md">
          <h3 className="font-medium">Recommended jobs</h3>
          <div className="flex items-center ">
            <div className="max-w-[320px]">
              <FilterPage />
            </div>
            <div className="flex-1 h-[80vh] overflow-y-auto pb-5 p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dummyJobs.map((job, index) => (
                  <div key={job._id}>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalJobs;
