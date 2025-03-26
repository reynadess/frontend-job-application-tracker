import { Verified } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import React from "react";
import { JobProps } from "@/DummyData/Jobs";

const JobDetailsCard = () => {
  return (
    <div className="pl-2 flex items-center justify-between">
      <div className="p-3 space-y-5 w-full">
        <div className="flex gap-5 items-center justify-between border-b p-2">
          <h1 className="text-2xl font-medium">{"Backend Enginner"}</h1>
          <div className="flex items-center gap-2 mt-4 ">
            <Badge
              variant="secondary"
              className="bg-[#E9D6FC] text-[#6A1B9A] font-bold"
            >
              {"3"} Positions
            </Badge>
            <Badge
              variant="secondary"
              className="bg-[#DFFCE9] text-[#1B5E20] font-bold"
            >
              {"Full Time"}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-[#FDECD2] text-[#D77A2A] font-bold"
            >
              {"10"} LPA
            </Badge>
          </div>
        </div>
        <div className="pl-2 space-y-5">
          <div className="space-y-2">
            <p className="text-xl font-medium">About the role</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis consequuntur iusto dolor, voluptatem rerum illum
              ratione ipsam cupiditate explicabo adipisci, eius libero atque
              architecto vel veritatis. Temporibus repellendus asperiores sint.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-xl font-medium">Responsibilities</p>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero
              iure, commodi quia qui corrupti ad expedita exercitationem
              suscipit quidem rerum aliquid pariatur iusto possimus porro
              recusandae veritatis esse dolore velit.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-xl font-medium">Reuired skills</p>
            <div className="flex items-center gap-2">
              <Badge variant={"outline"}>React</Badge>
              <Badge variant={"outline"}>React</Badge>
              <Badge variant={"outline"}>React</Badge>
              <Badge variant={"outline"}>React</Badge>
              <Badge variant={"outline"}>React</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 p-3 px-9 border rounded-md shadow-md">
        <div className="flex items-center">
          <h1 className="text-xl font-bold flex items-center gap-2">
            Amazon <Verified className="h-4 text-green" />
          </h1>
          <Avatar className="ml-3">
            <AvatarImage src="https://media.wired.com/photos/5a99ba72927dc94e67685b9b/1:1/w_700,h_700,c_limit/amazon-a-logo.jpg" />
          </Avatar>
        </div>
        <div>
          <h3 className="font-medium">Founded</h3>
          <p>January 6 , 2017</p>
        </div>
        <div>
          <h3 className="font-medium">Location</h3>
          <h3>Usa</h3>
        </div>
        <Button className="w-full rounded-full">Apply now</Button>
      </div>
    </div>
  );
};

export default JobDetailsCard;
