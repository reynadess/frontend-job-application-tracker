import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"

export function ProfileAvatar({
  firstName,
  lastName,
  username,
  size = 48,
}: {
  firstName?: string
  lastName?: string
  username?: string
  size?: number
}) {
  const initials = getInitials(firstName, lastName, username)
  const label = [firstName, lastName].filter(Boolean).join(" ").trim() || username

  return (
    <Avatar  style={{ width: size, height: size }}>
      {/* No image provided, fallback to initials */}
      <AvatarFallback className="bg-black" aria-label={`Avatar for ${label}`}>
        <span className="select-none text-sm font-semibold">{initials}</span>
      </AvatarFallback>
    </Avatar>
  )
}

function getInitials(firstName?: string, lastName?: string, username?: string) {
  const f = (firstName || "").trim()
  const l = (lastName || "").trim()
  if (f || l) {
    const init = `${f.charAt(0)}${l.charAt(0)}`.toUpperCase()
    return init || (username?.slice(0, 2).toUpperCase() ?? "U")
  }
  return username?.slice(0, 2).toUpperCase() ?? "U"
}
