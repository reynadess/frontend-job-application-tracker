
import { getPageTitle } from '@/shared/utils/pageTitle';
import { useEffect } from 'react';

export const usePageTitle = (pageName: string) => {
    useEffect(() => {
        const previousTitle = document.title;
        document.title = getPageTitle(pageName);

        //reset title on component unmount
        return () => {
            document.title = previousTitle;
        };
    }, [pageName]);
};
