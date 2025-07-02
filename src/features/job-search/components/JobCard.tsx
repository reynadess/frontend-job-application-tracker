import { useState } from 'react';
import {
  MapPin,
  Clock,
  DollarSign,
  Building2,
  Bookmark,
  Zap,
  Star,
} from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Progress } from '@/shared/components/ui/progress';
import type { Job } from '../types/job.types';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface JobCardProps {
  job: Job;
  onSave?: (jobId: number) => void;
  isSaved?: boolean;
}

export function JobCard({ job, onSave, isSaved = false }: JobCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(isSaved);

  const handleSave = () => {
    setIsBookmarked(!isBookmarked);
    onSave?.(job.id);
  };

  return (
    <Card className="border-border transition-all duration-200 hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Link
                    to={`/dashboard/job/details/${job.id}`}
                    className="text-xl font-semibold transition-colors hover:text-primary"
                  >
                    {job.role}
                  </Link>
                  {job.isUrgent && (
                    <Badge variant="destructive" className="text-xs">
                      <Zap className="mr-1 h-3 w-3" />
                      Urgent
                    </Badge>
                  )}
                  {job.isSponsored && (
                    <Badge variant="secondary" className="text-xs">
                      Sponsored
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    <span className="font-medium">{job.company}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    <span>{job.companyRating}</span>
                    <span className="text-xs">({job.companyReviews})</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
                className={cn('shrink-0', isBookmarked && 'text-primary')}
              >
                <Bookmark
                  className={cn('h-4 w-4', isBookmarked && 'fill-current')}
                />
              </Button>
            </div>

            {/* Location and Details */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{job.posted}</span>
              </div>
              <Badge variant="outline">{job.type}</Badge>
              {job.remote && <Badge variant="secondary">Remote</Badge>}
              {job.hybrid && <Badge variant="secondary">Hybrid</Badge>}
            </div>

            {/* Salary and Match */}
            <div className="flex items-center gap-4">
              <div className="text-success flex items-center gap-1 font-semibold">
                <DollarSign className="h-4 w-4" />
                <span>
                  {job.ctcOffered.min.toLocaleString()} -{' '}
                  {job.ctcOffered.max.toLocaleString()} {job.ctcOffered.currency}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="bg-success/10 text-success border-success/20"
                >
                  {job.skillMatch}% match
                </Badge>
                <Progress value={job.skillMatch} className="h-2 w-16" />
              </div>
            </div>

            {/* Description */}
            <p className="line-clamp-2 leading-relaxed text-muted-foreground">
              {job.description}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {job.skills.slice(0, 4).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {job.skills.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{job.skills.length - 4} more
                </Badge>
              )}
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap gap-2">
              {job.benefits.slice(0, 3).map((benefit) => (
                <Badge
                  key={benefit}
                  variant="outline"
                  className="text-xs text-muted-foreground"
                >
                  {benefit}
                </Badge>
              ))}
              {job.benefits.length > 3 && (
                <Badge
                  variant="outline"
                  className="text-xs text-muted-foreground"
                >
                  +{job.benefits.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="ml-6 flex flex-col gap-2">
            <Link to={`/dashboard/job/details/${job.id}`}>
              <Button size="sm" className="w-full">
                View Details
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              Quick Apply
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
