import { onAuthenticatedUser } from '@/app/actions/auth';
import { onGetGroupInfo } from '@/app/actions/groups';
import React from 'react'

type Props = {
    params: {sectionid : string; groupid: string}
}

const CourseModuleSection = async ({params} : Props) => {
    const user = await onAuthenticatedUser()
    const group = await onGetGroupInfo(params.groupid)
  return (
    <div>
      
    </div>
  )
}

export default CourseModuleSection
