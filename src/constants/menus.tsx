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
      icon: <AffiliateDuoToneBlack />,
      path: "",
    },
    {
      id: 1,
      label: "Subscriptions",
      icon: <AffiliateDuoToneBlack />,
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
      icon: <AffiliateDuoToneBlack />,
      path: "domains",
    },
    {
      id: 4,
      label: "Integration",
      icon: <AffiliateDuoToneBlack />,
      path: "integrations",
      integration: true,
    },
  ]
  
  type IntegrationsListItemProps = {
    id: string
    name: "stripe"
    logo: string
    description: string
    title: string
    modalDescription: string
  }
  
  export const INTEGRATION_LIST_ITEMS: IntegrationsListItemProps[] = [
    {
      id: "1",
      name: "stripe",
      description:
        "Stripe is the fastest and easiest way to integrate payments and financial services into your software platform or marketplace.",
      logo: "914be637-39bf-47e6-bb81-37b553163945",
      title: "Connect Stripe Account",
      modalDescription:
        "The world’s most successful platforms and marketplaces including Shopify and DoorDash, use Stripe Connect.",
    },
  ]