import TableJob from "@/components/JobTable/Table";
import StatusCard from "@/components/StatusCard";



import { useEffect } from "react";

const JobTracker = () => {
 
  return (
    <>
      <header>
        <StatusCard />
        <TableJob />
      </header>
    </>
  );
};

export default JobTracker;
