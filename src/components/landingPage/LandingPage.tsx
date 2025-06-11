import { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('recommended');
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    {
      value: '5000+',
      label: 'Active Jobs',
      icon: <Briefcase className="text-indigo-500" />,
    },
    {
      value: '500+',
      label: 'Companies',
      icon: <Building className="text-indigo-500" />,
    },
    {
      value: '10,000+',
      label: 'Users',
      icon: <Users className="text-indigo-500" />,
    },
    {
      value: '85%',
      label: 'Success Rate',
      icon: <Check className="text-indigo-500" />,
    },
  ];

  const features = [
    {
      title: 'Track Job Applications',
      description:
        'Keep all your job applications in one place and never lose track of opportunities.',
      icon: <LineChart className="mb-4 h-12 w-12 text-indigo-500" />,
    },
    {
      title: 'Job Board Aggregator',
      description:
        'Find jobs from multiple sources with our intelligent web scraping technology.',
      icon: <Search className="mb-4 h-12 w-12 text-indigo-500" />,
    },
    {
      title: 'Application Timeline',
      description:
        'View your application history and track your progress over time.',
      icon: <Clock className="mb-4 h-12 w-12 text-indigo-500" />,
    },
  ];

  const jobListings = [
    {
      title: 'Senior Frontend Developer',
      company: 'Google',
      location: 'San Francisco, CA',
      salary: '$120K - $150K',
      tags: ['React', 'TypeScript', 'Remote'],
      logo: 'https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png',
      date: '2 days ago',
      featured: true,
    },
    {
      title: 'UX/UI Designer',
      company: 'Google',
      location: 'New York, NY',
      salary: '$90K - $120K',
      tags: ['Figma', 'UI Design', 'Hybrid'],
      logo: 'https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png',
      date: 'Just now',
      featured: true,
    },
    {
      title: 'Product Manager',
      company: 'Google',
      location: 'Austin, TX',
      salary: '$130K - $160K',
      tags: ['SaaS', 'B2B', 'Full-time'],
      logo: 'https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png',
      date: '3 days ago',
      featured: false,
    },
  ];

  return (
    <div className="-mt-14 min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pb-24 pt-12">
        <div className="absolute right-0 top-0 h-full w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 opacity-70"></div>
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-indigo-300 opacity-20 blur-3xl filter"></div>
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-purple-300 opacity-20 blur-3xl filter"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <div className="lg:w-5/12">
              <div className="mb-6 inline-block">
                <span className="rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700">
                  Job Search Reimagined
                </span>
              </div>
              <h1 className="mb-6 text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
                Discover & Track Your{' '}
                <span className="relative text-indigo-600">
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
              <p className="mb-8 text-lg text-slate-600">
                The ultimate job board and application tracker all in one
                beautiful dashboard. Discover opportunities, apply with ease,
                and never lose track of your applications again.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
                >
                  Start Job Hunting <MoveRight className="ml-2 h-5 w-5" />
                </button>
                <button className="rounded-lg border border-slate-200 bg-white px-6 py-3 font-medium text-slate-800 shadow-md transition hover:bg-slate-50">
                  For Employers
                </button>
              </div>

              <div className="mt-12 flex items-center space-x-6">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-white bg-indigo-400"
                    ></div>
                  ))}
                </div>
                <div>
                  <p className="font-medium text-slate-700">
                    Join 10,000+ job seekers
                  </p>
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                    <span className="ml-1 text-sm text-slate-600">4.9/5</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative lg:w-7/12">
              <div
                className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl"
                style={{
                  transform: `translateY(${scrollY * 0.02}px)`,
                  transition: 'transform 0.1s ease-out',
                }}
              >
                {/* Job Board Header */}
                <div className="border-b border-slate-100 bg-white p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-800">
                      Job Explorer
                    </h3>
                    <div className="relative">
                      <input
                        onClick={() => navigate('/login')}
                        type="text"
                        placeholder="Search jobs..."
                        className="w-64 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 pl-10 text-sm"
                      />
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    </div>
                  </div>

                  <div className="flex border-b border-slate-100">
                    <button
                      onClick={() => setActiveTab('recommended')}
                      className={`px-4 py-2 text-sm font-medium ${
                        activeTab === 'recommended'
                          ? 'border-b-2 border-indigo-600 text-indigo-600'
                          : 'text-slate-600 hover:text-slate-800'
                      }`}
                    >
                      Recommended
                    </button>
                    <button
                      onClick={() => setActiveTab('recent')}
                      className={`px-4 py-2 text-sm font-medium ${
                        activeTab === 'recent'
                          ? 'border-b-2 border-indigo-600 text-indigo-600'
                          : 'text-slate-600 hover:text-slate-800'
                      }`}
                    >
                      Recent
                    </button>
                    <button
                      onClick={() => setActiveTab('saved')}
                      className={`px-4 py-2 text-sm font-medium ${
                        activeTab === 'saved'
                          ? 'border-b-2 border-indigo-600 text-indigo-600'
                          : 'text-slate-600 hover:text-slate-800'
                      }`}
                    >
                      Saved Jobs
                    </button>
                  </div>
                </div>

                {/* Job Listings */}
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-slate-500">
                      Showing <span className="font-medium">235</span> jobs
                    </p>
                  </div>

                  <div className="space-y-4">
                    {jobListings.map((job, index) => (
                      <div
                        key={index}
                        className={`rounded-xl border bg-white p-4 ${
                          job.featured
                            ? 'border-indigo-100 shadow-md'
                            : 'border-slate-200'
                        } transition duration-300 hover:shadow-lg`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <img
                              src={job.logo}
                              alt={job.company}
                              className="h-12 w-12 rounded-lg"
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <div>
                                <h4 className="mb-1 font-medium text-slate-900">
                                  {job.title}
                                </h4>
                                <p className="text-sm text-slate-600">
                                  {job.company}
                                </p>
                              </div>
                              <button className="text-slate-400 hover:text-indigo-600">
                                <BookmarkPlus className="h-5 w-5" />
                              </button>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">
                              {job.tags.map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
                              <div className="flex items-center">
                                <MapPin className="mr-1 h-4 w-4" />
                                {job.location}
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="mr-1 h-4 w-4" />
                                {job.salary}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="mr-1 h-4 w-4" />
                                {job.date}
                              </div>
                            </div>
                          </div>
                        </div>
                        {job.featured && (
                          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                            <span className="rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600">
                              Featured Position
                            </span>
                            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                              View Details
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => navigate('/login')}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      View all jobs
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating notification */}
              <div
                className="absolute -bottom-6 -left-6 w-64 rounded-lg border border-slate-100 bg-white p-4 shadow-lg"
                style={{
                  transform: `translateY(${scrollY * -0.05}px)`,
                  transition: 'transform 0.1s ease-out',
                }}
              >
                <div className="mb-2 flex items-center gap-3">
                  <div className="bg-green rounded-full p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium text-slate-800">
                    Application Submitted!
                  </span>
                </div>
                <p className="text-sm text-slate-600">
                  Your application for{' '}
                  <span className="font-medium">Product Designer</span> has been
                  sent.
                </p>
              </div>

              {/* Floating insights card */}
              <div
                className="absolute -right-6 -top-6 w-64 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-4 text-white shadow-lg"
                style={{
                  transform: `translateY(${scrollY * -0.03}px)`,
                  transition: 'transform 0.1s ease-out',
                }}
              >
                <h4 className="mb-2 font-medium">Your Job Insights</h4>
                <div className="space-y-2">
                  <div className="rounded bg-white bg-opacity-20 p-2">
                    <p className="text-sm">Applications this week</p>
                    <p className="text-lg font-bold">12</p>
                  </div>
                  <div className="rounded bg-white bg-opacity-20 p-2">
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
      <section className="border-y border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-3 flex justify-center">{stat.icon}</div>
                <h3 className="mb-1 text-3xl font-bold text-slate-900 md:text-4xl">
                  {stat.value}
                </h3>
                <p className="text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Our platform combines job discovery with application tracking to
              streamline your job search process.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:shadow-md"
              >
                {feature.icon}
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-50 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Three simple steps to transform your job search experience
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Add Job URLs',
                description:
                  'Paste job listing URLs or use our browser extension to automatically track jobs.',
              },
              {
                step: '2',
                title: 'Organize Applications',
                description:
                  'Categorize jobs by status, company, role, and set reminders for follow-ups.',
              },
              {
                step: '3',
                title: 'Track Progress',
                description:
                  'Monitor your application journey and get insights on your job search performance.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Ready to Supercharge Your Job Search?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-indigo-100">
            Join thousands of job seekers who have streamlined their job search
            process with our platform.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={() => navigate('/signup')}
              className="rounded-lg bg-white px-8 py-4 font-medium text-indigo-600 shadow-xl transition hover:bg-indigo-50"
            >
              Get Started For Free
            </button>
            <button className="rounded-lg border border-white bg-transparent px-8 py-4 font-medium text-white transition hover:bg-indigo-700">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              What Our Users Say
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Hear from job seekers who have found success using our platform
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                quote:
                  'This tool helped me organize my job search and land my dream role at a tech startup.',
                name: 'Alex Johnson',
                title: 'Software Engineer',
              },
              {
                quote:
                  'The ability to track application status across different companies was a game-changer for me.',
                name: 'Sarah Williams',
                title: 'Marketing Manager',
              },
              {
                quote:
                  "I discovered jobs I wouldn't have found otherwise, thanks to the aggregation feature.",
                name: 'Michael Chen',
                title: 'Data Analyst',
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-200 bg-slate-50 p-6"
              >
                <p className="mb-6 text-slate-700">"{testimonial.quote}"</p>
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
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Start Tracking Your Dream Job Journey Today
          </h2>
          <p className="mb-8 text-xl text-indigo-100">
            Join thousands of job seekers who have transformed their job search
            experience.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="rounded-lg bg-white px-8 py-4 text-lg font-medium text-indigo-600 shadow-xl transition hover:bg-indigo-50"
          >
            Create Your Free Account
          </button>
          <p className="mt-4 text-indigo-200">No credit card required</p>
        </div>
      </section>
    </div>
  );
}
