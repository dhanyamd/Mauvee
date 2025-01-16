import { onSignupUser } from "@/app/actions/auth"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const CompleteOAuthAfterCallback = async () => {
  const user = await currentUser()
  if (!user) redirect("/sign-in")
  const complete = await onSignupUser({
    firstname: user.firstName as string,
    lastname: user.lastName as string,
    image: user.imageUrl,
    clerkId: user.id,
  })

  if (complete.status == 200) {
    redirect('/group/create')
  }

  if (complete.status !== 200) {
    redirect("/sign-in")
  }
}

export default CompleteOAuthAfterCallback