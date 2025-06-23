import * as React from 'react';
import {
    Bot,
    BriefcaseBusiness,
    LifeBuoy,
    Search,
    Send,
    Settings2,
    SquareTerminal,
} from 'lucide-react';

import { NavMain } from '@/shared/components/nav-main';
import { NavSecondary } from '@/shared/components/nav-secondary';
import { NavUser } from '@/shared/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/shared/components/ui/sidebar';
import { Link } from 'react-router-dom';
import { ModeToggle } from './mode-toggle';
import { useAuth } from '@/features/authentication';
import { useApplicant } from '@/features/applicant-portfolio/hooks/useApplicant';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user } = useAuth();
    const { getApplicantInfo, Applicant } = useApplicant();
    const username = user?.username;
    React.useEffect(() => {
        getApplicantInfo(username as string);
    }, [username]);
    const data = {
        user: {
            name: Applicant?.firstName,
            email: Applicant?.email,
            username: Applicant?.username,
            avatar: 'https://github.com/shadcn.png',
        },
        navMain: [
            {
                title: 'Job Tracker',
                url: '/dashboard/job-tracker',
                icon: SquareTerminal,
                isActive: true,
            },
            {
                title: 'Companies',
                url: '/dashboard/companies',
                icon: Bot,
            },
            {
                title: 'Jobs',
                url: '/dashboard/jobsearch',
                icon: BriefcaseBusiness,
            },
            {
                title: 'Settings',
                url: '#',
                icon: Settings2,
                items: [
                    {
                        title: 'View Profile',
                        url: `/dashboard/user/${user?.username}`,
                    },
                    {
                        title: 'Delete Account',
                        url: '#',
                    },
                    {
                        title: 'Billing',
                        url: '#',
                    },
                ],
            },
        ],
        navSecondary: [
            {
                title: 'Support',
                url: '#',
                icon: LifeBuoy,
            },
            {
                title: 'Feedback',
                url: '#',
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
                            <Link to="/dashboard/job-tracker">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    {/* <Command className="size-4" /> */}

                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                                        <Search className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                                <div className="flex flex-1 items-center gap-6 text-left leading-tight">
                                    <span className="ml-1 truncate text-xl font-semibold">
                                        JobScanner
                                    </span>
                                    <ModeToggle />
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
