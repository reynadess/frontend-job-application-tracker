import { Component, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: any) {
        console.error('Route error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-screen items-center justify-center">
                    <div className="text-center">
                        <h2 className="mb-4 text-2xl font-bold text-red-600">
                            Something went wrong
                        </h2>
                        <p className="mb-4 text-gray-600">
                            We apologize for the inconvenience. Please try
                            refreshing the page.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="rounded bg-primary px-4 py-2 text-white hover:bg-primary/90"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
