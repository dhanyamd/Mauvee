'use client'
import { Loader } from "@/components/loader"
import PaymentForm from "./payment-form"
import { useCreateGroup } from "@/hooks/payment"
import { ErrorMessage } from "@hookform/error-message"
import { FormGenerator } from "@/components/form-generator"
import dynamic from "next/dynamic"


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
      </form>
    </Loader>
        )
}

export default CreateGroup
      