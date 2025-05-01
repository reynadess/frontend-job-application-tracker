import { Link } from "react-router-dom";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mr-3">
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
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <h2 className="text-xl font-bold">JobTrack</h2>
            </div>
            <p className="text-slate-400">
              The ultimate platform for job seekers to discover opportunities
              and track applications in one place.
            </p>
            <div className="flex space-x-4">
              <Link
                to="#"
                className="text-slate-400 hover:text-indigo-400 transition"
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
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
              <Link
                to="#"
                className="text-slate-400 hover:text-indigo-400 transition"
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
                className="text-slate-400 hover:text-indigo-400 transition"
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
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              <Link
                to="#"
                className="text-slate-400 hover:text-indigo-400 transition"
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
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="#"
                  className="text-slate-400 hover:text-white transition"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-slate-400 hover:text-white transition"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-slate-400 hover:text-white transition"
                >
                  Job Board
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-slate-400 hover:text-white transition"
                >
                  Application Tracker
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-slate-400 hover:text-white transition"
                >
                  Integrations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="#"
                  className="text-slate-400 hover:text-white transition"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-slate-400 hover:text-white transition"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-slate-400 hover:text-white transition"
                >
                  Career Tips
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-slate-400 hover:text-white transition"
                >
                  API Documentation
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-slate-400 hover:text-white transition"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="#"
                  className="text-slate-400 hover:text-white transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-slate-400 hover:text-white transition"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-slate-400 hover:text-white transition"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-slate-400 hover:text-white transition"
                >
                  Press Kit
                </Link>
              </li>
            </ul>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="#"
                    className="text-slate-400 hover:text-white transition"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-slate-400 hover:text-white transition"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-slate-800 pt-8 pb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">Stay in the loop</h3>
              <p className="text-slate-400">
                Subscribe to our newsletter for the latest job market insights
                and product updates.
              </p>
            </div>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-slate-800 text-white px-4 py-3 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-r-lg font-medium transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-sm text-slate-400">
              © {currentYear} JobTrack. All rights reserved.
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-slate-800 px-4 py-2 rounded-full flex items-center">
              <span className="bg-green h-2 w-2 rounded-full mr-2"></span>
              <span className="text-sm text-slate-400">
                Status: All systems operational
              </span>
            </div>

            <select className="bg-slate-800 text-slate-400 px-3 py-2 rounded-lg text-sm">
              <option>English (US)</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
        </div>
      </div>

      {/* Startup Badge */}
      <div className="bg-slate-950 py-4 px-4 text-center">
        <p className="text-slate-400 text-sm">
          <span className="bg-indigo-500 text-white text-xs px-2 py-1 rounded font-medium mr-2">
            Beta
          </span>
          A product by{" "}
          <span className="font-semibold text-white">JobTrack Startup</span> -
          Revolutionizing how people find their dream careers
        </p>
      </div>
    </footer>
  );
};

export default Footer;
