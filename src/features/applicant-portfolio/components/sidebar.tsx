import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from '@/shared/components/ui/sheet';
import { Separator } from '@/shared/components/ui/separator';

// import { userProfileNavbar } from '@/lib/constants/appConstants';
import { MenuIcon, XIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="right-5 z-[4] flex flex-col items-start justify-start max-md:absolute md:h-full md:rounded-xl md:border md:px-2 md:pt-6">
            <DesktopSidebar />
            <MobileSidebar />
        </div>
    );
};

const DesktopSidebar = () => {
    return (
        <div className="hidden h-full w-56 p-2 md:flex">
            <div className="flex w-full flex-col">
                <SidebarNavs />
            </div>
        </div>
    );
};

const MobileSidebar = () => {
    return (
        <div className="z-[3] flex h-full flex-col md:hidden">
            <Sheet>
                <SheetTrigger>
                    <MenuIcon />
                </SheetTrigger>
                <SheetContent className="md:hidden">
                    <SheetClose className="absolute right-3 top-3">
                        <XIcon />
                    </SheetClose>
                    <div className="mt-12 flex w-full flex-col md:hidden">
                        <SidebarNavs />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

const SidebarNavs = () => {
    return (
        <div className="flex w-full flex-col text-slate-700 dark:text-slate-300">
            <div className="mb-2 flex flex-col items-start justify-start gap-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    User Settings
                </span>
                <Separator />
            </div>
            {/* {userProfileNavbar.map((nav) => (
        <NavItem {...nav} key={nav.id} />
      ))} */}
        </div>
    );
};

const NavItem = () => {
    return {
        /*TODO: link to path  */
    };
};

export default Sidebar;
