import { File } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function UserResume() {
    const [resumeLink, setResumeLink] = useState<string | null>(null);

    useEffect(() => {
        const storedResume = localStorage.getItem('resume');
        if (storedResume) setResumeLink(JSON.parse(storedResume));
    }, []);

    if (!resumeLink) {
        return null;
    }

    return (
        <div>
            <Link
                to={resumeLink.toString()}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
            >
                <File className="h-40 w-40" />
                <h1 className="text-center text-2xl text-white">Click here</h1>
            </Link>
        </div>
    );
}
