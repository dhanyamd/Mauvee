
import { onGetAffiliateInfo } from "@/app/actions/groups"
import { onAuthenticatedUser } from "@/app/actions/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"
import { redirect } from "next/navigation"
import CreateGroup from "@/components/forms/create-group"

const GroupCreatePage = async () => {
  const user = await onAuthenticatedUser()

 // const affiliate = await onGetAffiliateInfo(searchParams.affiliate)

  if (!user || !user.id) redirect("/sign-in")

  return (
    <div className="space-y-3">
    <div >
    <CreateGroup userId={user.id} />
    </div>
      <div className="px-7 flex flex-col">
       
          <div className="w-full mt-5 flex justify-center items-center gap-x-2 italic text-themeTextGray text-sm">
            Hello Welcome!
            <Avatar>
              <AvatarImage
                src={user?.image as string}
                alt="User"
              />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
            {user?.username}
          </div>
       
      </div>
    </div>
  )
}

export default GroupCreatePage