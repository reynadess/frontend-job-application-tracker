import * as React from 'react';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared/components/ui/dialog';
import {
  CalendarIcon,
  MapPinIcon,
  LinkIcon,
  DollarSignIcon,
  BadgeCheckIcon,
  CopyIcon,
  ExternalLinkIcon,
} from 'lucide-react';
import { ApplicationsType } from '@/shared/types/applications.types';

interface PopupProps {
  selectedApplication: ApplicationsType | null;
  triggerLabel?: string;
}

function formatDate(iso?: string) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
}

function formatNumber(n?: number) {
  if (typeof n !== 'number') return '';
  try {
    return new Intl.NumberFormat(undefined).format(n);
  } catch {
    return String(n);
  }
}

function ensureHttp(url?: string) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url}`;
}

export function JobApplicationDetailsDialog({
  selectedApplication,
  triggerLabel = 'View Details',
}: PopupProps) {
  const [copied, setCopied] = React.useState(false);

  const safeLink = ensureHttp(selectedApplication?.jobLink);
  const canOpen = Boolean(safeLink && safeLink.length > 8);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(selectedApplication?.jobLink || '');
      setCopied(true);
      const t = setTimeout(() => setCopied(false), 1500);
      return () => clearTimeout(t);
    } catch {
      // ignore
    }
  }

  const initials =
    (selectedApplication?.company?.trim?.() || '')
      .split(/\s+/)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase())
      .join('') || '??';

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="ghost" className="w-full">
          {triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[680px]">
        <div className="mb-4 flex flex-col items-center gap-3">
          <div
            aria-hidden
            className="flex h-20 w-20 items-center justify-center rounded-full bg-muted text-lg font-semibold"
          >
            {initials}
          </div>
          <h2 className="text-center text-xl font-bold">
            {selectedApplication?.company}
          </h2>
        </div>

        <DialogHeader className="space-y-1">
          <DialogTitle className="text-balance text-2xl">
            {selectedApplication?.role}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Job details for {selectedApplication?.role} at{' '}
            {selectedApplication?.company}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <div className="flex items-center gap-1 rounded-full bg-muted px-3 py-1">
              <DollarSignIcon className="h-4 w-4" />
              <span className="tabular-nums">
                {formatNumber(selectedApplication?.ctcOffered)}
              </span>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-muted px-3 py-1">
              <MapPinIcon className="h-4 w-4" />
              <span>
                {selectedApplication?.city}
                {selectedApplication?.state
                  ? `, ${selectedApplication.state}`
                  : ''}
                {selectedApplication?.country
                  ? `, ${selectedApplication.country}`
                  : ''}
              </span>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-muted px-3 py-1">
              <BadgeCheckIcon className="h-4 w-4" />
              <span>{selectedApplication?.status}</span>
            </div>
          </div>

          {/* Applied date */}
          <div className="flex flex-col gap-2 rounded-md border p-3">
            <div className="flex items-center gap-2 text-sm">
              <CalendarIcon className="h-4 w-4" />
              <span>
                Applied:{' '}
                {formatDate(
                  selectedApplication?.appliedDate
                    ? selectedApplication.appliedDate.toString()
                    : undefined
                )}
              </span>
            </div>
          </div>

          {/* Link */}
          <div className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4" />
            {canOpen ? (
              <a
                href={safeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary underline underline-offset-2"
              >
                {selectedApplication?.jobLink}
              </a>
            ) : (
              <span className="text-sm text-muted-foreground">
                No job link provided
              </span>
            )}
          </div>

          {/* Description */}
          <section aria-labelledby="job-description">
            <h3 id="job-description" className="mb-2 font-semibold">
              Job Description
            </h3>
            <p className="text-pretty text-sm leading-relaxed">
              {selectedApplication?.description || 'No description provided.'}
            </p>
          </section>

          {/* IDs */}
          <div className="gap-2 rounded-md border p-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Application ID</span>
              <span className="font-medium">{selectedApplication?.id}</span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCopy}
              className="inline-flex items-center gap-2 bg-transparent"
            >
              <CopyIcon className="h-4 w-4" />
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>
            <Button
              type="button"
              variant="default"
              className="inline-flex items-center gap-2"
              asChild
              disabled={!canOpen}
            >
              <a
                href={canOpen ? safeLink : undefined}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLinkIcon className="h-4 w-4" />
                Open Link
              </a>
            </Button>
          </div>

          {/* Optional status actions (client-only placeholders) */}
          <div className="flex gap-2">
            <Button type="button" variant="outline">
              Mark as Rejected
            </Button>
            <Button type="button" variant="outline">
              Mark as Interview
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default JobApplicationDetailsDialog;
