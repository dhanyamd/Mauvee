"use client"
import { onGetExploreGroup, onGetGroupInfo, onSearchGroups, onUpdateGroupGallery, onUpDateGroupSettings } from "@/app/actions/groups"
import { supabaseClient } from "@/lib/utils"
import { onOnline } from "@/redux/slices/online-member-slice"
import { GroupStateProps, onClearSearch, onSearch } from "@/redux/slices/search-slice"
import { AppDispatch } from "@/redux/store"
import { useMutation, useQuery } from "@tanstack/react-query"
import React, { useEffect, useLayoutEffect, useState } from "react"
import { useDispatch } from "react-redux"
import {JSONContent} from "novel"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { set, z } from "zod"
import { GroupSettingsSchema } from "@/components/forms/group-setttings/schema"
import { toast } from "sonner"
import { upload } from "@/lib/uploadcare"
import { useRouter } from "next/navigation"
import { onClearList, onInfiniteScroll } from "@/redux/slices/infinite-scroll-slice"
import { UpdateGallerySchema } from "@/components/forms/media-gallery/schema"
export const useGroupChatOnline = (userid: string) => {
    const dispatch: AppDispatch = useDispatch()
  
    useEffect(() => {
      const channel = supabaseClient.channel("tracking")
  
      channel
        .on("presence", { event: "sync" }, () => {
          const state: any = channel.presenceState()
          console.log(state)
          for (const user in state) {
            dispatch(
              onOnline({
                members: [{ id: state[user][0].member.userid }],
              }),
            )
          }
        })
        .subscribe(async (status) => {
          if (status === "SUBSCRIBED") {
            await channel.track({
              member: {
                userid,
              },
            })
          }
        })
  
      return () => {
        channel.unsubscribe()
      }
    }, [])
  }

  export const useSearch = (search : "GROUPS" | "POSTS") => {
   const [query, setQuery] = useState<string>("")
   const [debounce, setDebounce] = useState<string>("")

   const dispatch : AppDispatch = useDispatch()
   const onSearchQuery = (e:React.ChangeEvent<HTMLInputElement>)=> 
    setQuery(e.target.value)

   useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebounce(query)
    },1000)
    return () => clearTimeout(delayInputTimeoutId)
   }, [query, 1000])

   const {refetch, data, isFetched, isFetching} = useQuery({
    queryKey : ["search-data", debounce],
    queryFn: async ({ queryKey }) => {
      if(search === "GROUPS"){
        const groups = onSearchGroups(search, queryKey[1])
        return groups
    }
  },
  enabled : false
   })
   if(isFetching)
    dispatch(
        onSearch({
          isSearching : true,
          data: []
        })
      )
      if(isFetched)
        dispatch(
          onSearch({
            isSearching : false,
            data: data?.groups || [],
            status : data?.status as number,
            debounce
          })
        )
        useEffect(() => {
          if(debounce) refetch()
            if(!debounce) dispatch(onClearSearch())
              return () => {
               debounce}
        },[debounce])
      
   return {onSearchQuery, query} 
  }

  export const useGroupSettings = (groupid : string) => {
    const {data} = useQuery({
      queryKey: ["group-info"],
      queryFn : () => onGetGroupInfo(groupid)
    })
    const jsonContent = data?.group?.jsonDescription 
    ? JSON.parse(data?.group?.jsonDescription as string ) : undefined

   
  const [onJsonDescription, setJsonDescription] = useState<
  JSONContent | undefined
>(jsonContent)

const [onDescription, setOnDescription] = useState<string | undefined>(
  data?.group?.description || undefined,
)
    
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      watch,
      setValue
    } = useForm<z.infer<typeof GroupSettingsSchema>>({
      resolver : zodResolver(GroupSettingsSchema),
      mode : "onChange",
    })
    const [previewIcon, setPreviewIcon] = useState<string | undefined>(undefined)
    const [previewThumbnail, setPreviewThumbnail] = useState<string | undefined>(undefined)

    useEffect(() => {
      const previews = watch(({thumbnail, icon}) => {
        if(!icon) return 
        if(icon[0]){
          setPreviewIcon(URL.createObjectURL(icon[0]))
        }
        if(thumbnail[0]){
          setPreviewThumbnail(URL.createObjectURL(thumbnail[0]))
        }
      })
      return () => previews.unsubscribe()
    },[watch])

    const onSetDescriptions = () => {
      const JsonContent = JSON.stringify(onJsonDescription)
      setValue("jsondescription", JsonContent)
      setValue("description", onDescription)
    }
   useEffect(() => {
    onSetDescriptions()
    return () => {
      onSetDescriptions()
    }
   },[onJsonDescription, onDescription])

   const {mutate: update, isPending} = useMutation({
    mutationKey: ["group-settings"],
    mutationFn : async(values : z.infer<typeof GroupSettingsSchema>) => {
      if(values.thumbnail && values.thumbnail.length  > 0){
        const uploaded = await upload.uploadFile(values.thumbnail[0])
        const updated = await onUpDateGroupSettings(
          groupid,
          "IMAGE",
          uploaded.uuid,
          `/group/${groupid}/settings`
        )
        if(updated?.status !== 200){
          return toast("Error", {
            description: "OOps! looks like your form is empty "
          })
        }
      }
      if (values.icon && values.icon.length > 0) {
        console.log("icon")
        const uploaded = await upload.uploadFile(values.icon[0])
        const updated = await onUpDateGroupSettings(
          groupid,
          "ICON",
          uploaded.uuid,
          `/group/${groupid}/settings`,
        )
        if (updated.status !== 200) {
          return toast("Error", {
            description: "Oops! looks like your form is empty",
          })
        }
      }
      if (values.name) {
        const updated = await onUpDateGroupSettings(
          groupid,
          "NAME",
          values.name,
          `/group/${groupid}/settings`,
        )
        if (updated.status !== 200) {
          return toast("Error", {
            description: "Oops! looks like your form is empty",
          })
        }
      }
      console.log("DESCRIPTION")

      if (values.description) {
        const updated = await onUpDateGroupSettings(
          groupid,
          "DESCRIPTION",
          values.description,
          `/group/${groupid}/settings`,
        )
        
        if (updated.status !== 200) {
          return toast("Error", {
            description: "Oops! looks like your form is empty",
          })
        }
      }
      if (values.jsondescription) {
        const updated = await onUpDateGroupSettings(
          groupid,
          "JSONDESCRIPTION",
          values.jsondescription,
          `/group/${groupid}/settings`,
        )
        if (updated.status !== 200) {
          return toast("Error", {
            description: "Oops! looks like your form is empty",
          })
        }
      }
      if (
        !values.description &&
        !values.name &&
        !values.thumbnail.length &&
        !values.icon.length &&
        !values.jsondescription
      ) {
        return toast("Error", {
          description: "Oops! looks like your form is empty",
        })
      }
      return toast("Success", {
        description: "Group data updated",
      })
    },
  })
  const router = useRouter()
  const onUpdate = handleSubmit(async (values) => update(values))
  //if (data?.status !== 200) router.push(`/group/create`)

  return {
    data,
    register,
    errors,
    onUpdate,
    isPending,
    previewIcon,
    previewThumbnail,
    onJsonDescription,
    setJsonDescription,
    setOnDescription,
    onDescription,
  }
  }

