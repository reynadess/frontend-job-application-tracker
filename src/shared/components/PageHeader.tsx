import React from 'react';
import { Helmet } from 'react-helmet';

interface PageHeaderProps {
    title: string;
    description?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    description,
}) => {
    return (
        <Helmet>
            <title>{title}</title>
            {description && <meta name="description" content={description} />}
        </Helmet>
    );
};
