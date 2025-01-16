import { RefreshCcw } from "lucide-react"
import { JSX } from "react"

export type GroupListProps = {
  id: string
  label: string
  icon: JSX.Element
  path: string
}

export const GROUP_LIST: GroupListProps[] = [
  {
    id: "0",
    label: "All",
    icon: <RefreshCcw />,
    path: "",
  },
  {
    id: "1",
    label: "Fitness",
    icon: <RefreshCcw />,
    path: "fitness",
  },
  {
    id: "2",
    label: "Music",
    icon: <RefreshCcw />,
    path: "music",
  },
  {
    id: "3",
    label: "Buisness",
    icon: <RefreshCcw />,
    path: "buisness",
  },
  {
    id: "4",
    label: "Lifestyle",
    icon: <RefreshCcw />,
    path: "lifestyle",
  },
  {
    id: "5",
    label: "Personal Development",
    icon: <RefreshCcw />,
    path: "personal-development",
  },
  {
    id: "6",
    label: "Social Media",
    icon: <RefreshCcw />,
    path: "social-media",
  },
  {
    id: "7",
    label: "Tech",
    icon: <RefreshCcw />,
    path: "tech",
  },
]