import {Copy   ,Edit2,Star} from "lucide-react";
import {MenuItemType} from "./types"

export const menuItems: MenuItemType[] = [
    {
        icon: Copy,
        label: "Copy",
        shortcut: "↑⌘C",
        kind: "copy"
    },
    {
        icon: Edit2,
        label: "Edit",
        shortcut: "⌘E",
        kind: "edit"
    },
    {
        icon: Star,
        label: "Favorite",
        shortcut: "⌘S",
        kind: "favorite"
    }
]

export const LABEL_OPTIONS = ["Urgent" , "Remote" , "On-site"]