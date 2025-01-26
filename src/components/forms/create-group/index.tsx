'use client'
import { Loader } from "@/components/loader"
import PaymentForm from "./payment-form"
import { useCreateGroup } from "@/hooks/payment"
import { ErrorMessage } from "@hookform/error-message"
import { FormGenerator } from "@/components/form-generator"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Button } from "@/components/ui/button"


type Props = {
  userId: string
}
const GroupList = dynamic(
  () =>
    import("@/components/group-list-slider").then(
      (component) => component.GroupListSlider,
    ),
  {
    ssr: false,
  },
)

const CreateGroup = ({ userId }: Props) => {
  const {
    onCreateGroup,
    isPending,
    register,
    errors,
    isCategory,
  } = useCreateGroup(userId)

  return (
    <Loader loading={false}>
      <div className="flex items-center justify-center text-2xl font-bold text-amber-600">Mauve</div>
      <form className="pt-5" onSubmit={onCreateGroup}>
        <GroupList
          className="pt-2"
          selected={isCategory}
          register={register}
          label="Select Category"
          slidesOffsetBefore={28}
        />
        <div className="px-7 mb-2">
          <ErrorMessage
            errors={errors}
            name={"category"}
            render={({ message }) => (
              <p className="text-red-400">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </div>
        <div className="px-7 pt-4">
          <FormGenerator
            register={register}
            name="name"
            errors={errors}
            inputType="input"
            type="text"
            placeholder="Group Name"
          />
        </div>
        <div className="flex flex-col justify-center items-start gap-2 px-7 mt-2">
        <Link className="text-sm text-themeTextGray" href={"/explore"}>
            Skip for now
          </Link>
          </div>
          <div className="px-7 mt-4">
          <Button
            variant="outline"
            type="submit"
            className="bg-themeBlack border-themeGray w-full rounded-xl"
          >
            <Loader loading={isPending}>Get Started</Loader>
          </Button>
          </div>
      </form>
    </Loader>
        )
}

export default CreateGroup
      