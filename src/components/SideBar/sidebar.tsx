"use client"

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import {
  Dropdown, DropdownTrigger, DropdownMenu,
  DropdownItem, Skeleton, Tooltip,
  useDisclosure
} from "@heroui/react";
import LoginIcon from "@mui/icons-material/Login";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import PushPinIcon from "@mui/icons-material/PushPin";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import SupportIcon from "@mui/icons-material/Support";

import SupportModal from "../feedback/FeedBackModal";
import SettingstModal from "../SettingasModal";

import MenuButtonWithIcon from "./sidebarMenuBtn";

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";
import ArrowOutward from "@/components/icons/ArrowOutward";
import Avatar from "@/components/Auth/Avatar";
import UserName from "@/components/Auth/UserName";
import { siteConfig } from "@/config/site";


export default function Sidebar() {
  const t = useTranslations("sidebar");
  const { user, isLoading } = useUser();

  const [isHovered, setIsHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const mainMenuItems = siteConfig.menuItems.filter((item) => item.section === "main")
  const bottomMenuItems = siteConfig.menuItems.filter((item) => item.section === "bottom")

  const { theme, setTheme } = useTheme();
  const switchTheme = () => { theme === "light" ? setTheme("dark") : setTheme("light"); };

  const settingsModal = useDisclosure();
  const supportModal = useDisclosure();

  // Settings Modal Handlers
  const handleOpenSettingsModal = settingsModal.onOpen;
  // const handleCloseSettingsModal = settingsModal.onClose;

  // Feedback Modal Handlers
  const handleOpenSupportModalModal = supportModal.onOpen;
  // const handleCloseSupportkModal = supportModal.onClose;

  return (
    <>
      <aside
        className="h-screen p-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`bg-sidebarlightBackground dark:bg-sidebardarkBackground h-full ${isSidebarOpen || isHovered ? "w-[250px]" : "w-16"} transition-width duration-200 text-black dark:text-white rounded-lg flex flex-col`}
        >
          {/* Logo */}
          <div className="px-4 py-6">
            <Link href="/">
              {
                isHovered || isSidebarOpen ?
                  (
                    <svg
                      width="116.210"
                      height="30"
                      viewBox="0 0 61.494 15.875"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        className="fill-black dark:fill-white"
                        d="M18.118 14.76c-5.037.793-6.965 4.89-6.795 9.484.028.737-.972 1.8-.5 2.416 1.07 1.395 2.778-2.484 3.56-.992.523.994-2.016 2.65-2.532 3.351-.34.464-.398 1.38.42 1.317.655-.049 1.25-.74 1.687-1.165 1.196-1.165 2.363-2.36 3.544-3.54.474-.476 1.34-1.097 1.34-1.843 0-1.674-1.952.27-2.402.27-1.174-.002-.712-2.323-.45-2.895.757-1.655 2.629-2.859 4.439-2.164.943.362 1.726 1.61 2.773.864 4.339-3.092-2.126-5.569-5.084-5.103m23.878 2.551c0 2.84-.242 5.799.01 8.627.073.831 1.201 1.32 1.9.766.546-.432.247-2.139.247-2.768V15.77c-.722 0-1.914-.23-2.57.093-.78.384-.207 1.34.413 1.447m21.876-1.54c0 .747-.094 1.396.77 1.54v6.163c0 .882-.203 2.055.05 2.904.182.616 1.572.713 1.948.238.47-.593.159-2.257.159-2.988 1.651 1.665 2.723 3.87 5.392 3.08l-2.157-2.618-.806-1.167 2.346-3.147c-2.351 0-3.146.99-4.775 2.62V15.77zm-2.92.423c-1.333.523-.566 2.643.76 2.205 1.545-.51.748-2.797-.76-2.205m-31.434 3.51c-5.144 1.187-2.287 9.183 2.465 6.976.684-.318 1.608-1.149.874-1.897-1.133-1.157-2.8 1.416-3.906-.848-.503-1.03.36-2.36 1.491-2.414.852-.041 1.508.945 2.261.081 1.39-1.593-2.274-2.108-3.185-1.898m6.316 3.924c.915 0 4.165.496 4.748-.247.373-.476.056-1.422-.147-1.91-.714-1.716-2.986-2.318-4.601-1.553-3.147 1.49-2.415 6.635 1.078 7.07.729.09 3.66-.21 3.068-1.515-.503-1.107-1.465-.392-2.297-.34-.938.058-1.573-.695-1.849-1.505m11.708 0h4.776c.092-1.105.012-2.212-.803-3.053-1.84-1.897-5.307-.877-5.894 1.666-.499 2.162.66 4.467 3 4.747.747.09 3.27-.158 3.041-1.36-.251-1.323-1.494-.553-2.271-.496-.972.072-1.64-.625-1.849-1.504m8.01-3.081c-.5-2.299-3.83.575-1.386.77v2.31c0 .794-.262 2.157.093 2.879.258.524 1.56.524 1.817 0 .896-1.82-1.234-5.311 2.25-4.881l.77-1.695c-1.352-.65-2.386-.138-3.543.617m4.005-.77c0 .746-.094 1.396.77 1.54v2.465c0 .755-.245 2.036.093 2.724.247.5 1.574.53 1.906.11.708-.894.158-4.013.158-5.145 0-.432.142-1.229-.247-1.536-.548-.435-2.008-.159-2.68-.159m-20.951 2.62h-2.619c.484-1.413 2.286-1.613 2.619 0m11.708 0h-2.619c.44-1.55 2.123-1.448 2.62 0m-27.73 2.581c-.693.231-1.183.898-1.85 1.205-1.43.66-4.366 1.197-4.633 3.291-.08.62.815.768 1.245.875a7.87 7.87 0 0 0 4.313-.151c1.263-.416 3.123-1.501 3.525-2.872.293-1-1.652-2.664-2.6-2.348"
                        transform="translate(-10.696 -14.704)" />
                    </svg>
                  ) :
                  (
                    <svg
                      width="27.439"
                      height="30"
                      viewBox="0 0 14.52 15.875"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        className="fill-black dark:fill-white"
                        d="M18.118 37.914c-5.037.793-6.965 4.89-6.795 9.484.028.737-.972 1.8-.5 2.415 1.07 1.396 2.778-2.483 3.56-.991.523.994-2.016 2.65-2.532 3.351-.34.463-.398 1.379.42 1.317.655-.05 1.25-.74 1.687-1.165 1.196-1.165 2.363-2.36 3.544-3.541.474-.475 1.34-1.096 1.34-1.842 0-1.674-1.952.27-2.402.27-1.174-.003-.712-2.323-.45-2.896.757-1.654 2.629-2.858 4.439-2.163.943.362 1.726 1.61 2.773.864 4.339-3.092-2.126-5.569-5.084-5.103m4.467 10.217c-.692.231-1.182.898-1.848 1.205-1.43.66-4.367 1.197-4.634 3.29-.08.621.815.768 1.245.876a7.87 7.87 0 0 0 4.313-.152c1.263-.416 3.123-1.5 3.525-2.871.293-1-1.652-2.665-2.6-2.348"
                        transform="translate(-10.696 -37.857)" />
                    </svg>
                  )
              }
            </Link>

          </div>

          {/* Toggle Sidebar Button */}
          {isHovered && (
            <motion.button
              className="absolute top-4 left-60 px-4 py-2  text-black dark:text-white rounded-full"
              onClick={() => {
                setIsSidebarOpen((prev) => !prev);
                setIsHovered(false);
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ opacity: { delay: 0.3, duration: 0.3 }, }}
            >
              {isSidebarOpen ?
                <Tooltip content={t("colapseSidebar")} placement="right"><KeyboardDoubleArrowLeftIcon /></Tooltip> :
                <Tooltip content={t("pinSidebar")} placement="right"><PushPinIcon fontSize="small" /></Tooltip>
              }
            </motion.button>
          )}

          {/* Main Navigation */}
          <nav className="flex-1">
            <div className="space-y-1">
              {mainMenuItems.map((item) => (<MenuButtonWithIcon key={item.id} item={item} isExpanded={isSidebarOpen || isHovered} />))}
            </div>
          </nav>

          {/* Bottom Navigation */}
          <div className=" pt-2 pb-4 flex justify-center w-full">
            <div className="space-y-1 w-full">
              {bottomMenuItems.map((item) => (<MenuButtonWithIcon key={item.id} item={item} isExpanded={isSidebarOpen || isHovered} />))}
              {
                isLoading ? (
                  <div className="max-w-[200px] w-full flex items-center gap-3">
                    <div>
                      <Skeleton className="flex rounded-full w-10 h-10" />
                    </div>
                    {
                      isSidebarOpen || isHovered && (
                        <div className="w-full flex flex-col gap-2">
                          <Skeleton className="h-3 w-3/5 rounded-lg" />
                          <Skeleton className="h-3 w-4/5 rounded-lg" />
                        </div>
                      )
                    }
                  </div>
                ) : (
                  user ? (
                    <Dropdown>
                      <DropdownTrigger>
                        <span className="flex items-center mx-2 justify-center text-base rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 hover:font-semibold cursor-pointer select-none">
                          <Avatar />
                          {
                            isSidebarOpen ? (
                              <span className={`opacity-100  block ml-3 whitespace-nowrap `}><UserName /></span>
                            ) : (
                              isHovered && (
                                <motion.span
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.6 }}
                                  className={`ml-3 whitespace-nowrap `}
                                >
                                  <UserName />
                                </motion.span>
                              )
                            )
                          }

                        </span>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Static Actions">
                        <DropdownItem
                          key="settings"
                          onPress={handleOpenSettingsModal}
                          startContent={<SettingsIcon />}
                        >
                          {t("settings")}
                        </DropdownItem>

                        <DropdownItem
                          key="theme"
                          onPress={switchTheme}
                          startContent={theme === "light" ? <MoonFilledIcon /> : <SunFilledIcon />}
                        >
                          {theme === "light" ? t("darkMode") : t("lightMode")}
                        </DropdownItem>


                        <DropdownItem
                          key="help"
                          onPress={handleOpenSupportModalModal}
                          startContent={<SupportIcon />}
                        >
                          {t("helpFeedback")}
                        </DropdownItem>
                        <DropdownItem
                          key="logout"
                          className="text-danger"
                          color="danger"
                          href={siteConfig.links.logout}
                          startContent={<LogoutIcon />}
                          showDivider
                        >{t("logout")}</DropdownItem>
                        <DropdownItem key="legal" isReadOnly style={{ cursor: "default", backgroundColor: "transparent" }}>
                          <span className="flex justify-between space-x-2 text-gray-500 text-xs">
                            <a href={`${siteConfig.links.privacy}`} target="_blank" rel="noreferrer" className="hover:underline">
                              {t("Privacy Policy")}{" "}
                              <ArrowOutward
                                width="1rem"
                                className="fill-gray-500 dark:fill-gray-500"
                              />
                            </a>
                            <span>|</span>
                            <a href={`${siteConfig.links.terms}`} target="_blank" rel="noreferrer" className="hover:underline">
                              {t("Terms of Service")}{" "}
                              <ArrowOutward
                                width="1rem"
                                className="fill-gray-500 dark:fill-gray-500"
                              />
                            </a>
                          </span>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  ) : (
                    <MenuButtonWithIcon
                      title="login"
                      icon={<LoginIcon />}
                      href={siteConfig.links.login}
                      isExpanded={isSidebarOpen || isHovered}
                    />
                  ))
              }
            </div>
          </div>
        </div>
      </aside >

      <SettingstModal isOpen={settingsModal.isOpen} onOpenChange={settingsModal.onOpenChange} />
      <SupportModal isOpen={supportModal.isOpen} onOpenChange={supportModal.onOpenChange} />
    </>
  )
}