export const useExploreSlider = (query: string, paginate: number) => {
  const [onLoadSlider, setOnLoadSlider] = useState<boolean>(false)
  const dispatch: AppDispatch = useDispatch()
  const {data, refetch, isFetched, isFetching} = useQuery({
    queryKey : ["fetch-group-slides"],
    queryFn: () =>  onGetExploreGroup(query, paginate|0),
    enabled : false
  })
  if(isFetched && data?.status === 200 && data.groups){
    dispatch(onInfiniteScroll({data: data.groups}))
  }
  useEffect(() => {
    setOnLoadSlider(true)
    return () => {
      onLoadSlider
    }
  },[])

  return {refetch, isFetched, data, onLoadSlider, isFetching}
  }

  export const useGroupList = (query: string) => {
    const { data } = useQuery({
      queryKey: [query],
    })
  
    const dispatch: AppDispatch = useDispatch()
  
    useLayoutEffect(() => {
      dispatch(onClearList({ data: [] }))
    }, [])
  
    const { groups, status } = data as {
      groups: GroupStateProps[]
      status: number
    }
  
    return { groups, status }
  }

  export const useGroupInfo = () => {
    const { data } = useQuery({
      queryKey: ["about-group-info"],
    })
  
    const router = useRouter()
  
    if (!data) router.push("/explore")
  
    const { group, status } = data as { status: number; group: GroupStateProps }
  
    if (status !== 200) router.push("/explore")
  
    return {
      group,
    }
  }
  
  /*export const useMediaGallery = (groupid: string) => {
    const {
      register,
      formState: { errors },
      handleSubmit,
    } = useForm<z.infer<typeof UpdateGallerySchema>>({
      resolver: zodResolver(UpdateGallerySchema),
    })
  
    const { mutate, isPending } = useMutation({
      mutationKey: ["update-gallery"],
      mutationFn: async (values: z.infer<typeof UpdateGallerySchema>) => {
        if (values.videourl) {
          const update = await onUpdateGroupGallery(groupid, values.videourl)
          if (update && update.status !== 200) {
            return toast("Error", {
              description: update?.message,
            })
          }
        }
        if (values.image && values.image.length) {
          let count = 0
          while (count < values.image.length) {
            const uploaded = await upload.uploadFile(values.image[count])
            if (uploaded) {
              const update = await onUpdateGroupGallery(groupid, uploaded.uuid)
              if (update?.status !== 200) {
                toast("Error", {
                  description: update?.message,
                })
                break
              }
            } else {
              toast("Error", {
                description: "Looks like something went wrong!",
              })
              break
            }
            console.log("increment")
            count++
          }
        }
  
        return toast("Success", {
          description: "Group gallery updated",
        })
      },
    })
    const onUpdateGallery = handleSubmit(async(values) => mutate(values))
    return {
     register,
     errors,
     onUpdateGallery,
     isPending
    }
  }*/

    export const useMediaGallery = (groupid: string) => {
      const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm<z.infer<typeof UpdateGallerySchema>>({
        resolver: zodResolver(UpdateGallerySchema),
      })
    
      const { mutate, isPending } = useMutation({
        mutationKey: ["update-gallery"],
        mutationFn: async (values: z.infer<typeof UpdateGallerySchema>) => {
          if (values.videourl) {
            const update = await onUpdateGroupGallery(groupid, values.videourl)
            if (update && update.status !== 200) {
              return toast("Error", {
                description: update?.message,
              })
            }
          }
          if (values.image && values.image.length) {
            let count = 0
            while (count < values.image.length) {
              const uploaded = await upload.uploadFile(values.image[count])
              if (uploaded) {
                const update = await onUpdateGroupGallery(groupid, uploaded.uuid)
                if (update?.status !== 200) {
                  toast("Error", {
                    description: update?.message,
                  })
                  break
                }
              } else {
                toast("Error", {
                  description: "Looks like something went wrong!",
                })
                break
              }
              console.log("increment")
              count++
            }
          }
    
          return toast("Success", {
            description: "Group gallery updated",
          })
        },
      })
    
      const onUpdateGallery = handleSubmit(async (values) => mutate(values))
    
      return {
        register,
        errors,
        onUpdateGallery,
        isPending,
      }
    }
