import { onUpdateChannelInfo } from "@/app/actions/channel"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"

export const useChannelInfo = () => {
    const channelRef = useRef<HTMLAnchorElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const[channel, setChannel] = useState<string | undefined>(undefined)
    const[edit, setEdit] = useState<boolean>(false)
    const[icon, setIcon] = useState<string | undefined>(undefined)
    const client = useQueryClient()
    const triggerRef = useRef<HTMLButtonElement>(null)

    const onEditChannel = (id: string) => {
        setChannel(id)
        setEdit(true)
    }

    const onSetIcon = (icon: string) => {
        setIcon(icon)
    }
    const {mutate, isPending, variables} = useMutation({
        mutationFn : (data : {name? : string, icon? : string}) => 
        onUpdateChannelInfo(channel!, data.name!, data.icon!),
        onMutate: () => {
            setEdit(false)
            setIcon(undefined)
        },
        onSuccess: (data) => {
           return toast(data.status !== 200 ? "Error" : "Success",{
                 description: data.message,
           })
        },
        onSettled: async() => {
            return await client.invalidateQueries({
                queryKey : ["group-channels"]
            })
        }
    })
    const {variables : deleteVariables, mutate : deleteMutation} = useMutation({
        mutationFn : (data : {id : string}) => onDeleteChannel(data.id),
        onSuccess: (data) => {
            return toast(data.status !== 200 ? "Error" : "Success", {
                description: data.message
            })
        },
        onSettled: async() => {
            return await client.invalidateQueries({
                queryKey : ["group-channels"]
            })
        }
    })
    const onEndChannelEdit = (event : Event) => {
        if(inputRef.current && channelRef.current && triggerRef.current){
            if(
                !inputRef.current.contains(event.target as Node || null) && 
                !channelRef.current.contains(event.target as Node || null) && 
                !triggerRef.current.contains(event.target as Node || null) && 
                document.getElementById("icon-list")
            ){
                if(inputRef.current.value){
                    mutate({
                        name: inputRef.current.value,
                    })
                }
                if(icon){
                    mutate({
                        icon,
                    })
                }else {
                    setEdit(false)
                   // setIcon(undefined)
                }
            }
        }
    }
    useEffect(() => {
        document.addEventListener("click", onEndChannelEdit, false)
        return () => {
            document.removeEventListener("click", onEndChannelEdit, false)
        }
    },[icon])

    const onChannelDelete = (id : string) => deleteMutation({id})
    return {
        channel,
        onEditChannel,
        channelRef,
        inputRef,
        variables,
        isPending,
        edit,
        triggerRef,
        onSetIcon,
        icon,
        onChannelDelete,
        deleteVariables
    }
    
}