import { useState } from 'react';
import {
  MapPin,
  Clock,
  DollarSign,
  Building2,
  Star,
  Bookmark,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Separator } from '@/shared/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs';
import { Progress } from '@/shared/components/ui/progress';
import { getJobDetails } from '@/lib/job-data';
import { cn } from '@/lib/utils';
import { Link, useParams } from 'react-router-dom';

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.id ? parseInt(params.id, 10) : NaN;
  console.log(jobId)
  const job = getJobDetails(jobId);
  const [isSaved, setIsSaved] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  if (!job) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card>
          <CardContent className="p-12 text-center">
            <h2 className="mb-4 text-2xl font-bold">Job Not Found</h2>
            <p className="mb-4 text-muted-foreground">
              The job you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/">
              <Button>Back to Job Search</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleApply = () => {
    setHasApplied(true);
  };

  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Job Header */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-bold">{job.title}</h1>
                        {job.isUrgent && (
                          <Badge variant="destructive">Urgent</Badge>
                        )}
                        {job.isSponsored && (
                          <Badge variant="secondary">Sponsored</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Building2 className="h-5 w-5" />
                          <span className="font-medium">{job.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 fill-current text-yellow-500" />
                          <span>{job.companyRating}</span>
                          <span className="text-sm">
                            ({job.companyReviews} reviews)
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-5 w-5" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-5 w-5" />
                          <span>{job.posted}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-success flex items-center gap-1 text-lg font-semibold">
                      <DollarSign className="h-5 w-5" />
                      <span>
                        ${job.salary.min.toLocaleString()} - $
                        {job.salary.max.toLocaleString()} {job.salary.currency}
                      </span>
                    </div>
                    <Badge variant="secondary">{job.type}</Badge>
                    {job.remote && <Badge variant="outline">Remote</Badge>}
                    {job.hybrid && <Badge variant="outline">Hybrid</Badge>}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-success/10 text-success border-success/20"
                      >
                        {job.skillMatch}% skill match
                      </Badge>
                      <Progress value={job.skillMatch} className="w-24" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsSaved(!isSaved)}
                        className={cn(isSaved && 'text-primary')}
                      >
                        <Bookmark
                          className={cn(
                            'mr-2 h-4 w-4',
                            isSaved && 'fill-current'
                          )}
                        />
                        {isSaved ? 'Saved' : 'Save Job'}
                      </Button>
                      <Button onClick={handleApply} disabled={hasApplied}>
                        {hasApplied ? 'Applied ✓' : 'Apply Now'}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Details Tabs */}
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="requirements">Requirements</TabsTrigger>
                    <TabsTrigger value="company">Company</TabsTrigger>
                    <TabsTrigger value="process">Process</TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="mt-6 space-y-6">
                    <div>
                      <h3 className="mb-3 text-lg font-semibold">
                        Job Description
                      </h3>
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        {job.description.split('\n').map((paragraph, index) => (
                          <p key={index} className="mb-4 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="mb-3 text-lg font-semibold">
                        Required Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="requirements" className="mt-6 space-y-6">
                    <div>
                      <h3 className="mb-3 text-lg font-semibold">
                        Requirements
                      </h3>
                      <ul className="space-y-2">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-success mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="mb-3 text-lg font-semibold">
                        Nice to Have
                      </h3>
                      <ul className="space-y-2">
                        {job.niceToHave.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-info mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="company" className="mt-6 space-y-6">
                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-lg font-semibold">
                          About {job.company}
                        </h3>
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={job.companyInfo.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Visit Website
                          </a>
                        </Button>
                      </div>
                      <p className="leading-relaxed">{job.companyInfo.about}</p>

                      <div className="mt-4 grid grid-cols-2 gap-4 rounded-lg bg-muted p-4">
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Industry
                          </span>
                          <p className="font-medium">
                            {job.companyInfo.industry}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Founded
                          </span>
                          <p className="font-medium">
                            {job.companyInfo.founded}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Headquarters
                          </span>
                          <p className="font-medium">
                            {job.companyInfo.headquarters}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Company Size
                          </span>
                          <p className="font-medium">
                            {job.companySize} employees
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="mb-3 text-lg font-semibold">
                        Company Culture
                      </h3>
                      <p className="leading-relaxed">
                        {job.companyInfo.culture}
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="mb-3 text-lg font-semibold">
                        Perks & Benefits
                      </h3>
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        {job.companyInfo.perks.map((perk, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <span className="text-success mt-1">✓</span>
                            <span>{perk}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="process" className="mt-6">
                    <div>
                      <h3 className="mb-3 text-lg font-semibold">
                        Application Process
                      </h3>
                      <div className="space-y-4">
                        {job.applicationProcess.map((step, index) => (
                          <div key={index} className="flex gap-3">
                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                              {index + 1}
                            </div>
                            <div className="flex-1 pt-1">
                              <p>{step}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            {/* Quick Apply */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Apply</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleApply}
                  disabled={hasApplied}
                >
                  {hasApplied ? 'Applied ✓' : 'Apply Now'}
                </Button>
                <Button variant="outline" className="w-full">
                  Apply with LinkedIn
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Application typically takes 5-10 minutes
                </p>
              </CardContent>
            </Card>

            {/* Job Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Job Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Job Type:</span>
                  <span className="font-medium">{job.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Experience:</span>
                  <span className="font-medium">{job.experienceLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Department:</span>
                  <span className="font-medium">{job.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Company Size:</span>
                  <span className="font-medium">{job.companySize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Remote:</span>
                  <span className="font-medium">
                    {job.remote ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Posted:</span>
                  <span className="font-medium">{job.posted}</span>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {job.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2">
                      <span className="text-success">✓</span>
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            {job.similarJobs && job.similarJobs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Similar Jobs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {job.similarJobs.map((similarJob) => (
                    <div
                      key={similarJob.id}
                      className="border-l-2 border-primary pl-3"
                    >
                      <Link
                        to={`/dashboard/job/details/${similarJob.id}`}
                        className="block rounded p-2 transition-colors hover:bg-muted/50"
                      >
                        <h4 className="text-sm font-medium">
                          {similarJob.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {similarJob.company} • ${similarJob.salary.min}k-$
                          {similarJob.salary.max}k
                        </p>
                      </Link>
                    </div>
                  ))}
                  <Link to="/dashboard/jobsearch">
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      View All Similar Jobs
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
