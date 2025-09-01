import * as React from "react"
import { Button } from "@/shared/components/ui/button"


export function ProfileActions({ email }: { email: string}) {
  const [copied, setCopied] = React.useState(false)

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      const id = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(id)
    } catch {
      // ignore clipboard errors silently
    }
  }

  return (
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:justify-end">
      <Button
        variant="outline"
        onClick={onCopy}
        aria-live="polite"
        aria-label="Copy email to clipboard"
        className="sm:min-w-32 bg-transparent"
      >
        {copied ? "Copied!" : "Copy email"}
      </Button>
      <Button asChild className="sm:min-w-32">
        <a href={`mailto:${email}`} aria-label="Send an email">
          Email
        </a>
      </Button>
    </div>
  )
}