'use client'
import { GlobalAccordion } from '@/app/globals/accordion'
import { IconRenderer } from '@/components/icon-renderer'
import { AccordionContent } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCourseModule } from '@/hooks/courses'
import { Empty } from '@/icons/empty'
import { Check, Circle, Plus } from 'lucide-react'
import { v4 as uuid4, v4 } from 'uuid'
import Link from 'next/link'
import React from 'react'
type Props = {
    courseId: string,
    groupid: string
}
const CourseList = ({courseId, groupid}: Props) => {
    const {contentRef,
        data,
        edit,
        editSection,
        groupOwner,
        inputRef,
        isPending,
        mutateSection,
        onEditModule,
        onEditSection,
        pathname,
        pendingSection,
        sectionInputRef,
        sectionUpdatePending,
        sectionVariables,
        setActiveSection,
        activeSection,
        triggerRef,
        updateVariables,
        variables
    } = useCourseModule(courseId, groupid)
  return (
    <div className='flex flex-col'>
     {data?.status === 200 && 
     data.modules?.map((module) => (
        <GlobalAccordion
        edit={edit}
        ref={triggerRef}
        editable={
            <Input 
             ref={inputRef}
             className='bg-themeBlack border-themeGray'            
            />
        }
        onEdit={() => onEditModule(module.id)}
        id={module.id}
        key={module.id}
        title={isPending ? variables?.content! : module.title}
        >
        <AccordionContent className='flex flex-col gap-y-2 px-3'>
        {module.section.length ? (
            module.section.map((section) => (
                <Link
                ref={contentRef}
                onDoubleClick={onEditSection}
                onClick={() => setActiveSection(section.id)}
                className='flex gap-x-3 items-center capitalize'
                key={section.id}
                href={`/group/${groupid}/courses/${courseId}/${section.id}`}
                >
                    {section.complete ? <Check/> : <Circle />}
                    <IconRenderer 
                    icon={section.icon}
                    mode={
                        pathname.split("/").pop() === section.id ? "LIGHT" : "DARK"
                    }
                    />
                 {editSection && activeSection === section.id ? (
                    <Input 
                    ref={sectionInputRef}
                    className='flex-1 bg-transparent border-none p-0'
                    />
                 ) : sectionUpdatePending && activeSection === section.id ? (
                    updateVariables?.content
                 ): (
                    section.name
                 )} 
                </Link>
            ))
        ) : <></>}

        {!groupOwner?.groupOwner && (
            <>
            {pendingSection && sectionVariables && (
                <Link 
                onClick={() => setActiveSection(sectionVariables.sectionid!)}
                className='flex gap-x-3 items-center'
                href={`/group/${groupid}/courses/${courseId}/${sectionVariables.sectionid}`}
                >
                    <Circle/>
                    <IconRenderer 
                    icon={"doc"}
                    mode={
                        pathname.split("/").pop() === 
                        activeSection ? "LIGHT" : "DARK"
                    }
                    />
                    New Section
                </Link>
            )}
            <Button
            onClick={() => mutateSection({
                moduleid: module.id,
                sectionid: v4()
            })}
            variant={"outline"}
            className='bg-transparent border-themeGray text-themeTextGray mt-2'
            >
            <Plus />
            </Button>
            </>
        )}
        </AccordionContent>
        </GlobalAccordion>
     ))}  
    </div>
  )
}

export default CourseList
