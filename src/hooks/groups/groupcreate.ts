import { onCreateNewGroup } from "@/app/actions/groups"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CreateGroupSchema } from "../schema"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"

export const useGroup = async(
    userId: string,

) => {

    const [isCategory, setIsCategory] = useState<string | undefined>(undefined)
    const {
        reset,
        handleSubmit,
        formState: { errors },
        register,
        watch,
      } = useForm<z.infer<typeof CreateGroupSchema>>({
        resolver: zodResolver(CreateGroupSchema),
        defaultValues: {
          category: "",
          name : ""
        },
      })
    
      useEffect(() => {
        const category = watch(({ category }) => {
          if (category) {
            setIsCategory(category)
          }
        })
        return () => category.unsubscribe()
      }, [watch])
    
      const { mutateAsync: createGroup, isPending } = useMutation({
        mutationFn: async (data: z.infer<typeof CreateGroupSchema>) => {
   // const onCreateGroup = handleSubmit(async (data) => createGroup(data))
    
    const router = useRouter()
    const created = await onCreateNewGroup(userId, data)
    if (created && created.status === 200) {
      toast("Success", {
        description: created.message,
      })
      router.push(
        `/group/${created.data?.group[0].id}/channel/${created.data?.group[0].channel[0].id}`,
      )
    }
    if (created && created.status !== 200) {
      reset()
      return toast("Error", {
        description: created.message,
      })
    }
  }
})
const onCreateGroup = handleSubmit(async (values) => createGroup(values))

return {
  onCreateGroup,
  isPending,
  register,
  errors,
  isCategory,

}}