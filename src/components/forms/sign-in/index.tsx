"use client"

import { FormGenerator } from "@/components/form-generator"
import { Loader } from "@/components/loader"
import { Button } from "@/components/ui/button"
import { GROUPLE_CONSTANTS } from "@/constants"
import { useAuthSignIn } from "@/hooks/authentication"

type Props = {}

const SignInForm = (props: Props) => {
  const {isPending,errors, onAuthenticatedUser, register } = useAuthSignIn()

  return (
    <form className="flex flex-col gap-3 mt-10" onSubmit={onAuthenticatedUser}>
      {GROUPLE_CONSTANTS.signInForm.map((field) => (
        <FormGenerator
          {...field}
          key={field.id}
          register={register}
          errors={errors}
        />
      ))}
      <Button type="submit" className="rounded-2xl">
        <Loader loading={isPending}>Sign In with Email</Loader>
      </Button>
    </form>
  )
}

export default SignInForm