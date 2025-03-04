import { BookMarked, Building2, Check, LoaderPinwheel, LucideIcon } from "lucide-react";
import React from "react";
import { Card } from "./ui/card";
type SingleCard = {
  title: string;
  value: string;
  icon: LucideIcon;
};
const StatusCard = () => {
  const status: SingleCard[] = [
    {
      title: "Bookmark",
      value: "120",
      icon: BookMarked,
    },
    {
      title: "Applied",
      value: "120",
      icon: Building2,
    },
    {
      title: "Applying",
      value: "120",
      icon: LoaderPinwheel,
    },
    {
      title: "Accepted",
      value: "120",
      icon: Check,
    },
  ];
  return (
    <div className="grid grid-cols-4 max-sm:grid-cols-1 mt-7 gap-6 p-6">
      {status.map((stat, index) => (
        <SingleStatCard key={index} SingleCard={stat} />
      ))}
    </div>
  );
};

const SingleStatCard = ({ SingleCard }: { SingleCard: SingleCard }) => {
  return (
    <Card className="p-4 flex flex-col gap-2 shadow-none">
      <div className="flex items-center justify-between">
        <span>{SingleCard.title}</span>
        <div className="size-7 rounded-md flex items-center justify-center text-sm bg-primary/25 font-bold text-primary">
          <SingleCard.icon />
        </div>
      </div>
      <div className="text-3xl font-bold">{SingleCard.value}</div>
    </Card>
  );
};

export default StatusCard;
