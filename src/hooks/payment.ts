import { onCreateNewGroup } from "@/app/actions/groups"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { CreateGroupSchema } from "./schema"
import { useMutation } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"

export const useCreateGroup = (
    userId: string,
   
  ) => {
    const [isCategory, setIsCategory] = useState<string | undefined>(undefined)
    //const elements = useElements()
    const router = useRouter()
  
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
      },
    )
    const onCreateGroup = handleSubmit(async (values) => createGroup(values))

    return {
      onCreateGroup,
      isPending,
      register,
      errors,
      isCategory,
    }
}

  