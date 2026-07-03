import {
  Compass,
  Landmark,
  MessagesSquare,
  Moon,
  Scale,
  Users,
  type LucideIcon,
} from "lucide-react"

/** Zajednička mapa ikona tematskih cjelina (categories.json → "icon"). */
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  moon: Moon,
  scale: Scale,
  users: Users,
  landmark: Landmark,
  compass: Compass,
  messages: MessagesSquare,
}

export function CategoryIcon({ icon, className }: { icon: string; className?: string }) {
  const Icon = CATEGORY_ICONS[icon] ?? Compass
  return <Icon className={className} aria-hidden />
}
