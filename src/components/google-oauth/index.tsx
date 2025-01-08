"use client"

import { Button } from "@/components/ui/button"
import { useGoogleAuth } from "@/hooks/authentication"
import { Loader } from "../loader"
import { Google } from "@/icons/google"

type GoogleAuthButtonProps = {
  method: "signup" | "signin"
}

export const GoogleAuthButton = ({ method }: GoogleAuthButtonProps) => {
  const { signUpWith, signInWith } = useGoogleAuth()
  return (
    <Button
      {...(method === "signin"
        ? {
            onClick: () => signInWith("oauth_google"),
          }
        : {
            onClick: () => signUpWith("oauth_google"),
          })}
      className="w-full rounded-2xl flex gap-3 bg-themeBlack border-themeGray"
      variant="outline"
    >
      <Loader loading={false}>
        <Google />
        Google
      </Loader>
    </Button>
  )
}