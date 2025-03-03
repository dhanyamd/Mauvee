import { onAuthenticatedUser } from '@/app/actions/auth';
import { onGetGroupInfo } from '@/app/actions/groups';
import CourseContentForm from '@/components/forms/course-content';
import React from 'react'

type Props = {
    params: Promise<{sectionid : string; groupid: string}>
}

export default async function CourseModuleSection ({params} : Props){
   const {groupid, sectionid} = await params
    const user = await onAuthenticatedUser()
    const group = await onGetGroupInfo(groupid)
  return (
    <CourseContentForm 
    groupid={group.group?.userId!}
    sectionid={sectionid}
    userid={user.id!}

    />
  )
}

