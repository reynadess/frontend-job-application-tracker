import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { ProfileAvatar } from "./ProfileAvatar"
import { cn } from "@/lib/utils"
import { Badge } from "@/shared/components/ui/badge"
import { ProfileActions } from "./ProfileActions"
import { UserType } from "@/shared/types/user.types"


interface ProfileCardProps {
    profile :UserType
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const fullName = [profile?.firstName, profile?.lastName].filter(Boolean).join(" ").trim() || profile?.username

  return (
    <Card className="overflow-hidden">
      <CardHeader className={cn("bg-primary text-primary-foreground")}>
        <div className="flex items-center gap-4">
          <ProfileAvatar firstName={profile?.firstName} lastName={profile?.lastName} username={profile?.username} />
          <div className="min-w-0">
            <CardTitle className="text-balance">{fullName}</CardTitle>
            <div className="mt-1">
              <Badge variant="secondary" className="bg-primary-foreground/15 text-primary-foreground">
                @{profile?.username}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-4">
          <FieldRow label="Name" value={fullName} />
          <FieldRow label="Username" value={`@${profile?.username}`} />
          <FieldRow label="Email" value={profile?.email} valueClassName="truncate" isEmail />
        </div>

        <div className="mt-6">
          <ProfileActions email={profile?.email} />
        </div>
      </CardContent>
    </Card>
  )
}

function FieldRow({
  label,
  value,
  valueClassName,
  isEmail,
}: {
  label: string
  value?: string
  valueClassName?: string
  isEmail?: boolean
}) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={cn("font-medium", valueClassName)}>
        {isEmail ? (
          <a
            href={`mailto:${value}`}
            className="underline-offset-4 hover:underline"
            aria-label={`Send an email to ${value}`}
          >
            {value}
          </a>
        ) : (
          value
        )}
      </span>
    </div>
  )
}
