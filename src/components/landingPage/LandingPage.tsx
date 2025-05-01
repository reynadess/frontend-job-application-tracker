import { useState, useEffect } from "react";
import {
  MoveRight,
  Briefcase,
  Search,
  Check,
  Building,
  Users,
  Clock,
  LineChart,
  BookmarkPlus,
  Star,
  MapPin,
  DollarSign,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState("recommended");
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    {
      value: "5000+",
      label: "Active Jobs",
      icon: <Briefcase className="text-indigo-500" />,
    },
    {
      value: "500+",
      label: "Companies",
      icon: <Building className="text-indigo-500" />,
    },
    {
      value: "10,000+",
      label: "Users",
      icon: <Users className="text-indigo-500" />,
    },
    {
      value: "85%",
      label: "Success Rate",
      icon: <Check className="text-indigo-500" />,
    },
  ];

  const features = [
    {
      title: "Track Job Applications",
      description:
        "Keep all your job applications in one place and never lose track of opportunities.",
      icon: <LineChart className="w-12 h-12 mb-4 text-indigo-500" />,
    },
    {
      title: "Job Board Aggregator",
      description:
        "Find jobs from multiple sources with our intelligent web scraping technology.",
      icon: <Search className="w-12 h-12 mb-4 text-indigo-500" />,
    },
    {
      title: "Application Timeline",
      description:
        "View your application history and track your progress over time.",
      icon: <Clock className="w-12 h-12 mb-4 text-indigo-500" />,
    },
  ];

  const jobListings = [
    {
      title: "Senior Frontend Developer",
      company: "Google",
      location: "San Francisco, CA",
      salary: "$120K - $150K",
      tags: ["React", "TypeScript", "Remote"],
      logo: "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png",
      date: "2 days ago",
      featured: true,
    },
    {
      title: "UX/UI Designer",
      company: "Google",
      location: "New York, NY",
      salary: "$90K - $120K",
      tags: ["Figma", "UI Design", "Hybrid"],
      logo: "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png",
      date: "Just now",
      featured: true,
    },
    {
      title: "Product Manager",
      company: "Google",
      location: "Austin, TX",
      salary: "$130K - $160K",
      tags: ["SaaS", "B2B", "Full-time"],
      logo: "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png",
      date: "3 days ago",
      featured: false,
    },
  ];

  return (
    <div className="-mt-14 min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="pt-12 pb-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 opacity-70"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-300 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-300 rounded-full filter blur-3xl opacity-20"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-5/12">
              <div className="mb-6 inline-block">
                <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium">
                  Job Search Reimagined
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Discover & Track Your{" "}
                <span className="text-indigo-600 relative">
                  Dream Career
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="8"
                    viewBox="0 0 200 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5.5C32 1.5 62 1.5 101 5.5C139.5 9.5 174 6.5 199 3.5"
                      stroke="#818cf8"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
              <p className="text-lg text-slate-600 mb-8">
                The ultimate job board and application tracker all in one
                beautiful dashboard. Discover opportunities, apply with ease,
                and never lose track of your applications again.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition flex items-center justify-center shadow-lg shadow-indigo-200"
                >
                  Start Job Hunting <MoveRight className="ml-2 h-5 w-5" />
                </button>
                <button className="px-6 py-3 bg-white border border-slate-200 text-slate-800 rounded-lg font-medium hover:bg-slate-50 transition shadow-md">
                  For Employers
                </button>
              </div>

              <div className="mt-12 flex items-center space-x-6">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-indigo-400 border-2 border-white"
                    ></div>
                  ))}
                </div>
                <div>
                  <p className="text-slate-700 font-medium">
                    Join 10,000+ job seekers
                  </p>
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                    <span className="ml-1 text-slate-600 text-sm">4.9/5</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-7/12 relative">
              <div
                className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
                style={{
                  transform: `translateY(${scrollY * 0.02}px)`,
                  transition: "transform 0.1s ease-out",
                }}
              >
                {/* Job Board Header */}
                <div className="bg-white border-b border-slate-100 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-slate-800 text-lg">
                      Job Explorer
                    </h3>
                    <div className="relative">
                      <input onClick={() => navigate("/login")}
                        type="text"
                        placeholder="Search jobs..."
                        className="px-4 py-2 pl-10 bg-slate-50 border border-slate-200 rounded-lg text-sm w-64"
                      />
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    </div>
                  </div>

                  <div className="flex border-b border-slate-100">
                    <button
                      onClick={() => setActiveTab("recommended")}
                      className={`px-4 py-2 text-sm font-medium ${
                        activeTab === "recommended"
                          ? "text-indigo-600 border-b-2 border-indigo-600"
                          : "text-slate-600 hover:text-slate-800"
                      }`}
                    >
                      Recommended
                    </button>
                    <button
                      onClick={() => setActiveTab("recent")}
                      className={`px-4 py-2 text-sm font-medium ${
                        activeTab === "recent"
                          ? "text-indigo-600 border-b-2 border-indigo-600"
                          : "text-slate-600 hover:text-slate-800"
                      }`}
                    >
                      Recent
                    </button>
                    <button
                      onClick={() => setActiveTab("saved")}
                      className={`px-4 py-2 text-sm font-medium ${
                        activeTab === "saved"
                          ? "text-indigo-600 border-b-2 border-indigo-600"
                          : "text-slate-600 hover:text-slate-800"
                      }`}
                    >
                      Saved Jobs
                    </button>
                  </div>
                </div>

                {/* Job Listings */}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-slate-500">
                      Showing <span className="font-medium">235</span> jobs
                    </p>
                  </div>

                  <div className="space-y-4">
                    {jobListings.map((job, index) => (
                      <div
                        key={index}
                        className={`bg-white p-4 rounded-xl border ${
                          job.featured
                            ? "border-indigo-100 shadow-md"
                            : "border-slate-200"
                        } hover:shadow-lg transition duration-300`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <img
                              src={job.logo}
                              alt={job.company}
                              className="w-12 h-12 rounded-lg"
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <div>
                                <h4 className="font-medium text-slate-900 mb-1">
                                  {job.title}
                                </h4>
                                <p className="text-slate-600 text-sm">
                                  {job.company}
                                </p>
                              </div>
                              <button className="text-slate-400 hover:text-indigo-600">
                                <BookmarkPlus className="w-5 h-5" />
                              </button>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">
                              {job.tags.map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {job.location}
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />
                                {job.salary}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {job.date}
                              </div>
                            </div>
                          </div>
                        </div>
                        {job.featured && (
                          <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center">
                            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                              Featured Position
                            </span>
                            <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">
                              View Details
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <button onClick={() => navigate("/login")} className="text-indigo-600 font-medium text-sm hover:text-indigo-700">
                      View all jobs
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating notification */}
              <div
                className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 border border-slate-100 w-64"
                style={{
                  transform: `translateY(${scrollY * -0.05}px)`,
                  transition: "transform 0.1s ease-out",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-green p-1 rounded-full">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-slate-800">
                    Application Submitted!
                  </span>
                </div>
                <p className="text-slate-600 text-sm">
                  Your application for{" "}
                  <span className="font-medium">Product Designer</span> has been
                  sent.
                </p>
              </div>

              {/* Floating insights card */}
              <div
                className="absolute -top-6 -right-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg p-4 text-white w-64"
                style={{
                  transform: `translateY(${scrollY * -0.03}px)`,
                  transition: "transform 0.1s ease-out",
                }}
              >
                <h4 className="font-medium mb-2">Your Job Insights</h4>
                <div className="space-y-2">
                  <div className="bg-white bg-opacity-20 p-2 rounded">
                    <p className="text-sm">Applications this week</p>
                    <p className="text-lg font-bold">12</p>
                  </div>
                  <div className="bg-white bg-opacity-20 p-2 rounded">
                    <p className="text-sm">Interview success rate</p>
                    <p className="text-lg font-bold">68%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">{stat.icon}</div>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our platform combines job discovery with application tracking to
              streamline your job search process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition duration-300"
              >
                {feature.icon}
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Three simple steps to transform your job search experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Add Job URLs",
                description:
                  "Paste job listing URLs or use our browser extension to automatically track jobs.",
              },
              {
                step: "2",
                title: "Organize Applications",
                description:
                  "Categorize jobs by status, company, role, and set reminders for follow-ups.",
              },
              {
                step: "3",
                title: "Track Progress",
                description:
                  "Monitor your application journey and get insights on your job search performance.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Supercharge Your Job Search?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have streamlined their job search
            process with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition shadow-xl"
            >
              Get Started For Free
            </button>
            <button className="px-8 py-4 bg-transparent border border-white text-white rounded-lg font-medium hover:bg-indigo-700 transition">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Hear from job seekers who have found success using our platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "This tool helped me organize my job search and land my dream role at a tech startup.",
                name: "Alex Johnson",
                title: "Software Engineer",
              },
              {
                quote:
                  "The ability to track application status across different companies was a game-changer for me.",
                name: "Sarah Williams",
                title: "Marketing Manager",
              },
              {
                quote:
                  "I discovered jobs I wouldn't have found otherwise, thanks to the aggregation feature.",
                name: "Michael Chen",
                title: "Data Analyst",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-50 p-6 rounded-xl border border-slate-200"
              >
                <p className="text-slate-700 mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-medium text-slate-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-slate-600">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start Tracking Your Dream Job Journey Today
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of job seekers who have transformed their job search
            experience.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition text-lg shadow-xl"
          >
            Create Your Free Account
          </button>
          <p className="mt-4 text-indigo-200">No credit card required</p>
        </div>
      </section>
    </div>
  );
}
