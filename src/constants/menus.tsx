/*import {
    AffiliateDuoToneBlack,
    Buisness,
    Chat,
    Courses,
    CreditCard,
    Document,
    Explore,
    GlobeDuoToneBlack,
    Home,
    IDuotoneBlack,
    PersonalDevelopment,
    ZapDouToneBlack,
  } from "@icons"*/
import { AffiliateDuoToneBlack } from "@/icons/affiliate-duo-blacktone"
import { CreditCard } from "@/icons/credit-card"
import { GlobeDuoToneBlack } from "@/icons/globe-duotone"
import { IDuotoneBlack } from "@/icons/iduotone"
import { ZapDouToneBlack } from "@/icons/zapduotone"
import { JSX } from "react"
  
  export type MenuProps = {
    id: number
    label: string
    icon: JSX.Element
    path: string
    section?: boolean
    integration?: boolean
  }
  
  export type GroupMenuProps = {
    id: number
    label: string
    icon: JSX.Element
    path: string
  }
  
  export const LANDING_PAGE_MENU: MenuProps[] = [
    {
      id: 0,
      label: "Home",
      icon: <AffiliateDuoToneBlack />,
      path: "/",
      section: true,
    },
    {
      id: 1,
      label: "Pricing",
      icon: <AffiliateDuoToneBlack />,
      path: "#pricing",
      section: true,
    },
    {
      id: 1,
      label: "Explore",
      icon: <AffiliateDuoToneBlack />,
      path: "/explore",
    },
  ]
  export const GROUP_PAGE_MENU: MenuProps[] = [
    {
      id: 0,
      label: "Group",
      icon: <AffiliateDuoToneBlack />,
      path: "/",
      section: true,
    },
    {
      id: 1,
      label: "Courses",
      icon: <AffiliateDuoToneBlack />,
      path: "#pricing",
      section: true,
    },
    {
      id: 2,
      label: "Events",
      icon: <AffiliateDuoToneBlack />,
      path: "/explore",
    },
    {
      id: 3,
      label: "Members",
      icon: <AffiliateDuoToneBlack />,
      path: "/explore",
    },
    {
      id: 4,
      label: "About",
      icon: <AffiliateDuoToneBlack />,
      path: "/explore",
    },
    {
      id: 5,
      label: "Huddle",
      icon: <AffiliateDuoToneBlack />,
      path: "/explore",
    },
  ]
  
  export const SIDEBAR_SETTINGS_MENU: MenuProps[] = [
    {
      id: 0,
      label: "General",
      icon: <IDuotoneBlack />,
      path: "",
    },
    {
      id: 1,
      label: "Subscriptions",
      icon: <CreditCard />,
      path: "subscriptions",
    },
    {
      id: 2,
      label: "Affiliates",
      icon: <AffiliateDuoToneBlack />,
      path: "affiliates",
    },
    {
      id: 3,
      label: "Domain Config",
      icon: <GlobeDuoToneBlack />,
      path: "domains",
    },
    {
      id: 4,
      label: "Integration",
      icon: <ZapDouToneBlack />,
      path: "integrations",
      integration: true,
    },
  ]
  
