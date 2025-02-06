import type { MenuItem } from "@/types"

import { HomeIcon, SearchIcon, BookmarkIcon, DownloadIcon } from "lucide-react"

export const menuItems: MenuItem[] = [
  {
    id: "home",
    label: "Inicio",
    icon: HomeIcon,
    path: "/",
    section: "main",
  },
  {
    id: "explore",
    label: "Explorar",
    icon: SearchIcon,
    path: "/explore",
    section: "main",
  },
  {
    id: "saved",
    label: "Guardado",
    icon: BookmarkIcon,
    path: "/saved",
    section: "main",
  },
  {
    id: "downloads",
    label: "Descargas",
    icon: DownloadIcon,
    path: "/downloads",
    section: "main",
  },
  // {
  //   id: "settings",
  //   label: "Configuración",
  //   icon: Settings2Icon,
  //   path: "/settings",
  //   section: "bottom",
  // },
]

