import ResumeUploader from "@/components/ResumeUploader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Briefcase,
  Loader2,
  Mail,
  MapPin,
  Pen,
  Phone,
  Verified,
} from "lucide-react";
import React, { useRef, useState } from "react";

const ProfilePage = () => {
  const [selectedProfilePicture, setSelectedProfilePicture] =
    useState<string>("");
  const [profileData, setProfileData] = useState({
    firstName: "om",
    lastName: "",
    occupation: "Software Engineer",
    address: "Pune , India",
    profilePicture: "",
    phoneNumber: "777657547648",
    email: "om@om.com",
    resume: null as File | null, //to upload the resume
  });
  const imageRef = useRef<HTMLInputElement | null>(null);
  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedProfilePicture(result);
        setProfileData((prevData) => ({
          ...prevData,
          profilePicture: result,
        }));
      };

      reader.readAsDataURL(file);
    }
  };
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  // Function to update profileData when resume is uploaded
  const handleResumeUpload = (uploadedFile: File) => {
    setProfileData((prevData) => ({
      ...prevData,
      resume: uploadedFile,
    }));
  };
  const loading = false;
  return (
    <div className="">
      <form className="relative">
        <div className=" flex gap-5 shadow-md p-3 mt-7 rounded-md">
          <div>
            <Avatar className="relative md:w-28 md:h-28 w-20 h-20">
              <AvatarImage src={selectedProfilePicture} />
              <AvatarFallback>John</AvatarFallback>
              <Input
                ref={imageRef}
                accept="image/*"
                onChange={fileChangeHandler}
                className="hidden"
                type="file"
              />
              <div
                onClick={() => imageRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer"
              ></div>
            </Avatar>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <div>
                <Input
                  type="text"
                  name="firstName"
                  className="font-bold text-2xl w-fit shadow-none outline-none border-none focus-visible:ring-transparent"
                  value={profileData.firstName}
                  onChange={changeHandler}
                />
                <Input
                  type="text"
                  name="occupation"
                  className="font-medium text-sm w-fit shadow-none outline-none border-none focus-visible:ring-transparent opacity-[0.7]"
                  value={profileData.occupation}
                  onChange={changeHandler}
                />
              </div>
              <Separator className="w-[700px] mt-3" />
              <div className="flex mt-5">
                <div className="flex flex-col  gap-2">
                  <div className="flex items-center">
                    <MapPin />
                    <Input
                      className="font-medium text-2xl shadow-none w-fit outline-none border-none focus-visible:ring-transparent"
                      name="address"
                      value={profileData.address}
                      onChange={changeHandler}
                      type="text"
                    />
                  </div>
                  <div className="flex  items-center">
                    <Briefcase />
                    <Input
                      className="font-medium shadow-none text-2xl w-fit outline-none border-none focus-visible:ring-transparent"
                      name="occupation"
                      value={profileData.occupation}
                      onChange={changeHandler}
                      type="text"
                    />
                  </div>
                </div>
                <Separator
                  orientation="vertical"
                  className="h-[100px] border-1 border-gray-900"
                />
                <div className="flex flex-col gap-2 ml-7">
                  <div className="flex items-center">
                    <Phone />
                    <Input
                      className="font-medium shadow-none text-2xl w-fit outline-none border-none focus-visible:ring-transparent"
                      name="phoneNumber"
                      value={profileData.phoneNumber}
                      onChange={changeHandler}
                      type="number"
                    />
                  </div>
                  <div className="flex items-center">
                    <Mail />
                    <Input
                      className="font-medium shadow-none text-2xl w-fit outline-none border-none focus-visible:ring-transparent"
                      name="email"
                      value={profileData.email}
                      onChange={changeHandler}
                      type="email"
                    />{" "}
                    <Verified className="text-green" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ✅ Resume Uploader */}
        <div className="mt-5">
          <ResumeUploader onFileUpload={handleResumeUpload} />
        </div>

        {/* ✅ Show Uploaded Resume */}
        {profileData.resume && (
          <div className="mt-4 p-3 border rounded">
            <p className="font-semibold">Resume Uploaded:</p>
            <p className="">{profileData.resume.name}</p>
          </div>
        )}
        <div className="p-3 absolute top-0 right-1">
          {loading ? (
            <Button disabled>
              <Loader2 className="animate-spin" /> Please Wait ...
            </Button>
          ) : (
            <Button type="submit">Update Profile</Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
