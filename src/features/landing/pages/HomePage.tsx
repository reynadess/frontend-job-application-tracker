import { usePageTitle } from '@/hooks/usePageTitle';
import { NavbarHome } from '@/shared/components/HomePageNavbar';
import { PAGE_TITLES } from '@/shared/utils/pageTitle';

const HomePage = () => {
    usePageTitle(PAGE_TITLES.HOME)
    return (
        <>
            <header>
                <NavbarHome />
            </header>
        </>
    );
};

export default HomePage;
