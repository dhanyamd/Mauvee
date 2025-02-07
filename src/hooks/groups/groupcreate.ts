import { onCreateNewGroup, onUpDateGroupSettings } from "@/app/actions/groups"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CreateGroupSchema } from "../schema"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { validateURLString } from "@/lib/utils"
import { JSONContent } from "novel"
import { GroupSettingsSchema } from "@/components/forms/group-setttings/schema"

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

export const useGroupAbout = (
  description : string | null,
  jsonDescription : string | null,
  htmlDescription : string | null,
  currentMedia : string,
  groupid : string
) => {
  const editor = useRef<HTMLFormElement | null>(null)
  const mediaType = validateURLString(currentMedia)
  const [activeMedia, setActiveMedia] = useState< | {
    url : string | undefined
    type : string 
  }
  | undefined
  >(
    mediaType.type === "IMAGE" ? {
      url : currentMedia,
      type : mediaType.type
    } : { ...mediaType},
  )

  const jsonContent = jsonDescription !== null ? JSON.parse(jsonDescription as string) : undefined

  const [onJsonDescription, setJsonDescription] = useState<JSONContent | undefined>(jsonContent)
  const [onDescription, setOnDescription] = useState<string | undefined>(description || undefined)
  const [onHtmlDescription, setOnHtmlDescription] = useState<string | undefined>(htmlDescription || undefined)
  const [onEditDescription, setOnEditDescription] = useState<boolean>(false)

  const {
    setValue,
    formState: {errors},
    handleSubmit
  } = useForm<z.infer<typeof GroupSettingsSchema>>({
    resolver: zodResolver(GroupSettingsSchema)
  })
  
const onSetDescriptions = () => {
  const JsonContent = JSON.stringify(onJsonDescription)
  setValue("jsondescription", JsonContent)
  setValue("description", onDescription)
  setValue("htmldescription", onHtmlDescription)
}

  useEffect(() => {
    onSetDescriptions()
    return () => {
      onSetDescriptions()
    }
  }, [onJsonDescription, onDescription])

 const onEditTextEditor = (event : Event) => {
  if(editor.current){
    !editor.current.contains(event.target as Node | null)
    ? setOnEditDescription(false)
    : setOnEditDescription(true)
  }
 }

  useEffect(() => {
    document.addEventListener("click", onEditTextEditor, false)
    return () => {
      document.removeEventListener("click", onEditTextEditor),false 
    }
  },[])
  //optimistic ui => useMutation 
  const {mutate, isPending} = useMutation({
     mutationKey : ["about-description"],
     mutationFn: async (values : z.infer<typeof GroupSettingsSchema>) => {
      if(values.description) {
        const updated = await onUpDateGroupSettings(
          groupid,
          "DESCRIPTION",
          values.description,
          `/about/${groupid}`
        )
        if(updated.status !== 200){
          return toast("Error", {
           description: "Oops! looks like your form is empty"
          })
        }
      }
      if(values.jsondescription){
        const updated = await onUpDateGroupSettings(
          groupid,
          "JSONDESCRIPTION",
          values.jsondescription,
          `/about/${groupid}`
        )
        if(updated.status !== 200) {
          return toast("Error", {
            description: "Oops! looks like your form is empty"
          })
        }
      }
      if(values.htmldescription){
        const updated = await onUpDateGroupSettings(
          groupid,
          "HTMLDESCRIPTION",
          values.htmldescription,
          `/about/${groupid}`
        )
        if(updated.status !== 200) {
          return toast("Error", {
            description: "Oops! looks like your form is empty"
          })
        }
     }
     if(
      !values.description && 
      !values.jsondescription && 
      !values.htmldescription
     ) {
      return toast("Error", {
        description: "Oops! looks like your form is empty"
      })
     }
     return toast("Success", {
      description : "Group description updated"
     })
    }
  })
  const onSetActionMedia = (media : { url : string | undefined; type : string}) => 
    setActiveMedia(media)

  const onUpdateDescription = handleSubmit(async (values) => {
    mutate(values)
  })

  return {
    setOnDescription,
    onDescription,
    setJsonDescription,
    onJsonDescription,
    errors,
    onEditDescription,
    editor,
    activeMedia,
    onSetActionMedia,
    setOnHtmlDescription,
   onUpdateDescription,
   isPending
  }
}

