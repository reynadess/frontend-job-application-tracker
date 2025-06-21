import { Link } from 'react-router-dom';
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-white">
            {/* Main Footer */}
            <div className="mx-auto max-w-7xl px-4 pb-8 pt-16">
                <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center">
                            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-white"
                                >
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                    <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                                    <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                                    <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                    <line
                                        x1="12"
                                        y1="22.08"
                                        x2="12"
                                        y2="12"
                                    ></line>
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold">JobTrack</h2>
                        </div>
                        <p className="text-slate-400">
                            The ultimate platform for job seekers to discover
                            opportunities and track applications in one place.
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                to="#"
                                className="text-slate-400 transition hover:text-indigo-400"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                    <rect
                                        x="2"
                                        y="9"
                                        width="4"
                                        height="12"
                                    ></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </Link>
                            <Link
                                to="#"
                                className="text-slate-400 transition hover:text-indigo-400"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                </svg>
                            </Link>
                            <Link
                                to="#"
                                className="text-slate-400 transition hover:text-indigo-400"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect
                                        x="2"
                                        y="2"
                                        width="20"
                                        height="20"
                                        rx="5"
                                        ry="5"
                                    ></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line
                                        x1="17.5"
                                        y1="6.5"
                                        x2="17.51"
                                        y2="6.5"
                                    ></line>
                                </svg>
                            </Link>
                            <Link
                                to="#"
                                className="text-slate-400 transition hover:text-indigo-400"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Product</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    to="#"
                                    className="text-slate-400 transition hover:text-white"
                                >
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="text-slate-400 transition hover:text-white"
                                >
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="text-slate-400 transition hover:text-white"
                                >
                                    Job Board
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="text-slate-400 transition hover:text-white"
                                >
                                    Application Tracker
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="text-slate-400 transition hover:text-white"
                                >
                                    Integrations
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold">
                            Resources
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    to="#"
                                    className="text-slate-400 transition hover:text-white"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="text-slate-400 transition hover:text-white"
                                >
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="text-slate-400 transition hover:text-white"
                                >
                                    Career Tips
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="text-slate-400 transition hover:text-white"
                                >
                                    API Documentation
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="text-slate-400 transition hover:text-white"
                                >
                                    Community
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Company</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    to="#"
                                    className="text-slate-400 transition hover:text-white"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="text-slate-400 transition hover:text-white"
                                >
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="text-slate-400 transition hover:text-white"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="text-slate-400 transition hover:text-white"
                                >
                                    Press Kit
                                </Link>
                            </li>
                        </ul>

                        <div className="mt-8">
                            <h3 className="mb-4 text-lg font-semibold">
                                Legal
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        to="#"
                                        className="text-slate-400 transition hover:text-white"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="#"
                                        className="text-slate-400 transition hover:text-white"
                                    >
                                        Terms of Service
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="border-t border-slate-800 pb-12 pt-8">
                    <div className="grid items-center gap-8 md:grid-cols-2">
                        <div>
                            <h3 className="mb-2 text-xl font-semibold">
                                Stay in the loop
                            </h3>
                            <p className="text-slate-400">
                                Subscribe to our newsletter for the latest job
                                market insights and product updates.
                            </p>
                        </div>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full rounded-l-lg bg-slate-800 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button className="rounded-r-lg bg-indigo-600 px-6 py-3 font-medium transition hover:bg-indigo-700">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col items-center justify-between border-t border-slate-800 pt-8 md:flex-row">
                    <div className="mb-4 flex items-center space-x-2 md:mb-0">
                        <span className="text-sm text-slate-400">
                            © {currentYear} JobTrack. All rights reserved.
                        </span>
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="flex items-center rounded-full bg-slate-800 px-4 py-2">
                            <span className="bg-green mr-2 h-2 w-2 rounded-full"></span>
                            <span className="text-sm text-slate-400">
                                Status: All systems operational
                            </span>
                        </div>

                        <select className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-400">
                            <option>English (US)</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Startup Badge */}
            <div className="bg-slate-950 px-4 py-4 text-center">
                <p className="text-sm text-slate-400">
                    <span className="mr-2 rounded bg-indigo-500 px-2 py-1 text-xs font-medium text-white">
                        Beta
                    </span>
                    A product by{' '}
                    <span className="font-semibold text-white">
                        JobTrack Startup
                    </span>{' '}
                    - Revolutionizing how people find their dream careers
                </p>
            </div>
        </footer>
    );
};

export default Footer;
