import { onAuthenticatedUser } from '@/app/actions/auth';
import { onGetGroupInfo } from '@/app/actions/groups';
import CourseContentForm from '@/components/forms/course-content';
import React from 'react'

type Props = {
    params: {sectionid : string; groupid: string}
}

const CourseModuleSection = async ({params} : Props) => {
    const user = await onAuthenticatedUser()
    const group = await onGetGroupInfo(params.groupid)
  return (
    <CourseContentForm 
    groupid={group.group?.userId!}
    sectionid={params.sectionid}
    userid={user.id!}

    />
  )
}

export default CourseModuleSection
