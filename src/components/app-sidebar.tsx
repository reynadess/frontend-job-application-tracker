import * as React from "react";
import {
  BookOpen,
  Bot,
  LifeBuoy,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { useAuthStore } from "@/hooks/zustand/store/useAuthStore";
import { useApplicantStore } from "@/hooks/zustand/store/useApplicantStore";


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {user}  = useAuthStore();
  const {getApplicantInfo , Applicant} = useApplicantStore()
  const username = user?.username;
  React.useEffect(() => {
    getApplicantInfo(username as string)
  } , [username])
  const data = {
    user: {
      name: Applicant?.firstName,
      email:Applicant?.email ,
      username:Applicant?.username,
      avatar: "https://github.com/shadcn.png",
    },
    navMain: [
      {
        title: "Job Tracker",
        url: "/job-tracker",
        icon: SquareTerminal,
        isActive: true,
        // items: [
        //   {
        //     title: "History",
        //     url: "#",
        //   },
        //   {
        //     title: "Starred",
        //     url: "#",
        //   },
        //   {
        //     title: "Settings",
        //     url: "#",
        //   },
        // ],
      },
      {
        title: "Companies",
        url: "#",
        icon: Bot,
        // items: [
        //   {
        //     title: "Genesis",
        //     url: "#",
        //   },
        //   {
        //     title: "Explorer",
        //     url: "#",
        //   },
        //   {
        //     title: "Quantum",
        //     url: "#",
        //   },
        // ],
      },
      {
        title: "Job Search",
        url: "/jobsearch",
        icon: BookOpen,
        items: [
          {
            title: "Recent Jobs",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "View Profile",
            url: `/user/${user?.username}`,
          },
          {
            title: "Delete Account",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "#",
        icon: LifeBuoy,
      },
      {
        title: "Feedback",
        url: "#",
        icon: Send,
      },
    ],
  };
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/job-tracker">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  {/* <Command className="size-4" /> */}
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>AQ</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex items-center gap-6 flex-1 text-left  leading-tight">
                  <span className="ml-1 truncate font-semibold text-xl ">Apply-<span className="text-green">IQ</span></span>
                  <ModeToggle/>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser User={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
