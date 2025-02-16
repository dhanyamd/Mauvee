'use client'
import { useCustomDomain } from "@/hooks/groups"
import { FormGenerator } from "../form-generator"
import { Button } from "../ui/button"
import { Loader } from "../loader"
import { cn } from "@/lib/utils"
import { CircleAlert } from "lucide-react"

type CustomDomainFormProps = {
    groupid: string
}

export const CustomDomainForm = ({groupid}: CustomDomainFormProps ) => {
  const {register, errors, onAddDomain, isPending, data} = useCustomDomain(groupid)
  console.log(data?.status)
  return (
    <div className="flex flex-col gap-y-5">
   <form className="mt-10 flex gap-x-5 items-end" onSubmit={onAddDomain}>
  <FormGenerator 
  register={register}
  errors={errors}
  name="domain"
  label="Domain"
  inputType="input"
  type="text"
  placeholder={data?.domain ? data.domain : "e.g example.com"}
  />
  <Button className="bg-themeBlack border-themeGray" variant="outline">
 <Loader loading={isPending}>Add Domain</Loader>
  </Button>
   </form>
   <div className={cn(
    "flex gap-x-5 bg-themeBlack p-4 rounded-xl text-sm items-center",
    data?.status.misconfirgured ? "tect-red-500" : "text-white"
   )}>
   {data?.status.misconfirgured ? (
    <CircleAlert size={20}/>
   ): (
    <CircleAlert size={20}/>
   )}
   <p>
    {data?.status.misconfirgured ? 
    "DNS not configured correctly"
    : "DNS configured correctly"
     }
   </p>
   </div>
    </div>
  )
}