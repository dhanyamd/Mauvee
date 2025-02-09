import { useCreateCourse } from '@/hooks/courses'
import React from 'react'
import { GlassModal } from '../glass-modal'
import { Card, CardContent } from '@/components/ui/card'
import { BadgePlus } from '@/icons/badge-plus'

type Props = {
    groupid: string
}

const CourseCreate = ({groupid} : Props) => {
    const {
        onCreateCourse,
        buttonRef,
        data,
        errors,
        isPending,
        onPrivacy,
        register,
        setValue,
        variables
    } = useCreateCourse(groupid)
 if(data?.groupOwner){
    return (
        <GlassModal
        title='Create a new course'
        description='Add a new form for your community'
        trigger={
            <span>
                <Card className='bg-[#101011] border-themeGray hover:bg-themeBlack transition 
                duration-100 cursor-pointer border-dashed aspect-square rounded-xl '>
                <CardContent className='opacity-20 flex gap-x-2 p-0 justify-center items-center h-full'>
                  <BadgePlus />
                  <p>Create Course</p>
                </CardContent>
                </Card>
            </span>
        }
        >

        </GlassModal>
    )
 }
}

export default CourseCreate
