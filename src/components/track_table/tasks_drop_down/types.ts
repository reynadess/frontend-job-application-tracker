import { LucideIcon } from "lucide-react";
export type kind  = "favorite" | "copy" | "edit" | "delete" ;
export interface MenuItemType {
    icon: LucideIcon;
    label: string;
    shortcut: string;
    kind : kind;
}