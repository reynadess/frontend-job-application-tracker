import { Activity, Building2Icon, Search, SearchIcon, User } from "lucide-react";

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
import { Link } from "react-router-dom";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://github.com/shadcn.png",
  },
};
// Menu items.
const items = [
  {
    title: "Job Tracker",
    url: "/dashboard/job-tracker",
    icon: Activity,
  },
  {
    title: "Companies",
    url: "/dashboard/companies",
    icon: Building2Icon,
  },
  {
    title: "Job Search",
    url: "/dashboard/jobsearch",
    icon: SearchIcon,
  },
  {
    title: "Profile",
    url: "/dashboard/user/profile",
    icon: User,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="py-9 text-2xl border">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="border mt-2">
              {items.map((item) => (
                <SidebarMenuItem className="mt-5 p-1" key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
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
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
