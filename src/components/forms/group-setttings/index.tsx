'use client'
import GroupCard from '@/app/(discover)/explore/_components/group-card'
import { useGroupSettings } from '@/hooks/groups'
import React from 'react'

type Props = {
    groupid: string
}

const GroupSettingsForm = ({groupid} : Props) => {
    const {
     data,
     errors,
     isPending,
     onDescription,
     onJsonDescription,
     onUpdate,
     previewIcon,
     previewThumbnail,
     register,
     setDescription,
     setJsonDescription
    } = useGroupSettings(groupid)
  return (
    <div className='flex flex-col w-full h-full gap-y-5 items-start' onSubmit={onUpdate}>
     <div className='flex 2xl:flex-row flex-col gap-10'>
        <div className='flex flex-col gap-3 items-start'>
            <p>Group Preview</p>
            <GroupCard 
            id={data?.group?.id!}
            createdAt={data?.group?.createdAt!}
            userId={data?.group?.userId!}
            category={data?.group?.category!}
            description={data?.group?.description!}
            privacy={data?.group?.privacy!}
            thumbnail={data?.group?.thumbnail!}
            name={data?.group?.name!}
            preview={previewThumbnail}
            />
            </div>
        </div> 
    </div>
  )
}

export default GroupSettingsForm
