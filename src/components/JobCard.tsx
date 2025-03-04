import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import {  JobProps } from "@/DummyData/Jobs";

const Job: React.FC<JobProps> = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime: string): number => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - createdAt.getTime();
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-5 rounded-md shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl dark:hover:shadow-slate-50 dark:hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} Days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size={"icon"}>
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} alt="Company Logo" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.name}</h1>
          <p className="text-sm text-gray-600">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge
          variant="secondary"
          className="bg-[#E9D6FC] text-[#6A1B9A] font-bold"
        >
          {job?.position} Positions
        </Badge>
        <Badge
          variant="secondary"
          className="bg-[#DFFCE9] text-[#1B5E20] font-bold"
        >
          {job?.jobType}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-[#FDECD2] text-[#D77A2A] font-bold"
        >
          {job?.salary} LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/dashboard/job/details/${job?._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button>Save for later</Button>
      </div>
    </div>
  );
};

export default Job;
