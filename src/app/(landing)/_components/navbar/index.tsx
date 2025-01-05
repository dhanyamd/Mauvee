import Link from "next/link"
import { Logout } from "@/icons/logout"
import { Button } from "@/components/ui/button"

type Props = {}

const LandingPageNavbar = (props: Props) => {
  return (
    <div className="w-full flex justify-between sticky top-0 items-center py-5 z-50">
      <p className="font-bold text-2xl">Grouple.</p>
     
      <div className="flex gap-2">
        <Link href="/sign-in">
          <Button
            variant="outline"
            className="bg-themeBlack rounded-2xl flex gap-2 border-themeGray hover:bg-themeGray"
          >
            <Logout />
            Login
          </Button>
        </Link>
      
      </div>
    </div>
  )
}

export default LandingPageNavbar