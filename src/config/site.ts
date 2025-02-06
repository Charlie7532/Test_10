import { BookmarkIcon, HomeIcon, SearchIcon, User } from "lucide-react"

import { MenuItem } from "@/types";


export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "ENNTRA",
  description: "The easiest way to buy and sell concert tickets securely. Find great deals, sell effortlessly, and never miss your favorite events! ",
  navItems: [
    { label: "Home", href: "/", },
    { label: "Pricing", href: "/pricing", },

  ],
  navMenuItems: [
    { label: "Profile", href: "/profile", },
    { label: "Dashboard", href: "/dashboard", },
  ],
  menuItems: [
    {
      id: "home",
      label: "Inicio",
      icon: HomeIcon,
      path: "/",
      section: "main",
    },
    {
      id: "Users",
      label: "Users",
      icon: User,
      path: "/explore",
      section: "main",
    },

  ] as MenuItem[],
  links: {
    login: "/api/auth/login",
    logout: "/api/auth/logout",
    registry: "/",
    terms: "https://enntra.com/terminos-y-condiciones/",
    privacy: "https://enntra.com/politicas-de-privacidad/",
    help: "/help",
    github: "https://github.com/heroui-inc/heroui",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
