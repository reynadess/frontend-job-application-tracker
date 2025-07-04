import type * as React from 'react';
import { useEffect } from 'react';
import {
  Search,
  Building2,
  User,
  Bookmark,
  Bell,
  MessageSquare,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  Calendar,
  FileText,
  Target,
  TrendingUp,
  Heart,
  Star,
  ChevronRight,
  Plus,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from '@/shared/components/ui/sidebar';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { Badge } from '@/shared/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import {
  Collapsible,
  CollapsibleContent,
} from '@/shared/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { useApplicant } from '@/features/applicant-portfolio/hooks/useApplicant';
import { useAuth } from '@/features/authentication';
import { ModeToggle } from './mode-toggle';
import { NavUser } from './nav-user';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const location = useLocation();
  const { user } = useAuth();
  const { getApplicantInfo, Applicant } = useApplicant();
  const username = user?.username;
  useEffect(() => {
    getApplicantInfo(username as string);
  }, [username]);
  const data = {
    navMain: [
      {
        title: 'Job Search',
        url: '/dashboard/jobsearch',
        icon: Search,
        isActive: location.pathname.includes('/jobsearch'),
        badge: '12 new',
        items: [
          {
            title: 'All Jobs',
            url: '/dashboard/jobsearch',
            badge: '1,247',
          },
          {
            title: 'Recommended',
            url: '/dashboard/jobsearch/recommended',
            badge: '23',
          },
          {
            title: 'Recently Viewed',
            url: '/dashboard/jobsearch/recent',
          },
          {
            title: 'Job Alerts',
            url: '/dashboard/jobsearch/alerts',
            badge: '5',
          },
        ],
      },
      {
        title: 'Companies',
        url: '/dashboard/companies',
        icon: Building2,
        badge: '50+ hiring',
        items: [
          {
            title: 'All Companies',
            url: '/dashboard/companies',
            badge: '156',
          },
          {
            title: 'Following',
            url: '/dashboard/companies/following',
            badge: '8',
          },
          {
            title: 'Recently Viewed',
            url: '/dashboard/companies/recent',
          },
          {
            title: 'Top Rated',
            url: '/dashboard/companies/top-rated',
          },
        ],
      },
      {
        title: 'Applications',
        url: '/dashboard/job-tracker',
        icon: FileText,
        badge: '3 pending',
        isActive: location.pathname.includes('/job-tracker'),
        items: [
          {
            title: 'All Applications',
            url: '/dashboard/job-tracker',
            badge: '24',
          },
          {
            title: 'In Progress',
            url: '/dashboard/job-tracker/in-progress',
            badge: '8',
          },
          {
            title: 'Interviews',
            url: '/dashboard/job-tracker/interviews',
            badge: '2',
          },
          {
            title: 'Offers',
            url: '/dashboard/job-tracker/offers',
            badge: '1',
          },
          {
            title: 'Rejected',
            url: '/dashboard/job-tracker/rejected',
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: 'Profile',
        url: `/dashboard/user/${username}`,
        icon: User,
        isActive: location.pathname.includes(`/user/${username}`),
        items: [
          {
            title: 'View Profile',
            url: `/dashboard/user/${username}`,
          },
          {
            title: 'Edit Profile',
            url: `/dashboard/user/${username}/edit`,
          },
          {
            title: 'Resume Builder',
            url: `/dashboard/user/${username}/resume`,
          },
          {
            title: 'Portfolio',
            url: `/dashboard/user/${username}/portfolio`,
          },
        ],
      },
      {
        title: 'Saved',
        url: '/dashboard/saved',
        icon: Bookmark,
        badge: '15',
        items: [
          {
            title: 'Saved Jobs',
            url: '/dashboard/saved/jobs',
            badge: '12',
          },
          {
            title: 'Saved Companies',
            url: '/dashboard/saved/companies',
            badge: '3',
          },
          {
            title: 'Saved Searches',
            url: '/dashboard/saved/searches',
          },
        ],
      },
      {
        title: 'Messages',
        url: '/dashboard/messages',
        icon: MessageSquare,
        badge: '2',
        items: [
          {
            title: 'All Messages',
            url: '/dashboard/messages',
            badge: '2',
          },
          {
            title: 'Recruiters',
            url: '/dashboard/messages/recruiters',
            badge: '1',
          },
          {
            title: 'Companies',
            url: '/dashboard/messages/companies',
            badge: '1',
          },
        ],
      },
      {
        title: 'Career Tools',
        url: '/dashboard/tools',
        icon: Target,
        items: [
          {
            title: 'Salary Calculator',
            url: '/dashboard/tools/salary',
          },
          {
            title: 'Interview Prep',
            url: '/dashboard/tools/interview',
          },
          {
            title: 'Skill Assessment',
            url: '/dashboard/tools/skills',
          },
          {
            title: 'Career Path',
            url: '/dashboard/tools/career-path',
          },
        ],
      },
      {
        title: 'Analytics',
        url: '/dashboard/analytics',
        icon: BarChart3,
        items: [
          {
            title: 'Profile Views',
            url: '/dashboard/analytics/profile',
          },
          {
            title: 'Application Stats',
            url: '/dashboard/analytics/applications',
          },
          {
            title: 'Market Insights',
            url: '/dashboard/analytics/market',
          },
        ],
      },
    ],
    quickActions: [
      {
        title: 'Post Job Alert',
        url: '/dashboard/alerts/new',
        icon: Bell,
      },
      {
        title: 'Update Resume',
        url: `/dashboard/user/${username}/resume`,
        icon: FileText,
      },
      {
        title: 'Schedule Interview',
        url: '/dashboard/calendar',
        icon: Calendar,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Search className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">JobScanner</span>
                    <span className="truncate text-xs">
                      Find your dream job
                    </span>
                  </div>
                  <ChevronRight className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side={state === 'collapsed' ? 'right' : 'bottom'}
                align="start"
                sideOffset={4}
              >
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Platform
                </DropdownMenuLabel>
                <DropdownMenuItem>
                  <Search className="mr-2 size-4" />
                  <Link to={'/dashboard/jobsearch'} className="text-inherit">
                    Job Search
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Building2 className="mr-2 size-4" />
                  Company Directory
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <ModeToggle />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link
                        to={item.url}
                        className={cn(
                          location.pathname === item.url && 'bg-sidebar-accent'
                        )}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className="ml-auto text-xs"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                    {item.items?.length ? (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={location.pathname === subItem.url}
                              >
                                <Link to={subItem.url}>
                                  <span>{subItem.title}</span>
                                  {subItem.badge && (
                                    <Badge
                                      variant="outline"
                                      className="ml-auto text-xs"
                                    >
                                      {subItem.badge}
                                    </Badge>
                                  )}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Secondary Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Personal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navSecondary.map((item) => (
                <Collapsible key={item.title} asChild>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link
                        to={item.url}
                        className={cn(
                          location.pathname === item.url && 'bg-sidebar-accent'
                        )}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className="ml-auto text-xs"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                    {item.items?.length ? (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={location.pathname === subItem.url}
                              >
                                <Link to={subItem.url}>
                                  <span>{subItem.title}</span>
                                  {subItem.badge && (
                                    <Badge
                                      variant="outline"
                                      className="ml-auto text-xs"
                                    >
                                      {subItem.badge}
                                    </Badge>
                                  )}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Quick Actions */}
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.quickActions.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild size="sm">
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

        <SidebarSeparator />

        {/* Notifications */}
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Recent Activity</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-2 px-2">
              <div className="rounded-lg border p-3 text-sm">
                <div className="mb-1 flex items-center gap-2">
                  <TrendingUp className="text-success h-3 w-3" />
                  <span className="font-medium">New job match</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Senior Frontend Developer at TechCorp
                </p>
              </div>
              <div className="rounded-lg border p-3 text-sm">
                <div className="mb-1 flex items-center gap-2">
                  <Heart className="h-3 w-3 text-red-500" />
                  <span className="font-medium">Company followed you</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  StartupXYZ is now following your profile
                </p>
              </div>
              <div className="rounded-lg border p-3 text-sm">
                <div className="mb-1 flex items-center gap-2">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span className="font-medium">Profile viewed</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your profile was viewed 12 times today
                </p>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
       <NavUser Applicant={Applicant}/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
