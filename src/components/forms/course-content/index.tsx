"use client"
import { HtmlParser } from '@/app/globals/html-parser'
import BlockTextEditor from '@/app/globals/rich-text-editor'
import { Loader } from '@/components/loader'
import { Button } from '@/components/ui/button'
import { useCourseContent, useCourseSectionInfo } from '@/hooks/courses'
import React from 'react'
type CourseContentFormProps = {
    sectionid: string
    userid: string 
    groupid: string
}
const CourseContentForm = ({sectionid, groupid, userid} : CourseContentFormProps) => {
    const {data} = useCourseSectionInfo(sectionid)
    const {
     editor,
     errors,
     isPending,
     onDescription,
     onEditDescription,
     onJsonDescription,
     onUpdateContent,
     register,
     setJsonDescription,
     setOnDescription,setOnHtmlDescription
    } = useCourseContent(sectionid, data?.section?.content || null, data?.section?.JsonContent || null, data?.section?.htmlContent || null)
  return groupid === userid ? (
    <form className='p-5 flex flex-col' ref={editor} onSubmit={onUpdateContent} >
    <BlockTextEditor
    onEdit={onEditDescription}
    max={10000}
    min={100}
    inline 
    disabled={userid === groupid ? false : true}
    name='jsoncontent'
    errors={errors}
    setContent={setJsonDescription || undefined}
    content={JSON.parse(data?.section?.JsonContent!)}
    htmlContent={data?.section?.htmlContent || undefined}
    setTextContent={setOnDescription}
    setHtmlContent={setOnHtmlDescription}
    textContent={data?.section?.content || undefined}
    />
     {onEditDescription && (
      <Button
      className='mt-10 self-end bg-themeBlack border-themeGray'
      variant="outline"
      >
   <Loader loading={isPending}>Save Content</Loader>
      </Button>
     )}
    </form>
  ) : (
    <HtmlParser html={data?.section?.htmlContent!}/>
  )
}

export default CourseContentForm
