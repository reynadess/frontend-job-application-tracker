import {
  Activity,
  Building2Icon,
  SearchIcon,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useAuthStore } from "@/hooks/zustand/store/useAuthStore";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://github.com/shadcn.png",
  },
};

export function AppSidebar() {
  const { user } = useAuthStore();

  // Menu items.
  const items = [
    {
      title: "Job Tracker",
      url: "/job-tracker",
      icon: Activity,
    },
    {
      title: "Companies",
      url: "/companies",
      icon: Building2Icon,
    },
    {
      title: "Job Search",
      url: "/jobsearch",
      icon: SearchIcon,
    },
    {
      title: "Profile",
      url: `/user/${user?.username}`,
      icon: User,
    },
  ];

  const navigate = useNavigate();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div
            onClick={() => navigate("/dashboard/job-tracker")}
            className="flex items-center gap-2 p-3 rounded-sm shadow-md dark:shadow-slate-800 mt-1 cursor-pointer text-2xl font-bold "
          >
            <Avatar className="border">
              <AvatarImage src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg" />
            </Avatar>
            <h3>
              Career<span className="text-green">-Pilot</span>
            </h3>
          </div>
          <SidebarGroupLabel className="font-medium text-gray-600 text-md mt-14">
            Platform
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="">
              {items.map((item) => (
                <SidebarMenuItem className="mt-5 p-1" key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      className="text-inherit hover:bg-[#9ce8b8] hover:dark:bg-slate-500"
                      to={item.url}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="py-5">
        <NavUser User={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
