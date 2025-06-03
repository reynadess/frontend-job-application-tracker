import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import {
  CalendarIcon,
  MapPinIcon,
  BriefcaseIcon,
  LinkIcon,
  DollarSignIcon,
  ClockIcon,
} from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { ApplicationsType } from "@/types/applications.types";

interface PopupProps {
  selectedApplication: ApplicationsType | null;
}

const JobApplicationDetailsPopup = ({ selectedApplication }: PopupProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" type="button" variant={"ghost"}>
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[70vw] max-h-[90vh]  overflow-y-auto">
        <div className="flex flex-col items-center mb-4">
          <div className="w-24 h-24 rounded-full bg-gray-100  flex items-center justify-center md-2 overflow-hidden">
            <img
              src={
                "https://imgs.search.brave.com/IQL0yRWAyMo_AqV4saaoXE1ZwqC_lJR1S7aF6WaqWfI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4x/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvam9iLWFuZC1y/ZXN1bWUtNS82NC9D/b21wYW55LW9mZmlj/ZS1hZGRyZXNzLWxv/Y2F0aW9uLWdwcy0x/MjgucG5n"
              }
              alt="company-logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-xl font-bold">{selectedApplication?.company}</h2>
        </div>

        <DialogHeader>
          <DialogTitle className="text-2xl">
            {selectedApplication?.role}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="grid gap-6 py-4">
            {/* Job highlights */}
            <div className="flex flex-wrap gap-3 text-sm">
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-blue-950  px-3 py-1 rounded-full">
                <DollarSignIcon className="h-4 w-4" />
                <span>{selectedApplication?.ctcOffered}</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-blue-950 px-3 py-1 rounded-full">
                <MapPinIcon className="h-4 w-4" />
                <span>
                  {selectedApplication?.city}, {selectedApplication?.country},{" "}
                  {selectedApplication?.state}
                </span>
              </div>
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-blue-950 px-3 py-1 rounded-full">
                <BriefcaseIcon className="h-4 w-4" />
                <span>Full time</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-blue-950 px-3 py-1 rounded-full">
                <ClockIcon className="h-4 w-4" />
                <span>Remote</span>
              </div>
            </div>

            {/* Application status */}
            <div className="flex items-center justify-between border-t border-b py-3">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 " />
                <span className="text-sm ">Applied on May 15 , 2025</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                {selectedApplication?.status}
              </span>
            </div>

            {/* job link  */}

            <div className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4 " />
              <Link
                to={"www.google.com"}
                className="text-blue-600 hover:underline text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedApplication?.company}
              </Link>
            </div>

            {/* Job Description */}
            <div>
              <h3 className="font-semibold mb-2">Job Description</h3>
              <div className="text-sm  space-y-2">
                <p>{selectedApplication?.description}</p>
                <p>
                  Responsibilities include developing new features, maintaining
                  existing code, and collaborating with cross-functional teams.
                </p>
              </div>
            </div>

            {/* Qualification */}
            <div>
              <h3 className="font-semibold mb-2">Qualification</h3>
              <ul className="list-disc list-inside text-sm  space-y-1">
                <li>5+ years of experience in software development</li>
                <li>Strong proficiency in JavaScript, React, and Node.js</li>
                <li>Experience with cloud platforms (AWS, GCP, or Azure)</li>
                <li>Bachelor's degree in Computer Science or related field</li>
                <li>Excellent problem-solving and communication skills</li>
              </ul>
            </div>

            {/* Benefits */}

            <div>
              <h3 className="font-semibold mb-2">Benefits</h3>
              <ul className="list-disc list-inside text-sm  space-y-1">
                <li>Competitive salary and equity package</li>
                <li>Health, dental, and vision insurance</li>
                <li>401(k) matching</li>
                <li>Flexible work hours and remote work options</li>
                <li>Professional development budget</li>
                <li>Paid time off and parental leave</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">About Acme Corporation</h3>
              <p className="text-sm ">
                Acme Corporation is a leading technology company specializing in
                innovative software solutions. Founded in 2010, we've grown to
                over 500 employees worldwide with offices in San Francisco, New
                York, and London. Our mission is to create technology that makes
                people's lives better.
              </p>
            </div>
          </div>
        </DialogDescription>

        <DialogFooter className="flex gap-2">
          <Button variant="outline">Mark as Rejected</Button>
          <Button variant="outline">Mark as Interview</Button>
          <DialogClose>
            <Button type="button">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationDetailsPopup;
