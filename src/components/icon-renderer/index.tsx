import { MegaPhoneDuoToneBlack } from "@/icons/a"
import { MegaPhoneDuoToneWhite } from "@/icons/b"
import { HomeDuoToneWhite } from "@/icons/c"
import { FileDuoToneBlack } from "@/icons/d"
import { FileDuoToneWhite } from "@/icons/e"
import { Home } from "lucide-react"

  
  type IconRendererProps = {
    mode: "LIGHT" | "DARK"
    icon: string
  }
  
  export const IconRenderer = ({ mode, icon }: IconRendererProps) => {
    switch (icon) {
      case "general":
        return mode === "DARK" ? <Home /> : <HomeDuoToneWhite />
      case "announcement":
        return mode === "DARK" ? (
          <MegaPhoneDuoToneBlack />
        ) : (
          <MegaPhoneDuoToneWhite />
        )
      case "doc":
        return mode === "DARK" ? <FileDuoToneBlack /> : <FileDuoToneWhite />
      default:
        return <></>
    }
  }